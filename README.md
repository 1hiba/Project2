# AI Tutor Web App (Gemini-Powered)

## Project Overview

This is a full-stack AI Tutor web application built using HTML, CSS, JavaScript, Node.js, Express, MongoDB, and Google Gemini API.

The app allows users to:
- Sign up and log in securely
- Ask questions to an AI tutor
- Receive real-time AI-generated responses using Google Gemini
- Store user data in a MongoDB database

---

## Features

### Authentication
- User registration (sign up)
- User login system
- Secure password storage with MongoDB integration

### AI Tutor Chat
- Real-time AI responses using Google Gemini API
- Chat-style interface with user and AI messages
- Typing indicator while AI generates responses

### Database
- MongoDB used for storing user accounts
- Data persistence for authentication system

### Frontend
- Clean and modern UI design
- Responsive chat interface
- Chat bubble layout for better readability
- Sticky footer layout

---

## Tech Stack

### Frontend
- HTML5
- CSS3
- JavaScript (Vanilla JS)

### Backend
- Node.js
- Express.js

### Database
- MongoDB (Mongoose)

### AI API
- Google Gemini API (gemini-2.5-flash)

---

## API Used

This project uses Google’s Gemini API to generate AI responses.

- Endpoint: Generative Language API
- Model: gemini-2.5-flash
- Purpose: AI tutoring responses

---

## Database Schema

### User Model

```js
{
  username: String,
  email: String,
  password: String
}