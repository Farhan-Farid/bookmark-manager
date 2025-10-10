document.getElementById("signupForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("fullname").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!name || !email || !password) {
    alert("Please fill in all fields!");
    return;
  }

  // Save user info to localStorage
  const user = { name, email, password };
  localStorage.setItem("userData", JSON.stringify(user));

  alert("✅ Account created successfully!");
  e.target.reset();
  setTimeout(() => {
      window.location.href = "../main.html";
    }, 2000);
});
