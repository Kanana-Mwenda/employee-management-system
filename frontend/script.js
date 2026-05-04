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
        const message = document.getElementById("message");

        message.innerText = "Employee added successfully!";
        message.style.color = "green";

        // clear form
        document.getElementById("employeeForm").reset();

        setTimeout(() => {
            message.innerText = "";
        }, 2000);

    })
    .catch(error => {
        const message = document.getElementById("message");

        message.innerText = "Error: " + error.message;
        message.style.color = "red";
})
}); 