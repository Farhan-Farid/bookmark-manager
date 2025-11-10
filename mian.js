const nameshow = document.getElementById("nameparam");
const mailshow = document.getElementById("mailparam");

mailshow.innerHTML = JSON.parse(localStorage.getItem("userData")).email;
nameshow.innerHTML = JSON.parse(localStorage.getItem("userData")).name;

const profileimg = document.getElementById("profimg");

profileimg.addEventListener("click", () => {
  // Toggle the Tailwind ring or border class
  profileimg.classList.toggle("ring-2");
  profileimg.classList.toggle("ring-baseGreen-400");
  profileimg.classList.toggle("ring-offset-2");
});

const btn = document.getElementById("dropdownButton");
const menu = document.getElementById("dropdownMenu");

btn.addEventListener("click", () => {
  menu.classList.toggle("hidden");
});

// Optional: Close menu when clicking outside
document.addEventListener("click", (e) => {
  if (!btn.contains(e.target) && !menu.contains(e.target)) {
    menu.classList.add("hidden");
  }
});

let bookmarks = [];

fetch("./starter-code/data.json")
  .then((res) => res.json())
  .then((data) => {
    bookmarks = data.bookmarks;
    const activeBookmarks = bookmarks.filter((item) => !item.isArchived);

    // Sort and render only active ones
    activeBookmarks.sort((a, b) => b.pinned - a.pinned);
    renderCards(activeBookmarks);
  });

function renderCards(items) {
  const container = document.getElementById("card-container");
  container.innerHTML = "";
  items.forEach((item) => {
    const card = document.createElement("div");
    card.className =
      "bg-white rounded-2xl p-4 shadow hover:shadow-lg transition dark:bg-baseGreen-800";

    card.innerHTML = `
        <div class="head flex gap-3 pb-5">
                <img
                  src="${item.favicon}"
                  class="size-10 rounded-xl mt-1 outline-1 outline-teal-800"
                  alt=""
                />
                <div>
                  <p class="text-lg font-semibold">
                  ${item.title}</p>
                  <p style="font-size: 10px" class="text-gray-500">
                    ${item.url}
                  </p>
                </div>




                <div class="relative inline-block text-left">
  <button
    
    class="menbtn px-2 py-1 border border-gray-400 rounded hover:bg-gray-100"
  >
    ⋮
  </button>

  <div
   
    class="drpmen absolute right-0 mt-2 w-32 bg-white border hidden border-gray-200 rounded shadow-lg  z-50"
  >
    <ul class="py-1 text-sm text-gray-700">
      <li><a href="#" class="block px-4 py-2 hover:bg-gray-100">Edit</a></li>
      <li><a href="#" class="block px-4 py-2 hover:bg-gray-100">Delete</a></li>
      <li><button data-id="${item.id}" class="archive-btn block px-4 py-2 hover:bg-gray-100" onclick="archiveBookmark()">Archive</button></li>
    </ul>
  </div>
</div>
                       
        </div>

        

              <hr class="text-gray-500" />
              <div class="body p-3 text-gray-400 min-h-33" style="font-size: 12px">
                <p>
                  ${item.description}
                </p>
                <div class="tagscont flex gap-2 pt-2 items-end">
                  <div class="bg-neutrallight-300 p-1 rounded dark:bg-baseGreen-600">${item.tags[0]}</div>
                  <div class="bg-neutrallight-300 p-1 rounded dark:bg-baseGreen-600">${item.tags[1]}</div>
                  <div class="bg-neutrallight-300 p-1 rounded dark:bg-baseGreen-600">${item.tags[2]}</div>
                </div>
              </div>
              <hr class="text-gray-500"/>
              <div class="foot flex justify-between items-baseline">
                <div style="font-size: small" class="flex text-gray-400 gap-3">
                  <div>
                    <i class="fa-regular fa-eye text-gray-400 pr-2"></i>47
                  </div>
                  <div>
                    <i class="fa-regular fa-clock text-gray-400 pr-2"></i>23 sep
                  </div>
                  <div>
                    <i class="fa-regular fa-calendar-xmark pr-2"></i>15 Jan
                  </div>
                </div>
                <button class=" " onclick="pinBookmark('${item.id}')">
                  <i
                    class="fa-solid fa-thumbtack text-gray-400 hover:cursor-pointer"
                  ></i>
                </button>
              </div>
        `;

    container.appendChild(card);
  });
}
function pinBookmark(bookmarkId) {
  const bookmark = bookmarks.find((b) => b.id === bookmarkId);
  if (!bookmark) return;
  bookmark.pinned = !bookmark.pinned; // toggle pin
  bookmarks.sort((a, b) => b.pinned - a.pinned);
  renderCards(bookmarks);
}
const searchInput = document.getElementById("searchInput");
const showcasingnow = document.getElementById("showcasing");
showcasingnow.innerHTML = "All bookmarks";

