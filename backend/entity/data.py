from pydantic import BaseModel
import logging as log

log.basicConfig(level=log.INFO, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",)

class Data(BaseModel):
    profile_id: int = None,
    title: str
    description: str
    expertise: str
    category_and_subcategory: str
    packages: str
    tags: str
    profile_description:str
    ratings: str
    total_review: str
    gig_stars: str
    about_profile: str
