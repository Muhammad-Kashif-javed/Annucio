from flask import Flask, request
from flask_cors import CORS
from rhymesInterface import (
    generate_product_data,
    generate_prompt_for_video,
    start_video_generation,
    get_video_status,
)

api = Flask(__name__)
CORS(api)


@api.route("/api/generate", methods=["POST"])
def generate_ad():
    req = request.get_json()
    generated_product_data = generate_product_data(
        req.get("product_name"),
        req.get("description"),
        req.get("image"),
        req.get("video") or None,
        req.get("brochure") or None,
    )
    video_prompt = generate_prompt_for_video(
        req.get("product_name"), req.get("description"), generated_product_data
    )
    request_id = start_video_generation(video_prompt)

    return request_id


@api.route("/api/status", methods=["POST"])
def check_status():
    req = request.get_json()
    status = get_video_status(req.get("request_id"))
    return status
