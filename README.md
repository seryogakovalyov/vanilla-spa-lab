# Users SPA — Vanilla JavaScript + PHP API + MariaDB

A fully handcrafted learning project featuring:
- Single-Page Application with **pure JavaScript**
- Modular ES-style structure
- Custom SPA router
- Form validation
- Searching, sorting and filtering
- Pagination
- Notifications (in progress)
- REST-like backend API in **PHP**
- **MariaDB** as persistent storage
- Local development router for PHP built-in server

The goal of the project is to recreate the fundamentals behind modern frameworks using only native JS and PHP features.

---

## 📂 Project Structure

project/
│
├── public/ # Frontend (SPA)
│ ├── index.html
│ ├── css/
│ │ └── styles.css
│ └── js/
│ ├── main.js
│ ├── actions
│ │ └── usersActions.js
│ ├── components
│ │ ├── EditUserForm.js
│ │ ├── Loader.js
│ │ ├── Pagination.js
│ │ ├── UserItem.js
│ │ ├── Notifications.js
│ │ └── UsersList.js
│ ├── core/
│ │ ├── router.js
│ │ ├── state.js
│ │ └── render.js
│ ├── pages/
│ │ ├── create.js
│ │ ├── edit.js
│ │ └── users.js
│ └── services
│   ├── api.js
│   ├── notifications.js
│   ├── validators.js
│   └── usersService.js
│
├── server/ # Backend API
│ ├── api/
│ │ ├── users.php
│ │ ├── create.php
│ │ ├── update.php
│ │ ├── delete.php
│ │ └── error.php
│ └── db.php
│
├── .env.example
├── database.sql # Database structure + demo data
├── dev-router.php # Router for PHP built-in server
└── .gitignore


---

## 🛠 Installation

### 1. Clone the repository
```bash
git clone https://github.com/seryogakovalyov/vanilla-spa-lab
cd vanilla-spa-lab

2. Import database

mysql -u root -p < database.sql

3. Create local .env

Copy .env.example → .env:

DB_HOST=127.0.0.1
DB_NAME=lab
DB_USER=youruser
DB_PASS=yourpass

Note: .env is ignored by Git for security.
🚀 Development Server (PHP Built-in)

We use a custom router (dev-router.php) for:

    routing /api/... to backend PHP

    serving static files (JS/CSS)

    serving SPA fallback (index.html)

✔ Correct command:

php -S localhost:8000 -t public dev-router.php

After launch:

    Frontend:
    http://localhost:8000

Backend API:
http://localhost:8000/api/users.php
🧱 Nginx Production Setup (Example)

server {
    listen 80;
    server_name example.com;

    root /var/www/project/public;
    index index.html;

    # Static assets
    location /css/ { try_files $uri =404; }
    location /js/  { try_files $uri =404; }

    # API (PHP backend)
    location /api/ {
        root /var/www/project/server;
        try_files $uri =404;

        include fastcgi_params;
        fastcgi_param SCRIPT_FILENAME /var/www/project/server$uri;
        fastcgi_pass unix:/run/php/php-fpm.sock;
    }

    # SPA fallback
    location / {
        try_files $uri /index.html;
    }
}

🔒 Security Notes

    .env is not committed to the repository

    Credentials must remain local

    SQL dump includes structure only

    API and frontend are physically separated

    Dev router works only in development, not production

✔ Future Improvements

Possible learning extensions:

    Notifications

    Authentication (sessions or JWT)

    Form components system

    Reusable UI elements

    API classes / controllers

    Database migrations

    Vite bundler + ES modules

    Docker environment

🧠  Why I built this

    To really understand how React works under the hood, I decided to recreate its core mechanisms from scratch:

    to understand the virtual DOM → I built a simple component renderer

    to understand routing → I implemented a hash-based router

    to understand global state → I created a centralized state object with full re-rendering

    to understand effects → I realized you can actually survive without them 😅

    In the end, React stopped feeling like “magic” and became a set of clear, understandable ideas.
