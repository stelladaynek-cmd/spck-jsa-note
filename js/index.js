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
    <a href="trangchitiet.html?id=${product.id}" class="group block relative ...">
        <div class="relative overflow-hidden aspect-video">
            <img src="${product.image}" class="...">
        </div>
        <div class="p-6">
            <h3 class="text-xl font-bold text-white uppercase">${product.name}</h3>
            <p class="text-[#00e5ff]">${product.price}</p>
        </div>
    </a>
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

// Kích hoạt khi trang đã sẵn sàng
document.addEventListener("DOMContentLoaded", loadProducts);
