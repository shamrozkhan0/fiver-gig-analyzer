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
    print("Resolved path:", path.resolve())
    print("Exists:", path.exists())
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
        You are a world-class Fiverr SEO Consultant with extensive experience optimizing gig titles, tags, and descriptions.
        Your job is to analyze a given Fiverr gig using only the provided data and Fiverr’s best practices.
        you have to provide 
        {load_file("role.md")}
        {load_file("workflow.md")}
        {load_file("scoring_rubric.md")}
        {load_file("rules.md")}
        {load_file("title_guidelines.md")}
        {load_file("description_guidelines.md")}
        {load_file("tags_guidelines.md")}
        {load_file("profile_guidelines.md")}
        {load_file("package_pricing_guidelines.md")}
        {load_file("category_guidelines.md")}
        {load_file("validation_guidelines.md")}
    """

    response = client.responses.create(
        model="openai/gpt-oss-120b",
        instructions=instructions,
        input=json.dumps(data),
    )

    print(response)
    result = json.loads(response.output_text.strip())
    print("shamroz response: ", result)
    return result
