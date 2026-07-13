from openai import OpenAI
from pathlib import Path
import json
import os


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
        "title": content["title"],
        "description": content["description"],
        "seller_description": content["profile_description"],
        "expertise": content["expertise"],
        "category_and_subcategory": content["category_and_subcategory"],
        "packages": content["packages"],
        "gig_tags": content["tags"],
        "rating": content["ratings"],
        "total_review": content["total_review"],
        "gig_stars": content["gig_stars"],
        "seller_information": content["about_profile"]
    }

    instructions = f"""
        {load_file("diagnos_prompt.md")}
    """

    print(f"Length of System_prompt:", len(instructions))
    print(f"Length of data: ", len(data) )

    response = client.responses.create(
        model="openai/gpt-oss-120b",
        instructions=instructions,
        input=json.dumps(data),
    )

    print("shamroz response: ", response.output_text)
    result = json.loads(response.output_text.strip())
    print("="*100)

    for name, val in result["components"].items():
        if val["status"] in ["weak", "borderline"]:
            print(name, val)


    return result