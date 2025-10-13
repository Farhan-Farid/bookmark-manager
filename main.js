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

fetch("./starter-code/data.json")
  .then((res) => res.json())
  .then((data) => {
    const container = document.getElementById("card-container");
    const bookmarks = data.bookmarks; // access the bookmarks array
    function pinBookmark(bookmarkId) {
      // Find the bookmark by id
      const bookmark = bookmarks.find((b) => b.id === bookmarkId);
      if (!bookmark) return;

      // Update pinned state
      bookmark.pinned = true;

      // Re-sort bookmarks so pinned items are first
      bookmarks.sort((a, b) => b.pinned - a.pinned); // pinned=true first

      // Re-render cards
      renderCards();
    }

    

      bookmarks.forEach((item) => {
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
                  <p class="text-xl font-bold">
                  ${item.title}</p>
                  <p style="font-size: smaller" class="text-gray-500">
                    ${item.url}
                  </p>
                </div>
                <button
                  class="justify-self-end place-self-end size-7 border border-gray-400 rounded mb-4 ml-2"
                >
                  ⋮
                </button>
              </div>
              <hr class="text-gray-500" />
              <div class="body p-3 text-gray-500 min-h-33" style="font-size: 12px">
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
  )
  .catch((err) => console.error("Error loading JSON:", err));
