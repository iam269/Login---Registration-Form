// Gestionează înregistrarea și autentificarea locală (folosește localStorage)
const $ = sel => document.querySelector(sel);

// Elemente
const loginSection = $('#login-section');
const registerSection = $('#register-section');
const showLoginBtn = $('#show-login');
const showRegisterBtn = $('#show-register');

const loginForm = $('#login-form');
const registerForm = $('#register-form');
const loginMessage = $('#login-message');
const registerMessage = $('#register-message');

// Toggle între tab-uri
showLoginBtn.addEventListener('click', ()=>{
  showLogin();
});
showRegisterBtn.addEventListener('click', ()=>{
  showRegister();
});
function showLogin(){
  showLoginBtn.classList.add('active');
  showRegisterBtn.classList.remove('active');
  loginSection.classList.remove('hidden');
  registerSection.classList.add('hidden');
  clearMessages();
}
function showRegister(){
  showRegisterBtn.classList.add('active');
  showLoginBtn.classList.remove('active');
  registerSection.classList.remove('hidden');
  loginSection.classList.add('hidden');
  clearMessages();
}

// Utilitare pentru localStorage
function getUsers(){
  try{
    const raw = localStorage.getItem('users');
    return raw ? JSON.parse(raw) : [];
  }catch(e){
    console.error('Eroare citire users:', e);
    return [];
  }
}
function saveUsers(users){
  localStorage.setItem('users', JSON.stringify(users));
}
function findUserByEmail(email){
  return getUsers().find(u => u.email.toLowerCase() === email.toLowerCase());
}

function clearMessages(){
  loginMessage.textContent = '';
  registerMessage.textContent = '';
  loginMessage.className = 'message';
  registerMessage.className = 'message';
}

// Validări simple
function isValidEmail(email){
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Înregistrare
registerForm.addEventListener('submit', (e)=>{
  e.preventDefault();
  const name = registerForm['name'].value.trim();
  const email = registerForm['email'].value.trim();
  const password = registerForm['password'].value;
  const password2 = registerForm['password2'].value;

  if(!name){ showRegisterError('Completați numele.'); return; }
  if(!isValidEmail(email)){ showRegisterError('Email invalid.'); return; }
  if(password.length < 6){ showRegisterError('Parola trebuie să aibă cel puțin 6 caractere.'); return; }
  if(password !== password2){ showRegisterError('Parolele nu se potrivesc.'); return; }
  if(findUserByEmail(email)){ showRegisterError('Există deja un cont cu acest email.'); return; }

  const users = getUsers();
  users.push({ name, email, password }); // NOTA: stocăm parola în clar doar pentru demo local
  saveUsers(users);
  showRegisterSuccess('Înregistrare reușită. Puteți să vă autentificați.');
  registerForm.reset();
  showLogin();
});

function showRegisterError(msg){
  registerMessage.textContent = msg;
  registerMessage.classList.add('error');
}
function showRegisterSuccess(msg){
  registerMessage.textContent = msg;
  registerMessage.classList.add('success');
}

// Autentificare
loginForm.addEventListener('submit', (e)=>{
  e.preventDefault();
  const email = loginForm['email'].value.trim();
  const password = loginForm['password'].value;

  if(!isValidEmail(email)){ showLoginError('Email invalid.'); return; }
  if(password.length < 6){ showLoginError('Parolă invalidă.'); return; }

  const user = findUserByEmail(email);
  if(!user || user.password !== password){
    showLoginError('Email sau parola incorectă.');
    return;
  }

  showLoginSuccess(`Bine ai venit, ${user.name}!`);
  loginForm.reset();
});

function showLoginError(msg){
  loginMessage.textContent = msg;
  loginMessage.classList.add('error');
}
function showLoginSuccess(msg){
  loginMessage.textContent = msg;
  loginMessage.classList.add('success');
}

// autofocus pe câmpul din tabul curent la load
ndocument.addEventListener('DOMContentLoaded', ()=>{
  // initialize example users if none exist (optional)
  if(getUsers().length === 0){
    // preset demo user (email: demo@example.com, pass: password)
    // Comentati linia urmatoare dacă nu doriți user demo
    // saveUsers([{name:'Demo User', email:'demo@example.com', password:'password'}]);
  }
  $('#login-email').focus();
});