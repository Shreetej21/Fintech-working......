function go(page) {
  window.location.href = page;
}

function logout() {
  sessionStorage.clear();
  window.location.href = "index.html";
}

const user = sessionStorage.getItem("user");
if (!user && !location.pathname.endsWith("index.html")) {
  window.location.href = "index.html";
}

const userSpan = document.getElementById("user");
if (userSpan) userSpan.innerText = user;
