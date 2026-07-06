import json

from pydantic import BaseModel
import logging as log

from rich.json import JSON

log.basicConfig(level=log.INFO, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",)


class Expertise(BaseModel):
    items: list[str]
    title: str


class Data(BaseModel):
    profile_id: int | None = None
    title: str
    description: str
    expertise: list[Expertise]
    category_and_subcategory: str
    packages: str
    tags: str
    profile_description:str
    ratings: str
    total_review: str
    gig_stars: str
    about_profile: str