const search = document.getElementById("search");

if (search) {
    search.addEventListener("input", () => {

        const keyword = search.value.toLowerCase().trim();

        document.querySelectorAll(".card").forEach(card => {

            const text = card.innerText.toLowerCase();

            if (text.includes(keyword)) {
                card.style.display = "";
            } else {
                card.style.display = "none";
            }

        });
    });
}
