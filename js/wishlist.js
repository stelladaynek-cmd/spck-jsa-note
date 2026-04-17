const CART_KEY = "cart";

document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("wishlist-container");
    const cartData = JSON.parse(localStorage.getItem(CART_KEY)) || [];

    if (!container) return;

    if (cartData.length === 0) {
        container.innerHTML = `
            <div class="col-span-full text-center py-20 text-gray-500 uppercase tracking-widest italic">
                Wishlist is empty.
            </div>`;
        return;
    }

    container.innerHTML = cartData
        .map(
            (item) => `
        <div class="bg-[#1c1c1c] border border-[#3b494c]/20 rounded-lg overflow-hidden p-6 hover:border-cyan-400/50 transition-all group">
            <img src="${item.image}" class="w-full h-48 object-cover rounded-md mb-4 grayscale group-hover:grayscale-0 transition-all duration-500" onerror="this.src='https://placehold.co/300x200'">
            <h3 class="text-xl font-bold text-white uppercase italic tracking-tighter">${item.name}</h3>
            <p class="text-cyan-400 font-mono mb-4 text-lg">${item.price}</p>
            <div class="flex gap-2">
                <button onclick="buyFromWishlist('${item.id}')" class="flex-1 bg-cyan-400 text-black py-3 rounded-lg font-black text-[10px] uppercase hover:bg-white transition-all">
                    BUY NOW
                </button>
                <button onclick="removeItem('${item.id}')" class="px-4 border border-red-500/20 text-red-500 py-3 rounded-lg text-[10px] font-bold hover:bg-red-500 hover:text-white transition-all">
                    REMOVE
                </button>
            </div>
        </div>
    `,
        )
        .join("");
});

// Hàm xử lý chuyển vùng dữ liệu sang trang Checkout
function buyFromWishlist(id) {
    const cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];
    // Tìm sản phẩm bằng ID (ép kiểu String để tránh lỗi so sánh)
    const item = cart.find((p) => String(p.id) === String(id));

    if (item) {
        // 1. Lưu sản phẩm vào 'pendingOrder' - Đây là key mà checkout.js của bạn đang dùng
        localStorage.setItem("pendingOrder", JSON.stringify(item));

        // 2. Chuyển hướng sang trang checkout.html
        window.location.href = "checkout.html";
    } else {
        alert("Product not found!");
    }
}

// Hàm xóa sản phẩm khỏi Wishlist
function removeItem(id) {
    let cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];
    cart = cart.filter((item) => String(item.id) !== String(id));
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    location.reload();
}
