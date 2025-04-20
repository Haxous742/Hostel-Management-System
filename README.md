# 🏨 Hostel Management System – IIIT Bangalore

A full-stack application built to digitize and streamline hostel operations at **IIIT Bangalore**. This system simplifies complaint registration, leave management, mess feedback, and more — all on a centralized platform for both students and administrators.

[![GitHub Repo](https://img.shields.io/badge/Visit%20Repo-%2312100E.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Haxous742/Hostel-Management-System.git)

---

## 📌 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Installation Guide](#-installation-guide)
- [Usage](#-usage)


---

## ✨ Features

### 🧑‍🏫 For Students:
- **Dashboard**: View recent community posts, daily mess menu, upcoming meal, and student birthdays.
- **Community Posts**: Share or view updates, events, and hostel notices.
- **Mess IIITB**: View daily menu and rate food quality.
- **Complaints**: File complaints for mess, rooms, gym, MPH, etc.
- **Leave Application**: Apply for leave with OTP verification sent to registered parent email.
- **Profile**: View and update personal details including profile picture.

### 🧑‍💼 For Admins:
- Access and manage student complaints and leave applications.

---

## 🛠 Tech Stack

- **Frontend**: React (Vite), Tailwind CSS, Flowbite React  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB ( Atlas)  
- **Authentication**: JWT tokens , nodemailer.

---

## ⚙️ Installation Guide

### Prerequisites

- Node.js (v18 or higher)  
- npm (v9 or higher)  
- Git  
- MongoDB (local or MongoDB Atlas)  

### Steps

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Haxous742/Hostel-Management-System.git
   cd Hostel-Management-System
   ```

2. **Set Up Frontend**:
   ```bash
   cd client
   npm install
   ```

3. **Set Up Backend**:
   ```bash
   cd ../server
   npm install
   ```



5. **Run the Application**:

   For the simplicity of the installations , we have given out our api keys in the "./env" file , We understnad that this is not a good practice.

   - In one terminal, run frontend:
     ```bash
     cd client
     npm run dev
     ```
     Visit: [http://localhost:5173](http://localhost:5173)

   - In another terminal, run backend:
     ```bash
     cd server
     node index.js
     ```
     API: [http://localhost:5000](http://localhost:5000)

---

## ▶️ Usage

- Make sure CORS is enabled if frontend and backend run on different ports.
- Use `axios` for frontend API calls.
- For production, build frontend using `npm run build` and serve via Express.

---

## 👥 Contributors

- [@Haxous742](https://github.com/Haxous742)

---

## 📄 License

This project is licensed under the MIT License.

