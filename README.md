# 📦 Inventory Management System

A simple full-stack inventory system built using **React + CSS (Frontend)** and **PHP + PostgreSQL (Backend)**. This project allows users to add, edit, delete, and search for products.

---

## 🔗 Live Demo

* **Frontend:** [https://ara-11.github.io/inventory-ui/](https://ara-11.github.io/inventory-ui/)
* **Backend API:** [https://inventory-api-ulj3.onrender.com](https://inventory-api-ulj3.onrender.com)

---

## 💠 Tech Stack

### Frontend

* [React](https://reactjs.org/)
* Plain CSS
* [Vite](https://vitejs.dev/)

### Backend

* [PHP](https://www.php.net/)
* [PostgreSQL (Render)](https://render.com/docs/databases#postgresql)
* [Docker (for backend container)](https://www.docker.com/)

---

## 📁 Features

* 📋 **CRUD**: Add, edit, delete, and list products
* 🔍 **Search**: Real-time filtering by product name
* ⚙️ Clean UI using standard CSS
* 🌐 Deployed frontend via GitHub Pages
* 🛡️ CORS-compliant backend API hosted on Render

---

## ✨ Getting Started (Development)

### Prerequisites

* Node.js & npm
* Docker (for backend)

---

### Frontend

```bash
# Clone repo
git clone https://github.com/ara-11/inventory-ui.git
cd inventory-ui

# Install dependencies
npm install

# Run development server
npm run dev
```

---

### Backend (using Docker)

```bash
# From your backend directory (where Dockerfile is)
docker build -t inventory-backend .
docker run -p 8080:80 inventory-backend
```

Make sure your `.php` files connect to your **Render PostgreSQL database** and have proper CORS headers set.

---

## 📸 Screenshots

| Add Product                             | Filter/Search                              | Edit/Delete                              |
| --------------------------------------- | ------------------------------------------ | ---------------------------------------- |
| ![add](https://imgur.com/a/vt0jS9y.png) | ![search](https://imgur.com/a/vt0jS9y.png) | ![edit](https://imgur.com/a/vt0jS9y.png) |

---

## 🧠 Learnings

* Learned full-stack development basics using React and PHP
* Connected frontend and backend through REST APIs
* Deployed production-grade apps using GitHub Pages and Render
* Handled CORS, preflight requests, and database integration (PostgreSQL)

---

## 📢 Contact

**Ara D.** — *Tambay for now*
[LinkedIn](www.linkedin.com/in/ara-mae-duco) • [GitHub](https://github.com/ara-11)

---

## 📄 License

MIT License.
