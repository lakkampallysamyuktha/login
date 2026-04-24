// ================= SIGNUP =================
function signup() {

  let name = document.getElementById("signupName").value.trim();
  let email = document.getElementById("signupEmail").value.trim();
  let password = document.getElementById("signupPassword").value.trim();
  let role = document.getElementById("signupRole").value.trim();

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

  let email = document.getElementById("loginEmail").value;
  let password = document.getElementById("loginPassword").value;
  let role = document.getElementById("loginRole").value;

  // VALIDATION
  if (email === "" || password === "" || role === "") {
    alert("Please fill all fields!");
    return;
  }

  // GET USER FROM STORAGE
  let storedUser = localStorage.getItem("user_" + email);

  if (!storedUser) {
    alert("User not found ❌");
    return;
  }

  let user = JSON.parse(storedUser);

  // CHECK PASSWORD
  if (user.password !== password) {
    alert("Wrong password ❌");
    return;
  }

  // CHECK ROLE
  if (user.role !== role) {
    alert("Wrong role ❌");
    return;
  }

  // SAVE SESSION
  localStorage.setItem("currentUser", JSON.stringify(user));

  // SUCCESS
  alert(`Welcome ${user.name} 🎉\nRole: ${user.role}`);

  // REDIRECT BASED ON ROLE
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

const items = document.querySelectorAll(".reveal");

window.addEventListener("scroll", () => {
  items.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 80) {
      el.classList.add("show");
    }
  });
});
// Services Page
// ===== FAQ TOGGLE =====
function toggleFAQ(el) {
  const content = el.nextElementSibling;

  // close all other FAQs
  document.querySelectorAll(".faq-item p").forEach(p => {
    if (p !== content) p.style.display = "none";
  });

  // toggle clicked one
  content.style.display = content.style.display === "block" ? "none" : "block";
}


// Dashborad
// ===== PROTECT PAGE =====
(function () {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  if (!user && window.location.pathname.includes("dashboard")) {
    window.location.href = "login.html";
  }
})();


// ===== LOAD USER DATA =====
window.onload = function () {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  if (user) {
    const nameEl = document.getElementById("userName");
    const roleEl = document.getElementById("userRole");

    if (nameEl) nameEl.innerText = user.name;
    if (roleEl) roleEl.innerText = user.role;
  }
};


// ===== LOGOUT =====
function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
}


// ===== SIDEBAR ACTIVE LINK (OPTIONAL PRO) =====
document.querySelectorAll(".sidebar a").forEach(link => {
  link.addEventListener("click", function () {
    document.querySelectorAll(".sidebar a").forEach(l => l.classList.remove("active"));
    this.classList.add("active");
  });
});
