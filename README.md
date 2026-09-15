# DindaGPT 🤖

DindaGPT is a full-stack AI chatbot application inspired by ChatGPT. It allows users to create conversations, interact with an AI assistant, and securely manage their chat history.

## 🚀 Live Demo

Frontend: https://dindagpt-frontend.onrender.com/

Backend: https://dindagpt.onrender.com

## ✨ Features

- 🤖 AI-powered chatbot using Google Gemini API
- 🔐 User Registration and Login
- 🔑 JWT-based authentication
- 🔒 Password hashing using bcrypt
- 💬 AI chat interface
- 📝 Create and manage multiple conversations
- 🗑️ Delete chat threads
- 💾 Store chat history in MongoDB
- 👤 User-specific chat history
- 📱 User-friendly interface
- ☁️ Deployed on Render

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- CSS
- Font Awesome

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt

### AI
- Google Gemini API

### Deployment
- Render

## 📂 Project Structure

DindaGPT/
│
├── Backend/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── server.js
│   └── package.json
│
└── Frontend/
    ├── src/
    ├── public/
    ├── index.html
    └── package.json

## 🔐 Authentication

DindaGPT uses JWT authentication to protect user data and chat history.

- Users can create an account using Sign Up.
- Users can log in using their email and password.
- Passwords are securely hashed using bcrypt.
- JWT tokens are used to authenticate API requests.
- Each user can access only their own chat threads.

## 💾 Database

MongoDB is used to store:

- User information
- Chat threads
- Messages
- Conversation timestamps

## 🤖 Gemini Integration

DindaGPT uses the Google Gemini API to generate AI responses.

The Gemini API key is stored securely in environment variables and is not included in the GitHub repository.

## ⚙️ Environment Variables

### Backend

Create a `.env` file inside the Backend folder:

GEMINI_API_KEY=your_gemini_api_key
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=8080

### Frontend

Create a `.env` file:

VITE_API_URL=your_backend_url

## ▶️ Run Locally

### 1. Clone the repository

git clone https://github.com/Sangita-Dinda-21/DINDAGPT.git

### 2. Start Backend

cd Backend

npm install

npm run dev

### 3. Start Frontend

Open another terminal:

cd Frontend

npm install

npm run dev

## 🌐 Deployment

The application is deployed using Render.

- Frontend → Render Static Site
- Backend → Render Web Service
- Database → MongoDB Atlas

## 📸 Screenshots

Add screenshots of:

1. DindaGPT home page
2. Login page
3. Sign Up page
4. Chat interface
5. Chat history/sidebar

## 👩‍💻 Author

### Sangita Dinda

B.Tech Computer Science & Engineering  
Meghnad Saha Institute of Technology (MAKAUT)

GitHub: https://github.com/Sangita-Dinda-21

## ⭐ If you like this project

Give this repository a ⭐ on GitHub!
