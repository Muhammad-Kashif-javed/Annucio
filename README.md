# 📢 Annuncio

Annuncio is a multimodal application designed to generate product advertisements using the power of Aria and Allegro AI models. It allows users to create detailed product descriptions and promotional videos seamlessly, integrating Flask as the web framework and providing an easy-to-use API for interaction.

## 🚀 Features

- **Product Data Generation**: Utilize the Aria model to generate comprehensive product descriptions based on input parameters such as product name, description, image, video, and brochure.
- **Video Generation**: Create promotional videos using the Allegro model based on the generated product data.
- **Real-Time Status Check**: Check the status of the video generation process to track progress.
- **CORS Support**: The application is configured to handle Cross-Origin Resource Sharing, making it easy to integrate with frontend applications.

## 🛠️ Installation

To get started with Annuncio, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/annuncio.git
   cd annuncio
   ```

2. **Install the required dependencies**: 
   
   Make sure you have Python 3.7+ installed. Then, create a virtual environment and install the dependencies.

    ```bash
    pip install requirements.txt
    ```

3. **Set up environment variables**: 
   
   Create a .env file in the root directory of the project and add your ARIA and ALLEGRO API keys:
    ```bash
        env
        Copia codice
        ARIA_API_KEY=your_aria_api_key
        ALLEGRO_API_KEY=your_allegro_api_key
    ```

## 🛠️ API Endpoints
```
POST /api/generate
```

Generate an advertisement for a product.


Request Body:
```bash
json
Copia codice
{
  "product_name": "Your Product Name",
  "description": "Product Description",
  "image": "Base64 Image String",
  "video": "Base64 Video String (optional)",
  "brochure": "Base64 Brochure String (optional)"
}
```

Response:
```
json
Copia codice
{
  "request_id": "generated_request_id"
}
POST /api/status
```

Check the status of the video generation.

Request Body:
```
json
Copia codice
{
  "request_id": "generated_request_id"
}
```

Response:

```
json
Copia codice
{
  "status": "Current status of the video generation"
}
```

## 💻 Usage
To run the application, execute the following command:

```bash
flask run --app main
```

The application will start on http://127.0.0.1:5000/.

## 🎉 Contributing
We welcome contributions! Feel free to open issues, submit pull requests, and provide feedback. Make sure to follow the project's code of conduct and contributing guidelines.

## 📄 License
This project is licensed under the MIT License. See the LICENSE file for details.


