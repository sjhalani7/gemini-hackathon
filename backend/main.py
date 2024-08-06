from flask import Flask, request, jsonify
from flask_cors import CORS
import config
import google.generativeai as genai
import fitz

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}}, supports_credentials=True)

API_KEY = config.API_KEY
genai.configure(api_key=API_KEY)
chat_hist = {}

model = genai.GenerativeModel('gemini-1.5-flash')

def create_prompt(path_to_file):
    material_text = f"{read_pdf(path_to_file)}"
    initial_prompt = f"""
    You are an advanced language model that has been trained with the following material:
    "{material_text}"
    Please use this material to answer any questions based on it. If the material does not cover the question, respond that the information is not available in the provided material.
    """
    return initial_prompt

def init_prompt_llm(prompt):
    history = [
        {"role": "user",
         "parts": f"{prompt}"},
    ]
    chat = model.start_chat(history=history)
    return chat

def send_question_to_model(chat_session, query):
    response = chat_session.send_message(query)
    return response.text

def read_pdf(file_path):
    text = ""
    try:
        document = fitz.open(file_path)
        for page_num in range(len(document)):
            page = document.load_page(page_num)
            text += page.get_text()
    except Exception as e:
        print(f"Error reading PDF file: {e}")
    return text


@app.route('/initialize', methods=['POST'])
def initialize_model():
    path_to_file = "184 Final Report.pdf"  # Assuming the file is already in the backend
    prompt = create_prompt(path_to_file)
    chat = init_prompt_llm(prompt)
    chat_id = "abc1"
    chat_hist[chat_id] = chat
    print(f"Initialized chat with id: {chat_id}")
    return jsonify({"chat_id": chat_id, "message": "Model initialized successfully."})

@app.route('/ask', methods=['POST'])
def ask_model():
    data = request.get_json()
    print("Request Data:", data)
    chat_id = data.get('chat_id')
    query = data.get('query')

    if not chat_id or chat_id not in chat_hist:
        print("Error: Chat session not found")
        return jsonify({"error": "Chat session not found."}), 400

    if not query:
        return jsonify({"error": "No query provided."}), 400

    chat = chat_hist.get(chat_id)
    response = send_question_to_model(chat, query)
    return jsonify({"response": response})


# if __name__ == '__main__':
#     app.run(debug=True)