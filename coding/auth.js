const USERS_KEY = "heritagetrail_users";
const CURRENT_KEY = "heritagetrail_current_user";
function getUsers() {
return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
}
const registerForm = document.getElementById("registerForm");
if (registerForm) {
registerForm.addEventListener("submit", function (event) {
event.preventDefault();
const name = document.getElementById("fullname").value.trim();
const email = document.getElementById("regEmail").value.trim().toLowerCase();
const mobile = document.getElementById("mobile").value.trim();
const location = document.getElementById("location").value;
const category = document.getElementById("category").value;
const password = document.getElementById("regPassword").value;
const confirmPassword = document.getElementById("confirmPassword").value;
const message = document.getElementById("message");
if (password !== confirmPassword) {
message.textContent = "Passwords do not match.";
return;
}
const users = getUsers();
if (users.some(user => user.email === email)) {
message.textContent = "This email is already registered.";
return;
}
users.push({ name, email, mobile, location, category, password });
localStorage.setItem(USERS_KEY, JSON.stringify(users));
message.textContent = "Registration successful. You can now login.";
registerForm.reset();
});
}
const loginForm = document.getElementById("loginForm");
if (loginForm) {
loginForm.addEventListener("submit", function (event) {
event.preventDefault();
const email = document.getElementById("email").value.trim().toLowerCase();
const password = document.getElementById("password").value;
const user = getUsers().find(item =>
item.email === email && item.password === password
);
const message = document.getElementById("message");
if (user) {
localStorage.setItem(CURRENT_KEY, JSON.stringify(user));
window.location.href = "dashboard.html";
} else {
message.textContent = "Account not found or password is incorrect. Register first.";
}
});
}
const welcomeName = document.getElementById("welcomeName");
if (welcomeName) {
const params = new URLSearchParams(window.location.search);
if (params.get("guest") === "true") {
sessionStorage.setItem("heritagetrail_guest", "true");
welcomeName.textContent = "Welcome, Guest!";
} else {
const currentUser = JSON.parse(localStorage.getItem(CURRENT_KEY) || "null");
if (currentUser) {
welcomeName.textContent = "Welcome, " + currentUser.name + "!";
} else if (sessionStorage.getItem("heritagetrail_guest") === "true") {
welcomeName.textContent = "Welcome, Guest!";
} else {
window.location.href = "login.html";
}
}
}
const logoutLink = document.getElementById("logoutLink");
if (logoutLink) {
logoutLink.addEventListener("click", function (event) {
event.preventDefault();
localStorage.removeItem(CURRENT_KEY);
sessionStorage.removeItem("heritagetrail_guest");
window.location.href = "login.html";
});
}

