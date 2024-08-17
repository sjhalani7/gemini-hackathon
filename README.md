# Gem.edu - AI-Powered Academic Advisor & Virtual Tutor

Welcome to the GitHub repository for **Gem.edu**, a web application developed as part of Google’s Gemini API Developer Competition. Gem.edu is designed to make the most stressful parts of academic life easier for college students: course registration and navigating course materials.

## 🌟 What is Gem.edu?

Gem.edu is a personalized teacher and advisor outside of the classroom, providing two main functionalities:

### 📚 Academic Advisor
- **Plan Your Courses**: Gem.edu analyzes available courses and major requirements for each student, helping them plan their courses for the upcoming quarter.
- **24/7 Availability**: It’s like having your own academic advisor available 24/7, ensuring you stay on track and make informed decisions about your academic journey.

### 🎓 Virtual Tutor
- **Answer Questions**: Our virtual tutor leverages professor lecture notes to provide instant, accurate, and personalized support whenever students need it.
- **Late-Night Study Help**: Whether it’s 2:00 am the night before a midterm or a last-minute question, Gem.edu is there to help.

## 🎥 Demo

Want to see Gem.edu in action? Check out our demo video here: [YouTube Demo Video](https://www.youtube.com/watch?v=BVtw-ZKlJEM)

## 🚀 Getting Started

### Prerequisites

To get started with Gem.edu, you’ll need the following:

- Node.js
- Python 3.x
- Flask
- Firebase Admin SDK and credentials
- Google Gemini API Key and credentials

### 📚 Libraries and Installation Commands

- **Flask**: `pip install Flask`
- **Flask-CORS**: `pip install flask-cors`
- **Google Generative AI (genai)**: `pip install google-generativeai`
- **PyMuPDF (fitz)**: `pip install pymupdf`
- **Firebase Admin SDK**: `pip install firebase-admin`
- **firebase**: `pip install firebase`
- **os**: (part of Python standard library, no installation required)
- **json**: (part of Python standard library, no installation required)


### Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/gem-edu.git
    cd gem-edu
    ```

2. **Set up the backend**:  

    Navigate to the /backend directory:  
    ```bash
    cd backend
    ```

    Set up a virtual environment:
    ```bash
    python3 -m venv venv
    source venv/bin/activate
    ```

    Install dependencies:
    ```bash
    pip install [library-name] #for the required dependencies
    ```

    Set up environment variables:  
      - For the backend: 
        - Replace the `cred` variable in the `firebase.py` file with the path to your serviceKey to the firebase database. 
        - Create a `config.py` file in the `backend` directory of the project and add your environment variables:
    
    ```bash
    API_KEY=your-secret-key #in the config.py file
    ```

    Run the backend:
    ```bash
    export FLASK_APP=main.py
    flask run
    ```

3. **Set up the frontend**:  

    Navigate to the /client directory:
    ```bash
    cd ../client
    ```

    Install frontend dependencies:
    ```bash
    npm install
    ```

    Run the frontend:
    ```bash
    npm run dev
    ```

    Your front-end application should now be running at http://localhost:3000


## 🛠️ Features

- **Personalized Course Planning**: Helps students build a custom schedule based on the classes they have completed and the ones they need to take.
- **24/7 Virtual Tutor**: Provides support based on lecture notes, answering questions on-demand.
- **User-Friendly Interface**: Designed to be intuitive and easy to use for students of all technical levels.

## 📈 Future Enhancements

As we continue to develop and refine Gem.edu, we have several exciting plans for the future to make the app even more powerful and user-friendly:

### 1. Expanded Major and Course Support
- Currently, Gem.edu supports a limited number of majors. We plan to scale this up, covering a broader range of majors and academic programs to serve more students effectively.

### 2. Automated Course History Integration
- In the future, we aim to auto-ingest students' past course histories. This will allow students to receive personalized course schedules without manually inputting the classes they’ve taken, making the process even more seamless.

### 3. Google Calendar Integration
- We plan to integrate Gem.edu with Google Calendar, enabling students to directly import their chosen class schedules into their calendar with just a few clicks. This will help students manage their time more effectively.

### 4. Enhanced Schedule Building
- We’re working on further improving the schedule-building feature, allowing Gem.edu to consider various class timings and offer multiple scheduling options based on students' preferences.

### 5. Advanced Professor Interaction Controls
- We envision a backend system where professors can customize how students interact with Gem.edu. This could include tailored question-answer models or specific guidelines for using the tool, enhancing the learning experience.

### 6. Integration with Educational Platforms
- We plan to integrate Gem.edu with popular educational tools like Canvas. This would allow for automatic uploads of files and lecture materials, and potentially incorporate class recording transcripts into the model, enabling Gemini to provide even more accurate and comprehensive answers.

### 7. Enhanced Chat History and Management
- Building on our current Firebase integration, we intend to expand the chat history functionality, allowing students to easily switch between discussions for different classes and maintain an organized study workflow.

These future enhancements aim to make Gem.edu a comprehensive academic tool that not only assists with course planning and tutoring but also integrates seamlessly into the broader academic ecosystem, helping students succeed in every aspect of their education.


## 🙏 Support

We'd love to hear your thoughts on the project! If you find Gem.edu useful, consider supporting us by:
- **Sharing your feedback**: Let us know how we can improve.
- **Spreading the word**: Share this project with others who might benefit from it.
- **Voting for us**: We’re in the running for the People’s Choice Award—your vote could make all the difference!

## 💬 Contact

Feel free to reach out to us if you have any questions or if you are unable to run the code:
- [Shiv Jhalani](mailto:shivjhalani@gmail.com)
- [Chris Tamayo](mailto:chriswtamayo@gmail.com)

---

Thank you for checking out Gem.edu! Let's make education better, together.
