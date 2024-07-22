import config
import google.generativeai as genai
import fitz

API_KEY = config.API_KEY
genai.configure(api_key=API_KEY)

model = genai.GenerativeModel('gemini-1.5-flash')

def create_prompt(path_to_file):
    material_text = f"{read_pdf(path_to_file)}"
    # Initial prompt combining material and instructions
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
    print(response.text)

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

send_question_to_model(init_prompt_llm(create_prompt("backend/184 Final Report.pdf")),"What was the project on?")