// archive.js

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("card-container");
  const showcasingnow = document.getElementById("showcasing");
  showcasingnow.textContent = "Archived Bookmarks";

  // Load from localStorage first
  let stored = JSON.parse(localStorage.getItem("bookmarks")); // ✅ FIXED KEY NAME

  if (stored && Array.isArray(stored)) {
    const archived = stored.filter(item => item.isArchived);
    renderArchived(archived);
  } else {
    // Fallback: load directly from JSON if localStorage doesn’t exist yet
    fetch("../starter-code/data.json")
      .then(res => res.json())
      .then(data => {
        const archived = data.bookmarks.filter(item => item.isArchived);
        renderArchived(archived);
      })
      .catch(err => {
        console.error("Failed to load archive data:", err);
        container.innerHTML = `<p class="text-gray-500">Couldn't load archived bookmarks.</p>`;
      });
  }

  function renderArchived(items) {
    container.innerHTML = "";

    if (items.length === 0) {
      container.innerHTML = `<p class="text-gray-500">No archived bookmarks.</p>`;
      return;
    }

    items.forEach(item => {
      const card = document.createElement("div");
      card.className =
        "bg-white dark:bg-baseGreen-800 rounded-2xl p-4 shadow hover:shadow-lg transition";

      card.innerHTML = `
        <div class="head flex gap-3 pb-5">
          <img
            src="${item.favicon}"
            class="size-10 rounded-xl mt-1 outline-1 outline-teal-800"
            alt=""
          />
          <div>
            <p class="text-lg font-semibold">${item.title}</p>
            <p style="font-size: 10px" class="text-gray-500">${item.url}</p>
          </div>
        </div>

        <hr class="text-gray-500" />

        <div class="body p-3 text-gray-400 min-h-33" style="font-size: 12px">
          <p>${item.description}</p>
          <div class="tagscont flex gap-2 pt-2 items-end">
            ${item.tags
              .map(
                tag =>
                  `<div class="bg-neutrallight-300 p-1 rounded dark:bg-baseGreen-600">${tag}</div>`
              )
              .join("")}
          </div>
        </div>

        <hr class="text-gray-500" />

        <div class="foot flex justify-between items-baseline">
          <div style="font-size: small" class="flex text-gray-400 gap-3">
            <div>
              <i class="fa-regular fa-eye text-gray-400 pr-2"></i>${
                item.visitCount
              }
            </div>
            <div>
              <i class="fa-regular fa-clock text-gray-400 pr-2"></i>${new Date(
                item.lastVisited
              ).toLocaleDateString()}
            </div>
          </div>
          <button data-id="${
            item.id
          }" class="unarchive-btn text-sm text-gray-500 hover:text-baseGreen-500">Unarchive</button>
        </div>
      `;

      container.appendChild(card);
    });

    // ✅ attach event listeners *after* cards are rendered
    document.querySelectorAll(".unarchive-btn").forEach(btn => {
      btn.addEventListener("click", e => {
        const id = e.target.dataset.id;
        unarchiveItem(id);
      });
    });
  }

  function unarchiveItem(id) {
    let stored = JSON.parse(localStorage.getItem("bookmarks"));
    if (!stored) return;

    const item = stored.find(b => b.id === id);
    if (item) {
      item.isArchived = false;
      localStorage.setItem("bookmarks", JSON.stringify(stored));
      renderArchived(stored.filter(b => b.isArchived));
    }
  }
});
