from openai import OpenAI
from pathlib import Path
import json
import os

from toons import toons

client = OpenAI(
    api_key=os.environ.get("GROQ_API_KEY"),
    base_url="https://api.groq.com/openai/v1",
)


def load_file(filename:str):
    path = Path("instructions") / filename
    with open(path, "r", encoding="utf-8") as file:
        return file.read()


def get_response(content):
    data = {
        "url" : content["url"],
        "seller_status": content["seller_status"],
        "title": content["title"],
        "description": content["description"],
        "seller_description": content["profile_description"],
        "expertise": json.loads(content["expertise"]),
        "category_and_subcategory": content["category_and_subcategory"],
        "packages": json.loads(content["packages"]),
        "gig_tags": content["tags"],
        "rating": json.loads(content["ratings"]),
        "total_orders": content["total_orders"],
        "gig_stars": json.loads(content["gig_stars"]),
        "seller_information": json.loads(content["about_profile"])
    }

    instructions = f"""
        {load_file("category_guidelines.md")}
    """


    # print(f"Length of System_prompt:", len(instructions))
    # print(f"Length of data: ", len(data) )
    #
    # response = client.responses.create(
    #     model="openai/gpt-oss-120b",
    #     instructions=instructions,
    #     input=json.dumps(data),
    # )

    # print("shamroz response: ", response.output_text)
    try:
        print(data)
        # data_dict = json.loads(data)
        # print(f"data dict: {data_dict}")
        data_toon = toons.dumps(data)
        print(f"data toon: {data_toon}")
        print(f"length of data toon: {len(data_toon)}")

        print("="*200)

        data_toon_into_json = json.loads(toons.to_json(data_toon))
        print(data_toon_into_json)
        print(f"length of data json {len(data_toon_into_json)}")
        json_string = json.dumps(data_toon_into_json)
        print(len(json_string))

        # print(f"len: {len(response.output_text)}")

        # result = json.loads(response.output_text.strip())
    except Exception as e:
        print(f"Error: {e}")
    print("="*100)


    return data_toon_into_json