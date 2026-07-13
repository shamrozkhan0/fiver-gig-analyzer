from pydantic import BaseModel
from typing import Any
import logging as log

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
    ratings: list[dict[str,float]]
    total_review: int
    gig_stars: dict[str, Any]
    about_profile: str