// script.js
document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("searchInput");
    const tableBody = document.getElementById("studentsTableBody");
    const updateModal = document.getElementById("updateModal");
    const modalStudentInfo = document.getElementById("modalStudentInfo");
    const newGradeInput = document.getElementById("newGradeInput");
    let selectedRollNumber = null;

    function closeModal() {
        updateModal.style.display = "none";
        selectedRollNumber = null;
        newGradeInput.value = "";
    }

    async function confirmUpdate() {
        const newGrade = newGradeInput.value.trim();
        if (!newGrade) {
            alert("Please enter a valid grade.");
            return;
        }

        try {
            const response = await fetch("/api/students/update", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ roll_number: selectedRollNumber, grade: newGrade }),
            });

            if (response.ok) {
                fetchStudents();
                closeModal();
            } else {
                const errorData = await response.json();
                alert(errorData.error || "Error updating grade.");
            }
        } catch (error) {
            console.error("Error updating grade:", error);
        }
    }

    async function fetchStudents() {
        try {
            const response = await fetch("/api/students");
            const students = await response.json();
            renderStudents(students);
        } catch (error) {
            console.error("Error fetching students:", error);
        }
    }

    function showModal(rollNumber, name) {
        selectedRollNumber = rollNumber;
        modalStudentInfo.textContent = `Updating grade for: ${name} (Roll: ${rollNumber})`;
        newGradeInput.value = "";
        updateModal.style.display = "flex";
    }

    async function searchStudent() {
        const query = searchInput.value.trim();
        if (!query) {
            fetchStudents();
            return;
        }

        try {
            const response = await fetch(`/api/students/search?query=${encodeURIComponent(query)}`);
            const students = await response.json();

            if (students.length === 0) {
                tableBody.innerHTML = `<tr><td colspan="5" class="no-data">No students found</td></tr>`;
            } else {
                renderStudents(students);
            }
        } catch (error) {
            console.error("Error searching students:", error);
        }
    }

    function renderStudents(students) {
        if (students.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="5" class="no-data">No students found</td></tr>`;
            return;
        }

        tableBody.innerHTML = students
            .map(
                (student) => `
                <tr>
                    <td>${student.roll_number}</td>
                    <td>${student.name}</td>
                    <td>${student.grade}</td>
                    <td>${student.course}</td>
                    <td><button>Update Grade</button></td> 
                </tr>
            `
            )
            .join("");
    }

    // Event delegation for table buttons
    tableBody.addEventListener("click", function (event) {
        const target = event.target;
        if (target.tagName === "BUTTON") {
            const row = target.closest("tr");
            const rollNumber = row.cells[0].textContent;
            const name = row.cells[1].textContent;
            showModal(rollNumber, name);
        }
    });

    document.querySelector("button[onclick='handleFetchAll()']").addEventListener("click", fetchStudents);
    document.querySelector("button[onclick='handleSearch()']").addEventListener("click", searchStudent);
    document.querySelector("#updateModal .modal-close").addEventListener("click", closeModal);
    document.querySelector("#updateModal .confirm-update").addEventListener("click", confirmUpdate);

    searchInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            searchStudent();
        }
    });

    fetchStudents();
});