# Product Catalog Manager 🛍️

A full-stack application for managing products — built with Java Spring Boot (backend) and React + Tailwind (frontend).

---

## 🔧 Tech Stack

- Java Spring Boot (Backend)
- React + Tailwind CSS (Frontend)
- JWT Authentication
- Role-based Authorization (Admin/User)

---

## 📁 Project Structure

product-catalog-manager/
├── backend/ → Java Spring Boot API
├── frontend/ → React + Tailwind UI

yaml
Copy
Edit

---

## 🧪 How to Run

### ▶️ Backend (Spring Boot)

```bash
cd backend
./mvnw spring-boot:run
Make sure you have:

Java 17+

Spring Boot installed

A PostgreSQL DB (or update application.yml to your DB)

💻 Frontend (React)
bash
Copy
Edit
cd frontend
npm install
npm run dev
🔐 Authentication
Uses JWT

Auth data (token, role) stored in localStorage

Protected dashboard route

👤 Login Info
Default role on registration: USER

To use admin features (like adding products), set a user to ADMIN manually in the DB.