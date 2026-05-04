document.getElementById("employeeForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const employee = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        email: document.getElementById("email").value,
        department: document.getElementById("department").value,
        salary: document.getElementById("salary").value
    };

    fetch("http://localhost:8080/api/employees", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(employee)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Validation error or bad request");
        }
        return response.json();
    })
    .then(() => {
        document.getElementById("message").innerText = "Employee added successfully!";
        document.getElementById("message").style.color = "green";

        document.getElementById("employeeForm").reset();

        loadEmployees();

        setTimeout(() => {
            document.getElementById("message").innerText = "";
        }, 2000);
    })
    .catch(error => {
        document.getElementById("message").innerText = error.message;
        document.getElementById("message").style.color = "red";
    });
});


// LOAD EMPLOYEES
window.onload = function () {
    loadEmployees();
};


// GET ALL EMPLOYEES
function loadEmployees() {
    fetch("http://localhost:8080/api/employees")
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById("employeeBody");
            tableBody.innerHTML = "";

            data.forEach(emp => {
                const row = `
                    <tr>
                        <td>${emp.id}</td>
                        <td>${emp.firstName} ${emp.lastName}</td>
                        <td>${emp.email}</td>
                        <td>${emp.department}</td>
                        <td>${emp.salary}</td>
                        <td>
                            <button onclick="deleteEmployee(${emp.id})">Delete</button>
                            <button onclick="editEmployee(${emp.id})">Edit</button>
                        </td>
                    </tr>
                `;
                tableBody.innerHTML += row;
            });
        });
}


// DELETE EMPLOYEE
function deleteEmployee(id) {
    if (confirm("Are you sure you want to delete this employee?")) {
        fetch(`http://localhost:8080/api/employees/${id}`, {
            method: "DELETE"
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to delete employee");
            }
            loadEmployees(); // refresh table
        })
        .catch(error => alert(error.message));
    }
}