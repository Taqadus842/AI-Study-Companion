from fastapi import APIRouter
from pydantic import BaseModel


router = APIRouter()


class ProfileUpdate(BaseModel):
    name: str
    email: str


profile = {
    "name": "",
    "email": ""
}


@router.get("/profile")
def get_profile():

    return profile



@router.put("/profile")
def update_profile(
    data: ProfileUpdate
):

    profile["name"] = data.name
    profile["email"] = data.email

    return profile