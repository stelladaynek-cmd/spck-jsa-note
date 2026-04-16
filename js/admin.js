const STORAGE_KEY = "luminous_db";

document.addEventListener("DOMContentLoaded", () => {
    const addBtn = document.getElementById("addBtn");
    const adminList = document.getElementById("admin-list");

    function renderAdmin() {
        if (!adminList) return;
        const products = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

        if (products.length === 0) {
            adminList.innerHTML = `<p class="text-gray-600 italic text-center py-10">Kho hàng đang trống</p>`;
            return;
        }

        adminList.innerHTML = products
            .map(
                (p, index) => `
            <div class="flex items-center gap-4 bg-black/50 p-4 rounded-2xl border border-white/5">
                <img src="${p.image}" class="w-12 h-12 object-cover rounded-lg" onerror="this.src='https://placehold.co/100x100?text=Lỗi'">
                <div class="flex-1">
                    <p class="font-bold text-sm text-white uppercase">${p.name}</p>
                    <p class="text-cyan-400 text-xs font-mono">${p.price}</p>
                </div>
                <button onclick="deleteProduct(${index})" class="text-red-500 hover:bg-red-500/10 px-3 py-1 rounded-lg text-[10px] font-bold border border-red-500/20 transition-all">XÓA</button>
            </div>
        `,
            )
            .join("");
    }

    if (addBtn) {
        addBtn.onclick = function () {
            const name = document.getElementById("name").value.trim();
            const price = document.getElementById("price").value.trim();
            const image = document.getElementById("image").value.trim();
            const desc = document.getElementById("desc").value.trim();

            if (!name || !price || !image) {
                alert("Bạn chưa nhập đủ thông tin kìa!");
                return;
            }

            const products =
                JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
            products.unshift({ id: Date.now(), name, price, image, desc });

            localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
            alert("✅ Đã lưu: " + name);

            // Xóa form
            document.getElementById("name").value = "";
            document.getElementById("price").value = "";
            document.getElementById("image").value = "";
            document.getElementById("desc").value = "";

            renderAdmin();
        };
    }

    window.deleteProduct = (index) => {
        if (confirm("Xóa món này nhé?")) {
            let products = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
            products.splice(index, 1);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
            renderAdmin();
        }
    };

    renderAdmin();
});
