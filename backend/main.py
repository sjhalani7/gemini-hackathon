from flask import Flask, request, jsonify
from flask_cors import CORS
import config
import google.generativeai as genai
import fitz
import firebase
import json
import os

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}}, supports_credentials=True)

API_KEY = config.API_KEY
genai.configure(api_key=API_KEY)
chat_hist = {}

next_id = 0

model = genai.GenerativeModel('gemini-1.5-flash')
major_reqs = {
    'Computer Science': "files/CS checklist.pdf",
    "Public Health": "files/Public Health checklist.pdf",
    "Political Science": "files/Poli Sci checklist.pdf",
    "History":"files/History checklist.pdf",
    "Electrical Engineering": "files/ELEN checklist.pdf",
    "Accounting": "files/accounting checklist.pdf"
}

def create_prompt(path_to_file, mode='tutor'):
    if mode == 'advisor':
        courses_offered = f"{read_pdf(path_to_file)}"
        major_requirements = ""
        for major in major_reqs.keys():
            major_requirements += f"REQUIREMENTS FOR {major}: {read_pdf(major_reqs[major])} \n\n"

        initial_prompt = f"""
                You are an advanced language model serving as a virtual academic advisor for students. You have been provided with the following information which includes details about the courses required to complete each major:

                "{major_requirements}".
                
                Here is the info about the courses offered this quarter: 
                "{courses_offered}"

                Your task is to assist students in planning their courses based on the requirements they need to fulfill. You should provide clear, accurate, and personalized advice based on the information contained in the provided documents. Here are some key points to guide your responses:

                1. **Understand Requirements**: Ask students for their major, year of study, and any specific requirements or preferences they have for the upcoming quarter.
                2. **Course Recommendations**: Suggest courses that fit the student's requirements and preferences. Explain why each course is recommended, considering prerequisites, course load, and relevance to their major.
                3. **Fulfillment of Requirements**: Ensure that the suggested courses help fulfill the necessary requirements for the student's major and year of study.
                4. **Balance and Workload**: Advise on how to balance course load to avoid overloading or underloading, taking into account the difficulty and workload of each course.
                5. **Prerequisites and Progression**: Highlight any prerequisites for recommended courses and suggest a sequence of courses that align with the student's academic progression.
                6. **Electives and Interests**: Recommend elective courses that align with the student's interests and career goals, if applicable.
                7. **Alternative Options**: Provide alternative course options in case the preferred courses are full or not available.
                8. **Future Planning**: Offer guidance on future course planning to ensure timely graduation and fulfillment of all major requirements.

                Remember, your goal is to help students make informed decisions about their course schedules that align with their academic goals and requirements. Provide responses that are informative, supportive, and tailored to each student's unique situation. If a question goes beyond the scope of the provided material, encourage the student to seek further advice from a human academic advisor.

                Please begin by acknowledging that you have received the course information and are ready to assist with any questions regarding course planning.
                """
    else:
        material_text = ""
        file_names = os.listdir(path_to_file)
        i = 1
        for filename in file_names:
            material_text += f"""
            Here is the text for Lecture {i}\n: {read_pdf(f"{path_to_file}/{filename}")}
            """
            i+=1

        initial_prompt = f"""
                    You are an advanced language model serving as a virtual assistant for professors during office hours. You have been provided with the following material which includes lecture slides, notes, and other educational content:

                    "{material_text}"

                    Your task is to assist students by answering questions related to this material. You should provide clear, accurate, and concise responses based on the information contained in the provided documents. If the material does not cover the student's question, inform them that the information is not available in the provided material. Here are some key points to guide your responses:

                    1. Clarify Concepts: Explain concepts, definitions, and theories as presented in the material.
                    2. Provide Examples: Use examples from the material to illustrate key points and explanations.
                    3. Relate Topics: Show how different topics covered in the material are interconnected.
                    4. Summarize Content: Provide summaries of sections or topics if a student needs an overview.
                    5. Assist with Assignments: Help students understand how to approach and solve problems or assignments based on the material.
                    6. Refer to Specific Sections: When possible, direct students to the specific section or slide in the material where they can find more information.
                    7. Help design practice problems based on the material: If prompted, come up with practice problems that test the concepts in the material.
                    8. If you get asked a question not at all related to the material, categorically deny it and MAKE SURE to acknowledge that it was not part of the material provided. 

                    Remember, your goal is to enhance the learning experience by being a knowledgeable and supportive resource for students. Provide responses that are informative and educational. If a question goes beyond the scope of the provided material, encourage the student to discuss it further with the professor during their next office hours.

                    Please begin by acknowledging the material you have received and are ready to assist with any questions.
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

def process_history(chat_session_history_obj):
    history_serializable = []
    for item in chat_session_history_obj:
        message_text = "".join([part.text for part in item.parts])
        history_serializable.append({"role": item.role, "text": message_text})
    return jsonify({"history": history_serializable}).get_data(as_text=True)

@app.route('/initialize', methods=['POST'])
def initialize_model():
    data = request.get_json()
    mode = data.get("mode")
    chat_id = str(data.get("chat_id"))

    if not mode:
        return jsonify({"error": "Mode not provided"}), 400
    
    if chat_id not in chat_hist:
        if mode == 'advisor':
            path_to_file = "files/courses_offered.pdf"
        else:
            path_to_file = "files/CSCI-183" #TODO: fix this logic
        prompt = create_prompt(path_to_file, mode)
        chat_session = init_prompt_llm(prompt)
        chat_hist[chat_id] = chat_session

        firebase.add_id_to_db(str(chat_id), mode)
        return jsonify({"chat_id": chat_id, "message": "Model initialized successfully."})
    else:
        return jsonify({"chat_id": chat_id, "message": "Model already initialized."})

@app.route('/ask', methods=['POST'])
def ask_model():
    data = request.get_json()
    chat_id = data.get('chat_id')
    query = data.get('query')
    mode = data.get('mode')

    if not chat_id or chat_id not in chat_hist:
        return jsonify({"error": "Chat session not found."}), 400

    if not query:
        return jsonify({"error": "No query provided."}), 400

    chat_session = chat_hist.get(chat_id)
    response = send_question_to_model(chat_session, query)

    firebase.update_history(str(chat_id), process_history(chat_session.history), mode)
    return jsonify({"response": response})

@app.route('/chat-history', methods=['GET'])
def return_chat_history():
    chat_id = request.args.get('chat_id')
    mode = request.args.get('mode')

    print("Chat id: ", chat_id)
    print("Mode: ", mode)

    return jsonify(firebase.get_data_from_db(str(chat_id), str(mode)))


@app.route('/next-id', methods=['GET'])
def return_next_id():
    global next_id
    next_id += 1
    return jsonify(next_id)

@app.route('/chat-ids', methods=['GET'])
def get_all_chat_ids():
    mode = request.args.get('mode')

    if not mode:
        return jsonify({"error": "Mode is required."}), 400

    try:
        chat_ids = firebase.get_all_chat_ids(mode)
        return jsonify({"chat_ids": chat_ids})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# if __name__ == '__main__':
#     app.run(debug=True)