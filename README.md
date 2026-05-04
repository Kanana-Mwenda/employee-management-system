# Employee Management System

A simple full-stack Employee Management System built using **Spring Boot (backend)** and **HTML/CSS/JavaScript (frontend)**.  
It supports full CRUD operations for managing employee records.

---

## Features

- Add new employees
- View all employees
- Update employee details
- Delete employees
- Form validation (backend + frontend)
- REST API integration
- H2 in-memory database

---

## Tech Stack

### Backend
- Java 17+
- Spring Boot
- Spring Data JPA
- H2 Database
- Maven

### Frontend
- HTML
- CSS
- JavaScript (Fetch API)

---

## Setup Instructions

### 1. Clone the project
git clone <your-repo-link>
cd employee-mgmt

## 2. Run Backend (Spring Boot)

**Using terminal:**
```bash
mvn spring-boot:run
```

**OR run in IDE:**
1. Open `EmployeeMgmtApplication.java`
2. Click **Run**

---

## 3. Backend URL

```
http://localhost:8080
```

## 4. H2 Database Console

Access the database at:
```
http://localhost:8080/h2-console
```

**Login details:**

| Field    | Value                    |
|----------|--------------------------|
| JDBC URL | `jdbc:h2:mem:employeedb` |
| Username | `sa`                     |
| Password | *(leave blank)*          |

---

## 5. Run Frontend

**Option 1 — Simple:**
- Open `index.html` directly in your browser


## API Endpoints

| Method   | Endpoint                | Description          |
|----------|-------------------------|----------------------|
| `POST`   | `/api/employees`        | Create employee      |
| `GET`    | `/api/employees`        | Get all employees    |
| `GET`    | `/api/employees/{id}`   | Get employee by ID   |
| `PUT`    | `/api/employees/{id}`   | Update employee      |
| `DELETE` | `/api/employees/{id}`   | Delete employee      |