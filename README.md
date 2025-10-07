Login & Registration Form (HTML/CSS/JavaScript)

Proiect demonstrativ care arată cum se creează un formular de autentificare și înregistrare folosind HTML, CSS și JavaScript (fără backend).

Ce conține proiectul:
- `index.html` – pagină principală cu formularul de autentificare și înregistrare
- `css/style.css` – stiluri responsive și moderne
- `js/main.js` – logica client-side: validare, stocare utilizatori în `localStorage`, autentificare

Caracteristici:
- Trecere între tab-urile Autentificare / Înregistrare
- Validări simple (email, lungime parolă, potrivire parole)
- Persistență locală a conturilor în `localStorage` (doar pentru demo; parolele sunt stocate în clar)
- Mesaje de succes/eroare pentru utilizator

Cum rulezi:
1. Deschide `index.html` direct în browser (double-click) — funcționează pentru demo-uri simple.

sau (recomandat) rulează un server local (PowerShell):

```powershell
# pornește un server simplu în folderul proiectului (dacă ai Python instalat)
python -m http.server 8000
# apoi accesează http://localhost:8000 în browser
```

Note de securitate:
- Acesta este un demo client-side. Nu folosi această abordare în producție.
- În aplicații reale, parolele trebuie gestionate pe server, criptate (hash + salt), cu transport securizat (HTTPS) și protecție împotriva atacurilor.

Îmbunătățiri posibile:
- Legare la un backend real (API) și autentificare bazată pe token (JWT)
- Hashing sigur al parolelor pe server (bcrypt, Argon2)
- Validări suplimentare, recuperare parolă, confirmare email

Dacă vrei, pot să adaug:
- o versiune cu un backend Node/Express minimal pentru persistență
- integrări de UI (framework CSS) sau teste automate
