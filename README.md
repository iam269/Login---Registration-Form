# Login & Registration Form (HTML/CSS/JavaScript)

A demo project demonstrating how to build a responsive login and registration form using pure HTML, CSS, and JavaScript without any backend dependencies. This project showcases client-side authentication with local storage, featuring modern UI design and smooth animations.

**Live Demo:** [https://itsiamdev.github.io/Login---Registration-Form/](https://itsiamdev.github.io/Login---Registration-Form/)

What the project contains:
- `index.html` – main page with login and registration form
- `css/style.css` – responsive and modern styles
- `js/main.js` – client-side logic: validation, user storage in `localStorage`, authentication

Features:
- Switching between Login / Registration tabs
- Simple validations (email, password length, password matching)
- Local persistence of accounts in `localStorage` (demo only; passwords stored in plain text)
- Success/error messages for the user

How to run:
1. Open `index.html` directly in the browser (double-click) — works for simple demos.

or (recommended) run a local server (PowerShell):

```powershell
# start a simple server in the project folder (if you have Python installed)
python -m http.server 8000
# then access http://localhost:8000 in the browser
```

Security notes:
- This is a client-side demo. Do not use this approach in production.
- In real applications, passwords must be handled on the server, encrypted (hash + salt), with secure transport (HTTPS) and protection against attacks.

Possible improvements:
- Connection to a real backend (API) and token-based authentication (JWT)
- Secure password hashing on server (bcrypt, Argon2)
- Additional validations, password recovery, email confirmation

If you want, I can add:
- a version with a minimal Node/Express backend for persistence
- UI integrations (CSS framework) or automated tests
