# Hostel Management System

The Hostel Management System for IIIT-Bangalore (IIITB) is a dedicated software application developed to simplify and enhance the management of hostel facilities within the institute. As IIITB accommodates a large number of residential students, efficient handling of room allocation, student records, fee tracking, and grievance redressal becomes essential. This system is designed to digitize and streamline these processes, replacing traditional manual methods that are often time-consuming and error-prone.

By providing a centralized platform for both students and hostel administrators, the system ensures transparency, improves communication, and enables quick decision-making. It supports key functionalities such as room assignment, attendance monitoring, leave applications, and complaint registration. Overall, the Hostel Management System contributes to a smoother and more organized residential experience for students at IIITB.

## Features

The Hostel Management System for IIITB is equipped with a range of features designed to simplify and automate hostel operations.
   
   1. Dashboard - The dashboard displays the three most recent community posts, the daily mess menu, the upcoming meal time, and highlights any student birthdays for the day.

   2. Community Posts - These features enable both students and administrators to share important updates, such as event announcements, maintenance notifications, and other timely information within the hostel community.

   3. Mess IIITB - It displays the daily mess menu and also provides a platform for students to rate the food served, helping maintain quality and gather feedback.

   4. Complaints - A dedicated portal that allows students to file complaints related to the mess, hostel rooms, MPH, gym, or any other hostel facilities, ensuring their concerns are addressed efficiently.

   5. Leave application - The system includes a leave application portal where students can apply for hostel leave by specifying the type of leave (e.g., medical, personal), along with the date and time of departure and return. Students must also provide a reason for the leave and submit the application. An OTP is then sent to their registered parent email ID, which must be entered to verify consent. Only after successful OTP verification is the leave request forwarded to the admin for further processing.

   6. Profile - This section displays the student’s personal information and provides an option to update the profile photo.

   7. The admin has a separate page where they can access student complaints and leave applications, allowing them to take the necessary actions.

## Installation Guide

Clone and Run React App with Vite, Flowbite, Tailwind, and MongoDB
This guide provides steps to clone an existing repository and set up the environment to run a full-stack application with a React frontend (using Vite, Flowbite React, Tailwind CSS) and a Node.js/Express backend connected to MongoDB.
Prerequisites

Node.js (v18 or higher)
npm (v9 or higher)
MongoDB (local installation or MongoDB Atlas account)
Git

Setup Instructions
1. Clone the Repository
Clone the repository to your local machine:
git clone <repo-url>
cd <name of the cloned repo>

2. Set Up the Frontend
Navigate to the frontend directory and install dependencies:
cd client
npm install

3. Set Up the Backend
Navigate to the backend directory and install dependencies:
cd ../server
npm install

4. Configure MongoDB

Local MongoDB: Ensure MongoDB is running locally (mongod).

MongoDB Atlas: Create a cluster, get the connection string, and add it to server/.env. Create or update server/.env:
MONGO_URI=<your-mongodb-connection-string>
PORT=5000



5. Run the Application
Open two terminal windows:

Frontend:
cd client
npm run dev

Open http://localhost:5173 in your browser.

Backend:
cd server
node index.js

API will be available at http://localhost:5000.


6. Additional Notes

Ensure CORS is properly configured if the frontend and backend are on different ports.
Use axios in the frontend to make API calls to the backend (e.g., http://localhost:5000/api/users).
For production, build the frontend (npm run build in client) and serve it using Express.

## Links

Github - https://github.com/Haxous742/Hostel-Management-System.git

Video Link - 

Host Link - 
