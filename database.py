import sqlite3

# Connect to SQLite (creates the database file if it doesn't exist)
conn = sqlite3.connect("students.db")
cursor = conn.cursor()

# Create the students table
cursor.execute('''
CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    roll_number TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    grade TEXT NOT NULL,
    course TEXT NOT NULL
)
''')

# Insert some sample data
sample_students = [
    ("001", "John Doe", "A", "Computer Science"),
    ("002", "Jane Smith", "B", "Mathematics"),
    ("003", "Alice Johnson", "A", "Physics"),
    ("004", "Bob Wilson", "C", "Chemistry"),
    ("005", "Carol Brown", "B", "Biology"),
]

# Insert data if table is empty
cursor.execute("SELECT COUNT(*) FROM students")
if cursor.fetchone()[0] == 0:
    cursor.executemany("INSERT INTO students (roll_number, name, grade, course) VALUES (?, ?, ?, ?)", sample_students)

# Commit changes and close connection
conn.commit()
conn.close()

print("Database setup complete.")
