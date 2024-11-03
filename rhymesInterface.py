import requests
import time
from dotenv import load_dotenv
import os
import base64

load_dotenv()


aria_api = os.environ.get("ARIA_API_KEY")
allegro_api = os.environ.get("ALLEGRO_API_KEY")


def generate_product_data(
    product_name,
    description,
    image,
    video=None,
    brochure=None,
):
    # define the API endpoint for generating product data
    url = "https://api.aria.ai/v1/generateText"  # Ensure you are using the correct ARIA endpoint
    headers = {
        "Authorization": f"Bearer {aria_api}",
        "Content-Type": "application/json"
    }

    # convert image, video, and brochure to base64 if provided
    image_base64 = base64.b64encode(image).decode("utf-8") if image else None
    video_base64 = base64.b64encode(video).decode("utf-8") if video else None
    brochure_base64 = base64.b64encode(brochure).decode("utf-8") if brochure else None

    # prepare the payload for the API request
    payload = {
        "product_name": product_name,
        "description": description,
        "image": image_base64,
        "video": video_base64,
        "brochure": brochure_base64
    }

    try:
        # send a POST request to the ARIA API
        response = requests.post(url, headers=headers, json=payload)
        response.raise_for_status()  # Check if the request was successful
        return response.json()  # Return the JSON response
    except requests.exceptions.RequestException as e:
        return f"An error occurred: {str(e)}"
    
def create_video_task(token, result_scenes):
    # define the API endpoint for creating a video task
    url = "https://api.rhymes.ai/v1/generateVideoSyn"
    headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}
    
    # prepare the data for the video task request
    data = {
        "refined_prompt": result_scenes,
        "num_step": 100,
        "cfg_scale": 7.5,
        "user_prompt": result_scenes,
        "rand_seed": 12345
    }
    
    try:
        # send a POST request to create the video task
        response = requests.post(url, headers=headers, json=data)
        response.raise_for_status()  # Check if the request was successful
        return response.json()  # Return the JSON response
    except requests.exceptions.RequestException as e:
        return f"An error occurred: {str(e)}"
    
def generate_prompt_for_video(product_name, description, generated_product_data):
    # combine generated data with product name and description to create a video prompt
    prompt = (
        f"Create a promotional video for the product '{product_name}'. "
        f"Description: {description}. "
        f"Product data: {generated_product_data.get('text') if generated_product_data else 'No additional data available'}."
    )
    return prompt


def start_video_generation(GeneratedPrompt):
    # start video generation on allegro and return the request_id to check status
    #

    video_task_response = create_video_task(allegro_api, GeneratedPrompt)
    
    # check if the response contains a requestId
    if isinstance(video_task_response, dict) and "requestId" in video_task_response:
        return video_task_response["requestId"]  # Return the request ID
    else:
        return f"Error starting video generation: {video_task_response}"
    
    #! ???
    # request_id = None
    # # get allegro returned request_id
    # return request_id


def get_video_status(request_id): #! renamed in get_video_status
    # no need to wait 2 minutes here as that is already handled on frontend
    url = "https://api.rhymes.ai/v1/videoQuery"
    headers = {
        "Authorization": f"Bearer {allegro_api}",
    }
    params = {"requestId": request_id}  # add the requestId as a query parameter

    try:
        response = requests.get(url, headers=headers, params=params)
        # check if the request was successful
        response.raise_for_status()

        return response.json()  # return the JSON response
    except requests.exceptions.RequestException as e:
        return f"An error occurred: {str(e)}"
