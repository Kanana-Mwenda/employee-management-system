function showToast(message, isError = false) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.toggle("error", isError);
    toast.classList.add("show");

    clearTimeout(toast.hideTimeout);
    toast.hideTimeout = setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}

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
        showToast(id ? "Employee updated successfully!" : "Employee added successfully!");

        document.getElementById("employeeForm").reset();
        document.getElementById("employeeId").value = "";

        loadEmployees();
    })
    .catch(error => {
        showToast(error.message, true);
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
let deleteId = null;

function deleteEmployee(id) {
    deleteId = id;

    document.getElementById("confirmModal").style.display = "flex";
    document.body.classList.add("modal-open");
}

// CONFIRM DELETE
document.getElementById("confirmDelete").addEventListener("click", function () {
    fetch(`http://localhost:8080/api/employees/${deleteId}`, {
        method: "DELETE"
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to delete employee");
        }

        closeModal();
        loadEmployees();
        showToast("Employee deleted successfully!");
    })
    .catch(error => {
        closeModal();
        showToast(error.message, true);
    });
});

// CANCEL DELETE
    document.getElementById("cancelDelete").addEventListener("click", closeModal);

// CLOSE MODAL FUNCTION
    function closeModal() {
        document.getElementById("confirmModal").style.display = "none";
        document.body.classList.remove("modal-open");
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