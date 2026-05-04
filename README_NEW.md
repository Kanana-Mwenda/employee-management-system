# Employee Management System

A simple full-stack Employee Management System built using **Spring Boot (backend)** and **HTML/CSS/JavaScript (frontend)**.  
It supports full CRUD operations for managing employee records.

---

## 🚀 Features

- Add new employees
- View all employees
- Update employee details
- Delete employees
- Form validation (backend + frontend)
- REST API integration
- H2 in-memory database

---

## 🛠️ Tech Stack

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

## 📁 Project Structure

```
src/main/java/com/company/employee_mgmt/

├── controller/
├── service/
├── repository/
├── model/
├── exception/
└── EmployeeMgmtApplication.java
```

---

## Setup Instructions

### 1. Clone the project
```bash
git clone <your-repo-link>
cd employee-mgmt
```

### 2. Run Backend (Spring Boot)

**Using terminal:**
```bash
mvn spring-boot:run
```

**OR run in IDE:**
- Open `EmployeeMgmtApplication.java`
- Click **Run**

### 3. Backend URL
```
http://localhost:8080
```

### 4. H2 Database Console

**Access database:**
```
http://localhost:8080/h2-console
```

**Login details:**
- **JDBC URL:** `jdbc:h2:mem:employeedb`
- **Username:** `sa`
- **Password:** (leave blank)

### 5. Run Frontend

**Option 1 (Simple)**
- Open `index.html` in browser

**Option 2 (Recommended)**
- Use VS Code Live Server
- Right-click `index.html`
- Click **Open with Live Server**

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/employees` | Create employee |
| GET | `/api/employees` | Get all employees |
| GET | `/api/employees/{id}` | Get employee by ID |
| PUT | `/api/employees/{id}` | Update employee |
| DELETE | `/api/employees/{id}` | Delete employee |
