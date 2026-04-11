/**
 * Hàm tải dữ liệu từ file JSON và hiển thị lên giao diện
 */
async function loadProducts() {
    const container = document.getElementById("product-container");

    // Kiểm tra nếu không tìm thấy container thì dừng lại để tránh lỗi
    if (!container) return;

    try {
        // Gọi file dữ liệu
        const response = await fetch("./products.json");

        if (!response.ok) {
            throw new Error(
                "Không thể tải file products.json. Hãy chắc chắn file tồn tại.",
            );
        }

        const products = await response.json();

        // Đổ dữ liệu vào HTML
        container.innerHTML = products
            .map((product) => {
                // Kiểm tra xem sản phẩm có phải bản giới hạn để chỉnh kích thước
                const colSpan = product.isLimited ? "lg:col-span-2" : "";

                return `
    <div class="group relative bg-[#1c1c1c] rounded-lg overflow-hidden border border-[#3b494c]/20 ${colSpan}">
        <a href="trangchitiet.html?id=${product.id}" class="block">
            <div class="relative overflow-hidden aspect-video">
                <img src="${product.image}" class="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all">
            </div>
            <div class="p-6">
                <h3 class="text-xl font-bold text-white uppercase">${product.name}</h3>
                <p class="text-[#00e5ff]">${product.price}</p>
            </div>
        </a>
        <div class="px-6 pb-6">
            <button 
                onclick="addToCart(event, '${product.id}', '${product.name}', '${product.price}', '${product.image}')"
                class="w-full bg-[#00e5ff]/10 border border-[#00e5ff]/50 text-[#00e5ff] py-3 rounded-md font-bold text-xs hover:bg-[#00e5ff] hover:text-[#00363d] transition-all flex items-center justify-center gap-2">
                <span class="material-symbols-outlined text-sm">add_shopping_cart</span>
                ACQUIRE ARTIFACT
            </button>
        </div>
    </div>
            `;
            })
            .join("");
    } catch (error) {
        console.error("Lỗi Cyber-Network:", error);
        container.innerHTML = `<p class="text-red-500 font-mono">Error: Failed to fetch data artifacts.</p>`;
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
// Kích hoạt khi trang đã sẵn sàng
document.addEventListener("DOMContentLoaded", loadProducts);
