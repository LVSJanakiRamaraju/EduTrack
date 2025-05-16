# 🎓 Student Dashboard

Student Dashboard is a full-stack web application that enables authenticated users to **view, filter, and manage student records**. It uses **Firebase Authentication** for login, stores data in **MongoDB Atlas**, and is built with a modern stack using React, Node.js, and Express.

---

## 🚀 Features

### 👨‍💼 User Side:
- 🔐 Login via Firebase Authentication
- 📋 View all student records in a clean table layout
- 🔍 Filter students by:
  - Course (dropdown)
  - Name (live search)
- 🧾 View detailed student info in a modal
- ➕ Add a new student (form)
- 🚪 Logout securely

---

## 🛠️ Tech Stack

- **Frontend:** React.js (Vite), Tailwind CSS, Axios  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB Atlas  
- **Authentication:** Firebase Authentication  
- **Deployment:** Vercel (Frontend) & Render (Backend)

---

## 🖥️ Setup Instructions (Local)

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/LVSJanakiRamaraju/EduTrack.git
cd EduTrack
```

### 2️⃣ Backend Setup
``` bash
cd server
npm install
```
### ✏️ Create .env File
```bash
PORT=5000
MONGO_URI=your-mongodb-connection-uri
```

### ▶️ Start Backend
``` bash
node server.js
```
### 3️⃣ Frontend Setup
``` bash
cd ..
cd client
npm install
npm run dev
```
Make sure to update the API base URL inside your frontend (e.g., api.js or config file):

```js
// src/firebase/firebaseConfig.js:
const URL = "http://localhost:5000";
// 🔥 Firebase Configuration

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

```


### 📦 API Endpoints

| Method | Endpoint                         | Description                           |
|--------|----------------------------------|---------------------------------------|
| GET    | `/students`                      | Get all student records               |
| POST   | `/students`                      | Add a new student                     |


### 🔐 Authentication
Firebase Authentication is used for login.

Authenticated users can access the dashboard and all features.




### 🔮 Future Improvements
### ✏️ Edit/Delete student entries

### 📤 CSV export of student list

### 🧠 AI-based performance insights (planned)

### 🔎 Filter by additional fields (email, phone, etc.)

### 🤝 Contributing
Fork the repo

Create a new branch: git checkout -b my-feature

Make your changes

Push and open a pull request

### 📧 Contact
Email: rajakanumuri2005@gmail.com

### 📝 License
This project is licensed under the MIT License.