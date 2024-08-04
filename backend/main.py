import config
import google.generativeai as genai
import fitz
from flask import Flask, request, jsonify, session
from flask_session import Session

app = Flask(__name__)
app.config['SECRET_KEY'] = 'supersecretkey'
app.config['SESSION_TYPE'] = 'filesystem'
Session(app)

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
print(init_prompt_llm("hello"))
def send_question_to_model(chat_session, query):
    response = chat_session.send_message(query)
    return(response.text)

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

#print(send_question_to_model(init_prompt_llm(create_prompt("184 Final Report.pdf")),"What was the project on?"))

@app.route('/initialize', methods=['POST'])
def initialize_model():
    path_to_file = "184 Final Report.pdf"  # Assuming the file is already in the backend
    prompt = create_prompt(path_to_file)
    chat = init_prompt_llm(prompt)
    chat_id = "abc1"
    session['chat_id'] = chat_id
    chat_hist[chat_id] = chat
    return jsonify({"message": "Model initialized successfully."})


@app.route('/ask', methods=['POST'])
def ask_model():
    if 'chat_id' not in session:
        return jsonify({"error": "Model not initialized."}), 400

    query = request.json.get('query')
    if not query:
        return jsonify({"error": "No queryy provided."}), 400

    chat_id = session['chat_id']
    chat = chat_hist[chat_id]
    response = send_question_to_model(chat, query)
    return jsonify({"response": response})


# if __name__ == '__main__':
#     app.run(debug=True)