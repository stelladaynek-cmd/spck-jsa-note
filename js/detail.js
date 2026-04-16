const STORAGE_KEY = "luminous_db";

document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const products = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    const item = products.find((p) => p.id == id);

    if (item) {
        document.getElementById("mainImg").src = item.image;
        document.getElementById("mainTitle").innerText = item.name;
        document.getElementById("mainPrice").innerText = item.price;
        document.getElementById("mainDesc").innerText =
            item.desc || "No additional metadata available.";
    } else {
        window.location.href = "index.html";
    }
});
