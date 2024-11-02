import requests
import time
from dotenv import load_dotenv
import os

load_dotenv()


aria_api = os.environ.get("ARIA_API_KEY")
allegro_api = os.environ.get("ALLEGRO_API_KEY")


def get_text_response(
    product_name,
    description,
    image,
    video=None,
    brochure=None,
):
    # all the aria prompting will be done here
    # image will be in base64 format
    pass


def start_video_generation(GeneratedPrompt):
    # start video generation on allegro and return the request_id to check status
    #

    request_id = None
    # get allegro returned request_id
    return request_id


def query_video_status(request_id):
    # no need to wait 2 minutes here as that is already handled on frontend
    url = "https://api.rhymes.ai/v1/videoQuery"
    headers = {
        "Authorization": f"Bearer {allegro_api}",
    }
    params = {"requestId": request_id}  # Add the requestId as a query parameter

    try:
        response = requests.get(url, headers=headers, params=params)
        # Check if the request was successful
        response.raise_for_status()

        return response.json()  # Return the JSON response
    except requests.exceptions.RequestException as e:
        return f"An error occurred: {str(e)}"
