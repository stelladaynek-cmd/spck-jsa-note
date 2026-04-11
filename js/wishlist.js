document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("wishlist-container");

    // 1. Lấy dữ liệu từ localStorage (tên phải khớp với tên bạn đặt lúc lưu)
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // 2. Nếu không có sản phẩm nào
    if (cart.length === 0) {
        container.innerHTML = `
            <div class="col-span-full text-center py-20">
                <p class="text-[#b0c9e8] uppercase tracking-widest">Wishlist is empty</p>
                <a href="index.html" class="text-[#00e5ff] underline mt-4 block">Go back to shop</a>
            </div>
        `;
        return;
    }

    // 3. Nếu có sản phẩm, dùng map() để hiện ra
    container.innerHTML = cart
        .map(
            (item) => `
        <div class="bg-[#1c1c1c] border border-[#3b494c]/20 rounded-lg overflow-hidden p-6">
            <img src="${item.image}" class="w-full h-48 object-cover rounded-md mb-4">
            <h3 class="text-xl font-bold text-white uppercase">${item.name}</h3>
            <p class="text-[#00e5ff] font-bold mb-4">${item.price}</p>
            
            <div class="flex gap-2">
                <button onclick="removeItem('${item.id}')" class="flex-1 bg-red-500/10 border border-red-500/50 text-red-500 py-2 rounded font-bold text-xs hover:bg-red-500 hover:text-white transition-all">
                    REMOVE
                </button>
            </div>
        </div>
    `,
        )
        .join("");
});

// Hàm để xóa sản phẩm khỏi Wishlist
function removeItem(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter((item) => item.id != id); // Lọc bỏ sản phẩm có id này
    localStorage.setItem("cart", JSON.stringify(cart)); // Lưu lại
    location.reload(); // Load lại trang để cập nhật giao diện
}
