/**
 * Hàm tải dữ liệu từ file JSON và hiển thị lên giao diện
 */
async function loadProducts() {
    const container = document.getElementById("product-container");
    if (!container) return;

    try {
        // BƯỚC 1: Lấy sản phẩm gốc từ file JSON
        const response = await fetch("./products.json");
        const originalProducts = await response.json();

        // BƯỚC 2: Lấy sản phẩm bạn đã tự thêm từ LocalStorage
        const customProducts =
            JSON.parse(localStorage.getItem("customProducts")) || [];

        // BƯỚC 3: GỘP CẢ HAI LẠI THÀNH MỘT MẢNG DUY NHẤT
        const allProducts = [...originalProducts, ...customProducts];

        // BƯỚC 4: Hiển thị toàn bộ ra màn hình
        container.innerHTML = allProducts
            .map((product) => {
                const colSpan = product.isLimited ? "lg:col-span-2" : "";
                return `
                <div class="group relative bg-[#1c1c1c] rounded-lg overflow-hidden border border-[#3b494c]/20 ${colSpan}">
                    <a href="trangchitiet.html?id=${product.id}" class="block">
                        <div class="relative aspect-video">
                            <img src="${product.image}" class="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all">
                        </div>
                        <div class="p-6">
                            <h3 class="text-xl font-bold text-white">${product.name}</h3>
                            <p class="text-cyan-400 font-bold">${product.price}</p>
                        </div>
                    </a>
                </div>
            `;
            })
            .join("");
    } catch (error) {
        console.error("Lỗi tải sản phẩm:", error);
    }
}
// Giả sử đây là hàm render sản phẩm ở trang chủ của bạn
function renderProducts(products) {
    const container = document.getElementById("product-list");
    container.innerHTML = products
        .map(
            (product) => `
        <div class="product-card">
            <!-- QUAN TRỌNG: Truyền id vào đường dẫn -->
            <a href="product-detail.html?id=${product.id}">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.price}</p>
            </a>
        </div>
    `,
        )
        .join("");
}
function addToCart(event, id, name, price, image) {
    // Ngăn chặn việc chuyển trang khi nhấn vào nút nằm trong thẻ <a>
    event.preventDefault();

    // 1. Lấy giỏ hàng hiện tại từ localStorage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // 2. Kiểm tra xem sản phẩm đã có chưa
    const existingItem = cart.find((item) => item.id === id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id, name, price, image, quantity: 1 });
    }

    // 3. Lưu lại vào localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    alert(`Đã thêm ${name} vào giỏ hàng!`);
}
async function loadProducts() {
    const container = document.getElementById("product-container");
    if (!container) return;

    try {
        // Tải hàng từ JSON
        const response = await fetch("./products.json");
        const originalProducts = await response.json();

        // Tải hàng từ LocalStorage (hàng bạn vừa thêm ở foradmin.html)
        const customProducts =
            JSON.parse(localStorage.getItem("customProducts")) || [];

        // GỘP CHÚNG LẠI
        const allProducts = [...originalProducts, ...customProducts];

        // Vẽ ra màn hình
        container.innerHTML = allProducts
            .map((product) => {
                const colSpan = product.isLimited ? "lg:col-span-2" : "";
                return `
                <div class="group relative bg-[#1c1c1c] rounded-lg overflow-hidden border border-[#3b494c]/20 ${colSpan}">
                    <a href="trangchitiet.html?id=${product.id}" class="block">
                        <div class="relative aspect-video">
                            <img src="${product.image}" class="w-full h-full object-cover">
                        </div>
                        <div class="p-6">
                            <h3 class="text-xl font-bold">${product.name}</h3>
                            <p class="text-cyan-400 font-bold">${product.price}</p>
                        </div>
                    </a>
                </div>
            `;
            })
            .join("");
    } catch (e) {
        console.error("Lỗi:", e);
    }
}

// Kích hoạt khi trang đã sẵn sàng
document.addEventListener("DOMContentLoaded", loadProducts);
