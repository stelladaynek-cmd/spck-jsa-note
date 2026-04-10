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
                <div class="group relative bg-[#1c1c1c] rounded-lg overflow-hidden transition-all duration-500 border border-[#3b494c]/20 ${colSpan} hover:shadow-[0_0_20px_rgba(0,229,255,0.15)]">
                    <div class="relative overflow-hidden aspect-video">
                        <img src="${product.image}" 
                             class="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105" 
                             alt="${product.name}">
                        ${product.isLimited ? '<span class="absolute top-4 left-4 bg-[#00e5ff] text-[#00363d] text-[10px] font-bold px-2 py-1 rounded-sm">LIMITED</span>' : ""}
                    </div>
                    <div class="p-6">
                        <div class="flex justify-between items-start mb-4">
                            <div>
                                <h3 class="text-xl font-bold text-white uppercase tracking-tighter group-hover:text-[#00e5ff] transition-colors">${product.name}</h3>
                                <p class="text-xs text-[#b0c9e8] uppercase tracking-widest mt-1">${product.category}</p>
                            </div>
                            <span class="text-[#00e5ff] font-bold text-lg">${product.price}</span>
                        </div>
                        <button class="w-full bg-[#00e5ff]/10 border border-[#00e5ff]/50 text-[#00e5ff] py-3 rounded-md font-bold text-xs hover:bg-[#00e5ff] hover:text-[#00363d] transition-all active:scale-95 flex items-center justify-center gap-2">
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

// Kích hoạt khi trang đã sẵn sàng
document.addEventListener("DOMContentLoaded", loadProducts);
