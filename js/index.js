const STORAGE_KEY = "luminous_db";
const CART_KEY = "cart"; // Thống nhất dùng tên 'cart' để wishlist.js đọc được

document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("product-container");
    const products = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    if (!container) return;

    if (products.length === 0) {
        container.innerHTML = `<div class="col-span-full text-center py-20 text-white opacity-50 uppercase tracking-widest">Kho hàng đang trống</div>`;
        return;
    }

    // RENDER SẢN PHẨM: Đã thêm onclick="addToCart('${p.id}')" vào nút bấm
    container.innerHTML = products
        .map(
            (p) => `
        <div class="group bg-[#0f0f0f] border border-white/5 rounded-[2rem] overflow-hidden hover:border-cyan-400/50 transition-all duration-500 shadow-2xl">
            <a href="trangchitiet.html?id=${p.id}">
                <div class="aspect-[4/5] overflow-hidden">
                    <img src="${p.image}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100" onerror="this.src='https://placehold.co/400x500'">
                </div>
            </a>
            <div class="p-8">
                <h3 class="text-white text-xl font-bold uppercase italic">${p.name}</h3>
                <div class="flex justify-between items-center mt-4 mb-6">
                    <span class="text-cyan-400 font-mono text-lg">${p.price}</span>
                    <a href="trangchitiet.html?id=${p.id}" class="text-[10px] text-gray-500 border border-white/10 px-3 py-1 rounded-full uppercase">Details</a>
                </div>
                
                <button onclick="addToCart('${p.id}')" class="w-full bg-white text-black font-black py-4 rounded-xl uppercase text-[10px] tracking-widest hover:bg-cyan-400 transition-all active:scale-95">
                    ADD TO WISHLIST
                </button>
            </div>
        </div>
    `,
        )
        .join("");

    // HÀM XỬ LÝ KHI ẤN NÚT (Phải nằm trong hoặc ngoài DOMContentLoaded nhưng phải là global)
    window.addToCart = (id) => {
        // 1. Tìm sản phẩm trong kho gốc (luminous_db)
        const allProducts = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        const product = allProducts.find((p) => String(p.id) === String(id));

        if (product) {
            // 2. Lấy giỏ hàng hiện tại (key 'cart')
            let wishlist = JSON.parse(localStorage.getItem(CART_KEY)) || [];

            // 3. Kiểm tra trùng
            if (wishlist.some((item) => String(item.id) === String(id))) {
                alert("Món này bạn đã chọn rồi nha!");
                return;
            }

            // 4. Thêm vào và lưu lại
            wishlist.push(product);
            localStorage.setItem(CART_KEY, JSON.stringify(wishlist));
            alert("✅ Đã thêm " + product.name + " vào Wishlist!");
        } else {
            alert("Lỗi: Không tìm thấy thông tin sản phẩm!");
        }
    };
});
