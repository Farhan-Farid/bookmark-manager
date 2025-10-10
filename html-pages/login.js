const usernameInput = document.getElementById("email");
const passwordInput = document.getElementById("password");


function returnData() {
  const usrInpt = usernameInput.value.trim();
  const passInpt = passwordInput.value.trim();

  const storedData = JSON.parse(localStorage.getItem("userData"));
  if (!storedData) {
    alert('no data found');
    return;
  }

  if (usrInpt == storedData.email && passInpt == storedData.password) {
    alert('signed in successfully');
    setTimeout(() => {
      window.location.href = "../main.html";
    }, 2000);
  } else {
    alert('invalid')
  }
}

