import config
import google.generativeai as genai
import fitz

API_KEY = config.API_KEY
genai.configure(api_key=API_KEY)

model = genai.GenerativeModel('gemini-1.5-flash')

def create_prompt():
    response = model.generate_content("Teach me about how an LLM works")
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

print("hello world")