from openai import OpenAI, RateLimitError
from datetime import datetime, timezone
from pathlib import Path
import json
import time
import os


class Analyzer:

    def __init__(self, content):
        self.client = OpenAI(
            api_key=os.environ.get("GROQ_API_KEY"),
            base_url="https://api.groq.com/openai/v1",
        )
        self.content = content


    def load_file(self, filename: str):
        path = Path("instructions") / filename
        with open(path, "r", encoding="utf-8") as file:
            return file.read()


    @staticmethod
    def _safe_json_loads(value):
        if value is None or value == "":
            return None
        if isinstance(value, (dict, list)):
            return value
        try:
            return json.loads(value)
        except (json.JSONDecodeError, TypeError) as e:
            print(f"Warning: could not parse expected JSON field ({e}): {value!r}")
            return None


    def get_data(self):
        c = self.content
        data = {
            "url": c.get("url"),
            "seller_status": c.get("seller_status"),
            "title": c.get("title"),
            "description": c.get("description"),
            "seller_description": c.get("profile_description"),
            "expertise": self._safe_json_loads(c.get("expertise")),
            "category_and_subcategory": c.get("category_and_subcategory"),
            "packages": self._safe_json_loads(c.get("packages")),
            "gig_tags": c.get("tags"),
            "rating": self._safe_json_loads(c.get("ratings")),
            "total_orders": c.get("total_orders"),
            "gig_stars": self._safe_json_loads(c.get("gig_stars")),
            "seller_information": self._safe_json_loads(c.get("about_profile")),
        }
        return data


    @staticmethod
    def _parse_response(response):
        text = getattr(response, "output_text", None)
        if text is None:
            try:
                text = response.output[0].content[0].text
            except Exception as e:
                raise ValueError(f"Could not extract text from response: {e}")

        text = text.strip()
        if text.startswith("```"):
            text = text.split("```")[1]
            if text.startswith("json"):
                text = text[4:]
            text = text.strip()

        try:
            return json.loads(text)
        except json.JSONDecodeError as e:
            raise ValueError(f"Model did not return valid JSON: {e}\nRaw text: {text[:500]}")


    _ILLEGAL_TITLE_CHARS = str.maketrans({
        "|": " ", "&": " and ", "<": "", ">": "",
    })


    @classmethod
    def _sanitize_title_field(cls, text: str) -> str:
        if not isinstance(text, str):
            return text
        cleaned = text.translate(cls._ILLEGAL_TITLE_CHARS)
        # collapse any double spaces left behind by the substitutions
        return " ".join(cleaned.split())


    @classmethod
    def _sanitize_part3_output(cls, result: dict) -> dict:
        oc = result.get("optimized_content")
        if isinstance(oc, dict):
            if "title" in oc:
                oc["title"] = cls._sanitize_title_field(oc["title"])
            if isinstance(oc.get("tags"), list):
                oc["tags"] = [cls._sanitize_title_field(t) for t in oc["tags"]]
        return result


    def _call(self, instructions_file: str, payload: dict, max_retries: int = 4):
        instructions = self.load_file(instructions_file)
        input_json = json.dumps(payload)

        for attempt in range(max_retries + 1):
            try:
                response = self.client.responses.create(
                    model="llama-3.3-70b-versatile",
                    instructions=instructions,
                    input=input_json,
                )
                return self._parse_response(response)

            except RateLimitError as e:
                if attempt == max_retries:
                    raise

                retry_after = None
                try:
                    retry_after = float(e.response.headers.get("retry-after"))
                except (AttributeError, TypeError, ValueError):
                    pass

                wait = retry_after if retry_after is not None else (2 ** (attempt + 1))
                print(
                    f"Rate limited on {instructions_file} "
                    f"(attempt {attempt + 1}/{max_retries}), "
                    f"waiting {wait:.1f}s before retry..."
                )
                time.sleep(wait)


    def request_one(self):
        payload = self.get_data()
        req1 = self._call("request1.md", payload)
        req1["meta"]["analyze_at"] = datetime.now(timezone.utc).isoformat(timespec="milliseconds").replace("+00:00", "Z")
        return req1


    def request_two(self, part1_output: dict | None = None):
        payload = {"gig": self.get_data()}
        if part1_output is not None:
            payload["part1_output"] = part1_output
        return self._call("request2.md", payload)


    @staticmethod
    def _trim_part1_for_synthesis(part1_output: dict) -> dict:
        keywords = part1_output.get("keyword_analysis", {}).get("keywords", [])
        trimmed_keywords = [
            {
                "keyword": k.get("keyword"),
                "importance": k.get("importance"),
                "coverage": k.get("coverage"),
            }
            for k in sorted(
                keywords,
                key=lambda k: {"High": 0, "Medium": 1, "Low": 2}.get(k.get("importance"), 3),
            )[:15]
        ]

        buyer_psych = part1_output.get("buyer_psychology", {})

        return {
            "scores": part1_output.get("scores"),
            "weaknesses": part1_output.get("weaknesses", []),
            "seo_audit": part1_output.get("seo_audit"),
            "keywords": trimmed_keywords,
            "buyer_concerns": buyer_psych.get("concerns", []),
            "buyer_questions": buyer_psych.get("questions", []),
        }


    @staticmethod
    def _trim_part2_for_synthesis(part2_output: dict) -> dict:
        return {
            "conversion_audit": part2_output.get("conversion_audit"),
            "package_analysis": part2_output.get("package_analysis"),
        }

    def _get_gig_essentials(self) -> dict:
        full = self.get_data()
        return {
            "title": full.get("title"),
            "description": full.get("description"),
            "gig_tags": full.get("gig_tags"),
            "category_and_subcategory": full.get("category_and_subcategory"),
            "packages": full.get("packages"),
        }


    def request_three(self, part1_output: dict, part2_output: dict):
        payload = {
            "gig": self._get_gig_essentials(),
            "part1_output": self._trim_part1_for_synthesis(part1_output),
            "part2_output": self._trim_part2_for_synthesis(part2_output),
        }
        result = self._call("request3.md", payload)
        return self._sanitize_part3_output(result)


    def get_response(self):
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