searchInput.addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase();

  if (query.trim() === "") {
    showcasingnow.innerHTML = "All bookmarks";
    renderCards(bookmarks); // show all again
    return; // stop here
  }

  showcasingnow.innerHTML = `Results for "${query}"`;

  const filtered = bookmarks.filter((item) =>
    item.title.toLowerCase().includes(query)
  );

  renderCards(filtered);
});

const lightBtn = document.getElementById("lightBtn");
const darkBtn = document.getElementById("darkBtn");
const html = document.documentElement;

// Load theme from localStorage
if (localStorage.theme === "dark") {
  html.classList.add("dark");
  toggleDark(true);
} else {
  toggleDark(false);
}

function toggleDark(isDark) {
  if (isDark) {
    lightBtn.classList.remove("bg-gray-400", "text-black");
    darkBtn.classList.add("bg-white", "text-black");
  } else {
    darkBtn.classList.remove("bg-white", "text-black");
    lightBtn.classList.add("bg-gray-400", "text-black");
  }
}

lightBtn.addEventListener("click", () => {
  html.classList.remove("dark");
  localStorage.theme = "light";
  toggleDark(false);
});

darkBtn.addEventListener("click", () => {
  html.classList.add("dark");
  localStorage.theme = "dark";
  toggleDark(true);
});

document.addEventListener("DOMContentLoaded", () => {
  // Use event delegation: listen for clicks on any .menbtn
  document.addEventListener("click", (e) => {
    // if a .menbtn was clicked, toggle its sibling .drpmen
    const btn = e.target.closest(".menbtn");
    if (btn) {
      e.stopPropagation();
      const wrapper = btn.closest(".inline-block") || btn.parentElement;
      const menu = wrapper.querySelector(".drpmen");
      if (!menu) return;
      // close other open menus first (optional)
      document.querySelectorAll(".drpmen").forEach((m) => {
        if (m !== menu) m.classList.add("hidden");
      });

      menu.classList.toggle("hidden");
      return;
    }

    // If clicked outside any menu/button, close all
    if (!e.target.closest(".drpmen")) {
      document
        .querySelectorAll(".drpmen")
        .forEach((m) => m.classList.add("hidden"));
    }
  });

  // close on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      document
        .querySelectorAll(".drpmen")
        .forEach((m) => m.classList.add("hidden"));
    }
  });
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("archive-btn")) {
    const id = e.target.dataset.id; // get id from data-id
    archiveBookmark(id);
  }
});

function archiveBookmark(bookmarkId) {
  const item = bookmarks.find((b) => b.id === bookmarkId);
  if (!item) return;

  item.isArchived = true; // or toggle with: !item.isArchived

  // Save updated data to localStorage if needed
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

  // Re-render only unarchived bookmarks
  const activeBookmarks = bookmarks.filter((b) => !b.isArchived);
  renderCards(activeBookmarks);
}
