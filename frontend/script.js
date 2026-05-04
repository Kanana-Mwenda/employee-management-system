document.getElementById("employeeForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const id = document.getElementById("employeeId").value;

    const employee = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        email: document.getElementById("email").value,
        department: document.getElementById("department").value,
        salary: document.getElementById("salary").value
    };

    const url = id
        ? `http://localhost:8080/api/employees/${id}`
        : "http://localhost:8080/api/employees";

    const method = id ? "PUT" : "POST";

    fetch(url, {
        method: method,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(employee)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Request failed");
        }
        return response.json();
    })
    .then(() => {
        document.getElementById("message").innerText =
            id ? "Employee updated successfully!" : "Employee added successfully!";

        document.getElementById("message").style.color = "green";

        document.getElementById("employeeForm").reset();
        document.getElementById("employeeId").value = "";

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
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to load employees");
            }
            return response.json();
        })
        .then(data => {
            const tableBody = document.getElementById("employeeBody");
            tableBody.innerHTML = "";

            data.forEach(emp => {
                tableBody.innerHTML += `
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
            });
        })
        .catch(error => console.log(error));
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
            loadEmployees();
        })
        .catch(error => alert(error.message));
    }
}

// EDIT EMPLOYEE
function editEmployee(id) {
    fetch(`http://localhost:8080/api/employees/${id}`)
        .then(response => response.json())
        .then(emp => {
            document.getElementById("firstName").value = emp.firstName;
            document.getElementById("lastName").value = emp.lastName;
            document.getElementById("email").value = emp.email;
            document.getElementById("department").value = emp.department;
            document.getElementById("salary").value = emp.salary;
            document.getElementById("employeeId").value = emp.id;
        });
}