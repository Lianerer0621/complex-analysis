import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from dotenv import load_dotenv
from client import generate_strategy, generate_strategy_from_posts
from instagram_scrapper import get_instagram_public_posts
from instagram_hashtag_scrapper import get_hashtag_posts
from web_search import get_web_results

load_dotenv()

app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://192.168.1.85:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

CLIENT_DATA = {}

class ClientDetails(BaseModel):
    name: str
    type: str
    description: str

class URLRequest(BaseModel):
    urls: List[str]

class Internet(BaseModel):
    search: str

@app.post("/client-info")
async def save_client_info(client: ClientDetails):
    CLIENT_DATA["client"] = client.dict()
    return {"message": "Client info saved successfully"}

@app.get("/client-info")
async def get_client_info():
    return CLIENT_DATA.get("client", {})
    
@app.post("/search-results")
async def search_results(query: Internet):
    print(query)
    return get_web_results(query.search)

@app.post("/focus-recommendation")
async def recommend_from_urls(request: URLRequest):
    client = CLIENT_DATA.get("client")
    return {
        "recommendation": await generate_strategy(client_info=client, urls=request.urls)
    }

@app.post("/direct-recommendation")
async def recommend_direct(request: URLRequest):
    client = CLIENT_DATA.get("client")
    return {
        "recommendation": await generate_strategy(client_info=client, urls=request.urls)
    }

@app.get("/instagram/profile/{username}")
async def get_ig_profile(username: str):
    results = get_instagram_public_posts(
        target_username=username,
        access_token=os.getenv("ACCESS_TOKEN"),
        ig_business_account_id=os.getenv("IG_BUSINESS_ACCOUNT_ID")
    )
    # print(results)
    results = results["business_discovery"]["media"]["data"]
    return results

@app.get("/instagram/hashtag/{hashtag}")
async def get_ig_hashtag(hashtag: str):
    return get_hashtag_posts(
        hashtag_name=hashtag,
        access_token=os.getenv("ACCESS_TOKEN"),
        ig_business_account_id=os.getenv("IG_BUSINESS_ACCOUNT_ID")
    )

# --- NEW: Request schema for socials recommendation ---
class SocialsRequest(BaseModel):
    posts: List[str]  # list of captions

# --- NEW: Add this route ---
@app.post("/socials-recommendation")
async def recommend_from_posts(request: SocialsRequest):
    return {
        "recommendation": generate_strategy_from_posts(
            client_info=CLIENT_DATA,
            post_captions=request.posts
        )
    }