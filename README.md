# 🚀 Backend Service – Agentic AI System

## 📌 Overview

This backend powers an **Agentic AI-based system** that handles:

* User registration
* Policy creation
* Dynamic premium calculation
* Automated triggers
* Claim processing

The architecture is modular, scalable, and designed for clean separation of concerns.

---

## 🏗️ Project Structure

```
backend/
│── config.py              # Configuration settings
│── .env                   # Environment variables (secrets)
│── .env.example           # Sample env file
│── requirements.txt       # Dependencies

├── agents/                # AI agents (core logic)
├── services/              # Business logic layer
├── models/                # Data models / schemas
├── utils/                 # Helper functions
├── database/              # DB connection & queries
├── routes/                # API endpoints
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository

```bash
git clone <repo-url>
cd backend
```

### 2️⃣ Create virtual environment

```bash
python -m venv venv
venv\Scripts\activate   # Windows
```

### 3️⃣ Install dependencies

```bash
pip install -r requirements.txt
```

### 4️⃣ Setup environment variables

Copy `.env.example` → `.env` and fill values:

```
OPENAI_API_KEY=your_key
DATABASE_URL=your_db_url
SECRET_KEY=your_secret
```

---

## ▶️ Running the Server

```bash
python main.py
```

OR (if using FastAPI/Uvicorn):

```bash
uvicorn main:app --reload
```

---

## 🧠 Core Components

### 🔹 agents/

* Implements **agentic AI logic**
* Handles:

  * Decision making
  * Trigger execution
  * Automated workflows

---

### 🔹 services/

* Business logic layer
* Examples:

  * Policy creation
  * Premium calculation
  * Claim validation

---

### 🔹 models/

* Defines data structures
* Includes:

  * Request/Response schemas
  * Database models

---

### 🔹 routes/

* API endpoints
* Example:

  * `/register`
  * `/create-policy`
  * `/trigger-event`
  * `/claim`

---

### 🔹 database/

* Database connection setup
* Query handling

---

### 🔹 utils/

* Common helper functions
* Logging, formatting, etc.

---

## 🔄 Key Features

✔ User registration system
✔ Dynamic weekly premium calculation
✔ At least 3 automated triggers
✔ Auto claim processing using AI agents

---

## 🧪 API Testing

Use:

* Postman
* Thunder Client
* cURL

Example:

```bash
POST /create-policy
```

---

## 🔐 Security Notes

* Never commit `.env`
* Use secure API key storage
* Validate all inputs

---

## 📦 Future Improvements

* Add authentication (JWT)
* Add logging & monitoring
* Deploy using Docker
* CI/CD integration

---

## 👨‍💻 Tech Stack

* Python
* FastAPI / Flask (depending on your setup)
* Agentic AI (LangChain / custom agents)
* Database (SQL / NoSQL)

---


