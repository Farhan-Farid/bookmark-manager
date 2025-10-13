const nameshow = document.getElementById('nameparam');
const mailshow = document.getElementById('mailparam');

mailshow.innerHTML = JSON.parse(localStorage.getItem("userData")).email;
nameshow.innerHTML = JSON.parse(localStorage.getItem("userData")).name;

const profileimg = document.getElementById('profimg');

    profileimg.addEventListener('click', () => {
      // Toggle the Tailwind ring or border class
      profileimg.classList.toggle('ring-2');
      profileimg.classList.toggle('ring-baseGreen-400');
      profileimg.classList.toggle('ring-offset-2');
    });




const btn = document.getElementById('dropdownButton');
    const menu = document.getElementById('dropdownMenu');

    btn.addEventListener('click', () => {
      menu.classList.toggle('hidden');
    });

    // Optional: Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!btn.contains(e.target) && !menu.contains(e.target)) {
        menu.classList.add('hidden');
      }
    });