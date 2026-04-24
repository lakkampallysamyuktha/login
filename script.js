// ================= SIGNUP =================
function signup() {

  let name = document.getElementById("signupName").value.trim();
  let email = document.getElementById("signupEmail").value.trim();
  let password = document.getElementById("signupPassword").value.trim();
  let role = document.getElementById("signupRole").value;

  if (!name || !email || !password || !role) {
    alert("Fill all fields ❌");
    return;
  }

  let user = { name, email, password, role };

  localStorage.setItem("user_" + email, JSON.stringify(user));

  alert("Signup successful ✅");

  window.location.href = "login.html";
}


// ================= LOGIN =================
function login() {

  let email = document.getElementById("loginEmail").value.trim();
  let password = document.getElementById("loginPassword").value.trim();

  if (!email || !password) {
    alert("Fill all fields ❌");
    return;
  }

  let storedUser = localStorage.getItem("user_" + email);

  if (!storedUser) {
    alert("User not found ❌");
    return;
  }

  let user = JSON.parse(storedUser);

  if (user.password !== password) {
    alert("Wrong password ❌");
    return;
  }

  // ✅ SAVE CURRENT USER
  localStorage.setItem("currentUser", JSON.stringify(user));

  // ✅ ROLE ALERT
  alert(`Welcome ${user.name} 🎉\nRole: ${user.role}`);

  // ✅ REDIRECT
  if (user.role === "admin") {
    window.location.href = "admin.html";
  } else {
    window.location.href = "dashboard.html";
  }
}


// ================= SHOW USER NAME =================
window.onload = function () {

  let currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (currentUser) {
    let userText = document.getElementById("welcomeUser");
    let adminText = document.getElementById("welcomeAdmin");

    if (userText) {
      userText.innerText = "Welcome " + currentUser.name + " 🎉";
    }

    if (adminText) {
      adminText.innerText = "Welcome Admin " + currentUser.name + " 🔥";
    }
  }
};


// ================= LOGOUT =================
function logout() {
  localStorage.removeItem("currentUser");
  alert("Logged out successfully ✅");
  window.location.href = "index.html";
}

// ================= MENU TOGGLE (FINAL FIX) =================
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");

  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active"); // ✅ FIXED
  });
});

//About page
const elements = document.querySelectorAll(".about-container, .stat-box");

window.addEventListener("scroll", () => {
  elements.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      el.classList.add("show");
    }
  });
});
