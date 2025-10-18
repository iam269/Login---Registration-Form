// Manages local registration and authentication (uses localStorage)
const $ = sel => document.querySelector(sel);

// Elements
const loginSection = $('#login-section');
const registerSection = $('#register-section');
const showLoginBtn = $('#show-login');
const showRegisterBtn = $('#show-register');

const loginForm = $('#login-form');
const registerForm = $('#register-form');
const loginMessage = $('#login-message');
const registerMessage = $('#register-message');

// Toggle between tabs
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

// Utilities for localStorage
function getUsers(){
  try{
    const raw = localStorage.getItem('users');
    return raw ? JSON.parse(raw) : [];
  }catch(e){
    console.error('Error reading users:', e);
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

// Simple validations
function isValidEmail(email){
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Registration
registerForm.addEventListener('submit', (e)=>{
  e.preventDefault();
  const name = registerForm['name'].value.trim();
  const email = registerForm['email'].value.trim();
  const password = registerForm['password'].value;
  const password2 = registerForm['password2'].value;

  if(!name){ showRegisterError('Please enter your name.'); return; }
  if(!isValidEmail(email)){ showRegisterError('Invalid email.'); return; }
  if(password.length < 6){ showRegisterError('Password must be at least 6 characters.'); return; }
  if(password !== password2){ showRegisterError('Passwords do not match.'); return; }
  if(findUserByEmail(email)){ showRegisterError('An account with this email already exists.'); return; }

  const users = getUsers();
  users.push({ name, email, password }); // NOTE: storing password in plain text only for local demo
  saveUsers(users);
  showRegisterSuccess('Registration successful. You can now log in.');
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

// Authentication
loginForm.addEventListener('submit', (e)=>{
  e.preventDefault();
  const email = loginForm['email'].value.trim();
  const password = loginForm['password'].value;

  if(!isValidEmail(email)){ showLoginError('Invalid email.'); return; }
  if(password.length < 6){ showLoginError('Invalid password.'); return; }

  const user = findUserByEmail(email);
  if(!user || user.password !== password){
    showLoginError('Incorrect email or password.');
    return;
  }

  showLoginSuccess(`Welcome, ${user.name}!`);
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

// autofocus on the field in the current tab on load
ndocument.addEventListener('DOMContentLoaded', ()=>{
  // initialize example users if none exist (optional)
  if(getUsers().length === 0){
    // preset demo user (email: demo@example.com, pass: password)
    // Comment out the following line if you don't want demo user
    // saveUsers([{name:'Demo User', email:'demo@example.com', password:'password'}]);
  }
  $('#login-email').focus();
});