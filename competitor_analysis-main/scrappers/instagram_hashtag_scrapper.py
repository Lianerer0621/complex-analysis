import os
import requests
from langdetect import detect, LangDetectException
from dotenv import load_dotenv

load_dotenv()

# ACCESS_TOKEN = os.getenv('ACCESS_TOKEN')
# IG_BUSINESS_ACCOUNT_ID = os.getenv('IG_BUSINESS_ACCOUNT_ID')

HASHTAG_SEARCH_URL = os.getenv('HASHTAG_SEARCH_URL')
HASHTAG_TOP_MEDIA_URL = os.getenv('HASHTAG_TOP_MEDIA_URL')

def get_hashtag_id(hashtag_name):
    params = {
        "user_id": IG_BUSINESS_ACCOUNT_ID,
        "q": hashtag_name,
        "access_token": ACCESS_TOKEN
    }
    response = requests.get(HASHTAG_SEARCH_URL, params=params)
    data = response.json()
    
    if "data" in data and data["data"]:
        return data["data"][0]["id"]
    else:
        raise Exception(f"Could not find hashtag ID for #{hashtag_name}")

def get_top_posts_by_hashtag(hashtag_id, fields=None, limit=15):
    if fields is None:
        fields = "id,caption,media_type,media_url,permalink,like_count,comments_count"

    url = HASHTAG_TOP_MEDIA_URL.format(hashtag_id=hashtag_id)
    params = {
        "user_id": IG_BUSINESS_ACCOUNT_ID,
        "fields": fields,
        "limit": limit,
        "access_token": ACCESS_TOKEN
    }
    response = requests.get(url, params=params)
    return response.json()

def get_hashtag_posts(hashtag_name: str, access_token: str, ig_business_account_id: str):
    global ACCESS_TOKEN
    global IG_BUSINESS_ACCOUNT_ID

    ACCESS_TOKEN = access_token
    IG_BUSINESS_ACCOUNT_ID = ig_business_account_id

    try:
        hashtag_id = get_hashtag_id(hashtag_name)
        results = get_top_posts_by_hashtag(hashtag_id, limit=30)
        data = results.get("data", [])

        if not data:
            raise(f"No top posts found for '#{hashtag_name}' or not accessible.")
            return []

        english_posts = []
        for post in data:
            caption = post.get("caption", "")
            if caption:
                try:
                    lang = detect(caption)
                    if lang == 'en':
                        english_posts.append(post)
                except LangDetectException:
                    pass

        return english_posts

    except Exception as e:
        print("Error:", e)