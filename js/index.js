// Tên kho dữ liệu phải trùng với STORAGE_KEY bên admin.js
const STORAGE_KEY = "luminous_db";

document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("product-container");
    if (!container) return;

    // 1. Lấy dữ liệu từ LocalStorage
    const allProducts = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    // 2. Kiểm tra nếu kho trống
    if (allProducts.length === 0) {
        container.innerHTML = `
            <div class="col-span-full text-center py-20 border border-dashed border-white/10 rounded-[3rem]">
                <p class="text-gray-500 uppercase tracking-[0.3em] text-xs mb-4">Hệ thống dữ liệu đang trống</p>
                <a href="foradmin.html" class="inline-block bg-white text-black px-8 py-3 rounded-full font-bold text-[10px] uppercase hover:bg-[#00e5ff] transition-all">
                    Vào Admin thêm sản phẩm
                </a>
            </div>
        `;
        return;
    }

    // 3. Đổ dữ liệu vào giao diện (Thiết lập Bento Grid)
    container.innerHTML = allProducts
        .map((p, index) => {
            // Thiết lập kích thước ô dựa trên vị trí (index)
            // index 0: Ô siêu to (chiếm 2 cột, 2 hàng)
            // index 1: Ô dài (chiếm 1 cột, 2 hàng)
            // Các index còn lại: Ô thường
            let gridClass = "lg:col-span-1 lg:row-span-1"; // Mặc định

            if (index === 0) {
                gridClass = "lg:col-span-2 lg:row-span-2 min-h-[500px]";
            } else if (index === 1) {
                gridClass = "lg:col-span-1 lg:row-span-2 min-h-[500px]";
            }

            return `
            <div class="${gridClass} product-card group relative bg-[#111] rounded-[2.5rem] overflow-hidden border border-white/5 hover:border-[#00e5ff]/50">
                <a href="trangchitiet.html?id=${p.id}" class="block w-full h-full">
                    <img src="${p.image}" 
                         class="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                         onerror="this.src='https://placehold.co/800x1000?text=Luminous+Artifact'">
                    
                    <div class="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>

                    <div class="absolute bottom-0 left-0 p-8 w-full">
                        <div class="flex flex-col gap-1">
                            <span class="text-[#00e5ff] text-[10px] font-bold uppercase tracking-[0.3em] mb-1">New Artifact</span>
                            <h3 class="text-2xl md:text-3xl font-bold text-white uppercase italic tracking-tighter leading-none">
                                ${p.name}
                            </h3>
                            <div class="flex justify-between items-end mt-4">
                                <span class="text-sm font-mono text-gray-400 tracking-wider">${p.price}</span>
                                <span class="material-symbols-outlined text-white opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">
                                    arrow_outward
                                </span>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
        `;
        })
        .join("");
});
