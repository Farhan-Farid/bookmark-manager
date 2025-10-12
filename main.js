let nameshow = document.getElementById






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