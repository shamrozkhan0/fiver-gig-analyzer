from pprint import pprint

from openai import OpenAI
from pathlib import Path
import json
import os


class Analyzer:

    def __init__(self, content):
        self.client = OpenAI(
            api_key=os.environ.get("GROQ_API_KEY"),
            base_url="https://api.groq.com/openai/v1",
        )
        print("printing content",content)
        self.content = content

    def load_file(self, filename: str):
        path = Path("instructions") / filename
        with open(path, "r", encoding="utf-8") as file:
            return file.read()

    def get_data(self):
        data = {
            "url": self.content["url"],
            "seller_status": self.content["seller_status"],
            "title": self.content["title"],
            "description": self.content["description"],
            "seller_description": self.content["profile_description"],
            "expertise": json.loads(self.content["expertise"]),
            "category_and_subcategory": self.content["category_and_subcategory"],
            "packages": json.loads(self.content["packages"]),
            "gig_tags": self.content["tags"],
            "rating": json.loads(self.content["ratings"]),
            "total_orders": self.content["total_orders"],
            "gig_stars": json.loads(self.content["gig_stars"]),
            "seller_information": json.loads(self.content["about_profile"]),
        }
        return data

    @staticmethod
    def _parse_response(response):
        """Extract the model's text output and parse it as JSON.

        Raises ValueError with the raw text included if the model didn't
        return valid JSON, so callers can log/inspect what actually came back
        instead of failing on a confusing KeyError/AttributeError deeper in.
        """
        text = getattr(response, "output_text", None)
        if text is None:
            # Fallback for SDK versions/shapes where output_text isn't populated
            try:
                text = response.output_text
            except Exception as e:
                raise ValueError(f"Could not extract text from response: {e}")

        text = text.strip()
        # Defensive: strip accidental markdown fences even though prompts forbid them
        if text.startswith("```"):
            text = text.split("```")[1]
            if text.startswith("json"):
                text = text[4:]
            text = text.strip()

        try:
            return json.loads(text)
        except json.JSONDecodeError as e:
            raise ValueError(f"Model did not return valid JSON: {e}\nRaw text: {text[:500]}")

    def _call(self, instructions_file: str, payload: dict):
        instructions = self.load_file(instructions_file)
        response = self.client.responses.create(
            model="openai/gpt-oss-120b",
            instructions=instructions,
            input=json.dumps(payload),
        )
        print(response.output_text)
        return self._parse_response(response)

    def request_one(self):
        """Audit: meta, scores, executive_summary, strengths, weaknesses,
        seo_audit, search_intent_analysis, keyword_analysis, buyer_psychology.
        Needs only the raw gig data.
        """
        payload = self.get_data()
        return self._call("request1.md", payload)

    def request_two(self, part1_output: dict | None = None):
        """Conversion & package analysis.
        Part 1 output is optional context — include it if available to keep
        trust/authority framing consistent, but Part 2 can run without it.
        """
        payload = {"gig": self.get_data()}
        if part1_output is not None:
            payload["part1_output"] = part1_output
        return self._call("request2.md", payload)

    def request_three(self, part1_output: dict, part2_output: dict):
        """Synthesis: recommendations, optimized_content, expected_growth,
        ai_mentor. Requires both Part 1 and Part 2 output as ground truth.
        """
        payload = {
            "gig": self.get_data(),
            "part1_output": part1_output,
            "part2_output": part2_output,
        }
        return self._call("request3.md", payload)

    def get_response(self):
        """Runs the 3-part pipeline in order and merges the results.

        Part 3 depends on Part 1 and Part 2, so they must run in order (or
        Parts 1 and 2 could be parallelized with asyncio/threading if you
        want to shave latency — Part 3 still has to wait for both).

        On failure, returns whatever parts succeeded plus an "errors" key,
        rather than silently discarding everything.
        """

        print(self.get_data())

        result = {}
        errors = {}

        part1_output = None
        part2_output = None

        try:
            part1_output = self.request_one()
            result.update(part1_output)
        except Exception as e:
            print(f"Request 1 failed: {e}")
            errors["request1"] = str(e)

        try:
            part2_output = self.request_two(part1_output)
            result.update(part2_output)
        except Exception as e:
            print(f"Request 2 failed: {e}")
            errors["request2"] = str(e)

        if part1_output is not None and part2_output is not None:
            try:
                part3_output = self.request_three(part1_output, part2_output)
                result.update(part3_output)
            except Exception as e:
                print(f"Request 3 failed: {e}")
                errors["request3"] = str(e)
        else:
            errors["request3"] = "Skipped: requires both Part 1 and Part 2 output"

        if errors:
            result["_errors"] = errors

        print("=" * 100)
        return result
# from openai import OpenAI
# from pathlib import Path
# import json
# import os
#
# class Analyzer:
#
#     def __init__(self, content):
#         self.client = OpenAI(api_key=os.environ.get("GROQ_API_KEY"),base_url="https://api.groq.com/openai/v1")
#         self.content = content
#
#
#     def load_file(self, filename:str):
#         path = Path("instructions") / filename
#         with open(path, "r", encoding="utf-8") as file:
#             return file.read()
#
#
#     def get_data(self, ):
#         data = {
#             "url": self.content["url"],
#             "seller_status": self.content["seller_status"],
#             "title": self.content["title"],
#             "description": self.content["description"],
#             "seller_description": self.content["profile_description"],
#             "expertise": json.loads(self.content["expertise"]),
#             "category_and_subcategory": self.content["category_and_subcategory"],
#             "packages": json.loads(self.content["packages"]),
#             "gig_tags": self.content["tags"],
#             "rating": json.loads(self.content["ratings"]),
#             "total_orders": self.content["total_orders"],
#             "gig_stars": json.loads(self.content["gig_stars"]),
#             "seller_information": json.loads(self.content["about_profile"])
#         }
#
#         return data
#
#
#     def request_one(self):
#         instructions = self.load_file("request1.md")
#
#         response = self.client.responses.create(
#             model="openai/gpt-oss-120b",
#             instructions=instructions,
#             input=json.dumps(self.get_data()),
#         )
#         return response
#
#
#     def request_two(self):
#         instructions = self.load_file("request2.md")
#
#         response = self.client.responses.create(
#             model="openai/gpt-oss-120b",
#             instructions=instructions,
#             input=json.dumps(self.get_data()),
#         )
#         return response
#
#
#     def request_three(self):
#         instructions = self.load_file("request3.md")
#
#         response = self.client.responses.create(
#             model="openai/gpt-oss-120b",
#             instructions=instructions,
#             input=json.dumps(self.get_data()),
#         )
#         return response
#
#
#     def get_response(self, content):
#         response = dict
#
#         try:
#             response = {
#                 "request1" : self.request_one(),
#                 "request2" : self.request_two(),
#                 "request3" : self.request_three()
#             }
#
#         except Exception as e:
#             print(f"Error: {e}")
#         print("="*100)
#
#
#         return response