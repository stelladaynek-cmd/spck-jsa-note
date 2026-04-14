document.addEventListener("DOMContentLoaded", () => {
    // 1. Mở kho "orders" ra xem có gì không
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const container = document.getElementById("order-items-list"); // Nhớ thêm ID này vào div bên order.html
    const titleId = document.getElementById("order-id-title");

    if (orders.length > 0) {
        const latest = orders[orders.length - 1]; // Lấy đơn mới nhất
        if (titleId) titleId.innerText = `Order #${latest.orderId}`;

        // 2. Đổ dữ liệu vào giao diện
        container.innerHTML = orders
            .map(
                (item) => `
            <div class="flex items-center gap-6 p-4 rounded-xl bg-[#1a1a1a] mb-4 border border-white/5">
                <img src="${item.image}" class="w-20 h-20 object-cover rounded-lg">
                <div class="flex-1">
                    <h3 class="font-bold text-white">${item.name}</h3>
                    <p class="text-cyan-400 font-bold">${item.price}</p>
                    <p class="text-[10px] text-gray-500 uppercase">${item.date || ""}</p>
                </div>
                <span class="text-green-500 text-xs font-bold">SUCCESS</span>
            </div>
        `,
            )
            .join("");
    } else {
        container.innerHTML =
            "<p class='text-gray-500'>Bạn chưa có đơn hàng nào.</p>";
    }
});
