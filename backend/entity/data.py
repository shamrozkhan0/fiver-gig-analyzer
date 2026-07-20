from pydantic import BaseModel
from typing import Any
import logging as log

log.basicConfig(level=log.INFO, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",)

class Expertise(BaseModel):
    title: str
    items: list[str]


class Package(BaseModel):
    heading: str
    pricing: str
    description: str
    delievery_time: str
    revisions: str
    includes: list[str]


class Data(BaseModel):
    profile_id: int | None = None
    url: str
    seller_status: str
    title: str
    description: str
    expertise: list[Expertise]
    category_and_subcategory: str
    packages: dict[str, Package]
    tags: str
    profile_description: str
    ratings: list[dict[str, float]] | str
    total_orders: int
    gig_stars: dict[str, Any] | str
    seller_information: dict[str, str]

# python -m uvicorn main:app --reload