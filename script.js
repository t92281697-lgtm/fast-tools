// =========================
// 検索機能
// =========================

const search = document.getElementById("search");

if (search) {

    search.addEventListener("input", () => {

        const keyword = search.value.toLowerCase();

        document.querySelectorAll(".card").forEach(card => {

            const text = card.innerText.toLowerCase();

            card.style.display = text.includes(keyword)
                ? "block"
                : "none";

        });

    });

}

// =========================
// ダークモード
// =========================

const themeBtn = document.getElementById("theme-toggle");

if (themeBtn) {

    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark");
        themeBtn.textContent = "☀️";
    }

    themeBtn.addEventListener("click", () => {

        document.body.classList.toggle("dark");

        if (document.body.classList.contains("dark")) {
            localStorage.setItem("theme", "dark");
            themeBtn.textContent = "☀️";
        } else {
            localStorage.setItem("theme", "light");
            themeBtn.textContent = "🌙";
        }

    });

}