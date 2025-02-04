from flask import Flask, request, jsonify, render_template
import sqlite3

app = Flask(__name__)

# Function to connect to SQLite database
def get_db_connection():
    conn = sqlite3.connect("students.db")
    conn.row_factory = sqlite3.Row  # Fetch results as dictionaries
    return conn

# Serve index.html
@app.route('/')
def index():
    return render_template('index.html')

# API to fetch all students
@app.route('/api/students', methods=['GET'])
def get_students():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM students")
    students = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return jsonify(students)

# API to search student by roll number
@app.route('/api/students/search', methods=['GET'])
def search_students():
    query = request.args.get('query', '').strip()

    if not query:
        return jsonify({"error": "Query parameter is required"}), 400

    conn = get_db_connection()
    cursor = conn.cursor()

    # Search for roll number or name (case-insensitive)
    cursor.execute("SELECT * FROM students WHERE roll_number LIKE ? OR name LIKE ?", 
                   (f"%{query}%", f"%{query}%"))
    
    students = [dict(row) for row in cursor.fetchall()]
    conn.close()

    return jsonify(students)


# API to update a student's grade
@app.route('/api/students/update', methods=['POST'])
def update_student():
    data = request.get_json()
    roll_number = data.get("roll_number")
    new_grade = data.get("grade")

    if not roll_number or not new_grade:
        return jsonify({"error": "Missing required fields"}), 400

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("UPDATE students SET grade = ? WHERE roll_number = ?", (new_grade, roll_number))
    conn.commit()
    conn.close()

    return jsonify({"message": "Grade updated successfully"})

if __name__ == "__main__":
    app.run(debug=True)
