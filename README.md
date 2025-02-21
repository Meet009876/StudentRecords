# Student Record Management System

This project implements a web-based student record management system using Flask, HTML, CSS, JavaScript, and SQL (SQLite). It provides a user-friendly interface for managing student data, including viewing, searching, and updating records. This project was primarily a learning exercise to explore full-stack development concepts and best practices.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup](#setup)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Challenges and Learnings](#challenges-and-learnings)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)

## Introduction

This project demonstrates a basic full-stack web application for managing student records. It utilizes Flask for the backend, HTML, CSS, and JavaScript for the frontend, and an SQLite database for data persistence. It was designed as a learning project to gain practical experience with full-stack development.

## Features

- **View All Records:** Displays a table of all student records, including roll number, name, grade, and course.
- **Search Functionality:** Allows users to search for students by roll number or name.
- **Update Grades:** Enables users to update student grades via an interactive modal.

## Technologies Used

- **Backend:** Flask (Python)
- **Frontend:** HTML, CSS, JavaScript
- **Database:** SQLite
  
## Setup

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/student-record-management.git
   ```

2. **Navigate to the Directory:**
   ```bash
   cd student-record-management
   ```

3. **Set up a Virtual Environment (Recommended):**
   ```bash
   python3 -m venv venv  # Create a virtual environment
   source venv/bin/activate  # Activate the environment (Linux/macOS)
   venv\Scripts\activate  # Activate the environment (Windows)
   ```

4. **Install Dependencies:**
   ```bash
   pip install -r requirements.txt  # Create a requirements.txt file with your project's dependencies
   ```

5. **Database Setup (SQLite):** The database file (`students.db` or whatever you name it) will be created automatically in the project directory.

6. **Run the Application:**
   ```bash
   python app.py  # Or whatever your Flask app file is named
   ```

## Usage

1. Open your web browser and navigate to `http://127.0.0.1:5000/` (or the appropriate address and port).
2. Use the search bar to find students.
3. Click the "Update Grade" button to open the modal and change a student's grade.

## Project Structure

```
student-record-management/
├── app.py        # Flask application file
├── templates/    # HTML templates
│   └── index.html
├── static/       # CSS and JavaScript files
│   ├── script.js
│   ├── style.css  # If you have a separate CSS file
├── students.db   # The SQLite database file
├── requirements.txt # Project dependencies
└── README.md     # This file
```

## Challenges and Learnings

- **JavaScript Scope:** Initially, I encountered issues with JavaScript's scope when trying to call the `showModal` function from inline `onclick` handlers in the HTML. This was resolved by using event delegation on the table body.
- **Event Delegation:** Learning and implementing event delegation was a key takeaway from this project. It's a powerful technique for handling events on dynamically generated elements.

## Future Enhancements

- Implement user authentication.
- Add more features, such as adding, deleting, and editing student records.
- Improve the styling and user interface.
- Implement better error handling.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

