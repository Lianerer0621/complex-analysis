from dotenv import load_dotenv
import requests
import json

load_dotenv()

def get_instagram_public_posts(target_username, access_token, ig_business_account_id):

    # Endpoint for Instagram Graph API
    endpoint = f"https://graph.facebook.com/v16.0/{ig_business_account_id}"

    # 'business_discovery' field allows you to discover public data of another user
    # (provided you have the right permissions and the target account is public or has shared data)
    # Below is a minimal set of fields. You can expand it to get more fields, e.g. likes_count, comments_count, etc.
    params = {
        "fields": f"business_discovery.username({target_username})"
                  f"{{id,username,media{{id,caption,media_url,permalink,timestamp}}}}",
        "access_token": access_token
    }

    response = requests.get(endpoint, params=params).json()
    
    return response



# if __name__ == "__main__":
#     # Replace these with your actual values

#     data = get_instagram_public_posts(
#         ig_business_account_id=IG_BUSINESS_ACCOUNT_ID,
#         access_token=ACCESS_TOKEN,
#         target_username=TARGET_USERNAME
#     )