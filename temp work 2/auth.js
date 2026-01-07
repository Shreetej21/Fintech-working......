function login() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    alert("Please enter email and password");
    return;
  }

  // Fake auth (frontend only)
  sessionStorage.setItem("user", email.split("@")[0]);

  window.location.href = "dashboard.html";
}

function togglePassword() {
  const p = document.getElementById("password");
  p.type = p.type === "password" ? "text" : "password";
}
