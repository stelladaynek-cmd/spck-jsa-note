const STORAGE_KEY = "luminous_db";

document.addEventListener("DOMContentLoaded", () => {
    const addBtn = document.getElementById("addBtn");
    const adminList = document.getElementById("admin-list");

    function renderAdmin() {
        if (!adminList) return;
        const products = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        adminList.innerHTML = products
            .map(
                (p, index) => `
            <div class="flex items-center gap-4 bg-black/50 p-3 rounded-xl border border-white/5 mb-3">
                <img src="${p.image}" class="w-12 h-12 object-cover rounded">
                <div class="flex-1 text-sm">
                    <p class="font-bold text-white">${p.name}</p>
                    <p class="text-cyan-400">${p.price}</p>
                </div>
                <button onclick="deleteProduct(${index})" class="text-red-500 text-[10px] border border-red-500/20 px-2 py-1 rounded">XÓA</button>
            </div>
        `,
            )
            .join("");
    }

    if (addBtn) {
        addBtn.onclick = () => {
            const name = document.getElementById("name").value.trim();
            const price = document.getElementById("price").value.trim();
            const image = document.getElementById("image").value.trim();
            const desc = document.getElementById("desc").value.trim();

            if (!name || !price || !image) return alert("Nhập đủ thông tin!");

            const products =
                JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
            products.unshift({ id: Date.now(), name, price, image, desc });
            localStorage.setItem(STORAGE_KEY, JSON.stringify(products));

            alert("Đã lưu vào kho hàng!");
            location.reload();
        };
    }

    window.deleteProduct = (index) => {
        let products = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        products.splice(index, 1);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
        renderAdmin();
    };

    renderAdmin();
});
