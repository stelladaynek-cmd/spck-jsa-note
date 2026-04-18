document.addEventListener("DOMContentLoaded", () => {
    renderOrders();
});

function renderOrders() {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const container = document.getElementById("order-items-list");
    const titleId = document.getElementById("order-id-title");
    const customerInfoContainer = document.getElementById("customer-info");

    if (orders.length === 0) {
        if (container)
            container.innerHTML = `<p class="text-center py-20 opacity-30">CHƯA CÓ ĐƠN HÀNG</p>`;
        if (titleId) titleId.innerText = "No Orders";
        if (customerInfoContainer) customerInfoContainer.innerHTML = "N/A";
        return;
    }

    // 1. Hiển thị mã đơn mới nhất lên tiêu đề
    const latest = orders[orders.length - 1];
    if (titleId) titleId.innerText = `Order #${latest.orderId}`;

    // 2. Đổ thông tin khách của đơn mới nhất vào khung bên phải (Cái box Customer Info)
    if (customerInfoContainer && latest.customer) {
        customerInfoContainer.innerHTML = `
            <div class="space-y-3 text-white">
                <p><span class="text-gray-500 uppercase text-[9px] tracking-widest">Tên:</span> <br><b>${latest.customer.name}</b></p>
                <p><span class="text-gray-500 uppercase text-[9px] tracking-widest">SĐT:</span> <br><b class="font-mono text-cyan-400">${latest.customer.phone}</b></p>
                <p><span class="text-gray-500 uppercase text-[9px] tracking-widest">Email:</span> <br><b>${latest.customer.email}</b></p>
                <p class="pt-2 border-t border-white/5"><span class="text-gray-500 uppercase text-[9px] tracking-widest">Địa chỉ:</span><br><span class="text-xs italic text-gray-400">${latest.customer.address}</span></p>
            </div>
        `;
    }

    // 3. Hiển thị danh sách sản phẩm (Từng món kèm full thông tin người mua)
    container.innerHTML = [...orders]
        .reverse()
        .map(
            (item) => `
        <div class="bg-[#111] border border-white/5 rounded-3xl overflow-hidden mb-6">
            <div class="p-6 flex flex-col md:flex-row gap-6 items-center">
                <img src="${item.image}" class="w-24 h-24 object-cover rounded-2xl border border-white/10">
                
                <div class="flex-1">
                    <div class="flex justify-between items-start mb-4">
                        <div>
                            <h3 class="font-bold text-white uppercase text-sm tracking-tight">${item.name}</h3>
                            <p class="text-cyan-400 font-mono font-bold">${item.price}</p>
                            <p class="text-[9px] text-gray-600 uppercase mt-1">ID: ${item.orderId} | ${item.date}</p>
                        </div>
                        <button onclick="cancelOrder('${item.orderId}')" 
                            class="text-[9px] text-red-500 border border-red-500/20 px-3 py-1.5 rounded-full hover:bg-red-500 hover:text-white transition-all font-black">
                            CANCEL ORDER
                        </button>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-white/[0.03] rounded-2xl border border-white/5">
                        <div>
                            <p class="text-[8px] text-gray-500 uppercase tracking-[0.2em] mb-1">Customer</p>
                            <p class="text-xs font-bold text-white">${item.customer?.name || "Guest"}</p>
                        </div>
                        <div>
                            <p class="text-[8px] text-gray-500 uppercase tracking-[0.2em] mb-1">Contact</p>
                            <p class="text-[11px] text-white font-mono">${item.customer?.phone || "N/A"}</p>
                            <p class="text-[10px] text-gray-400 truncate">${item.customer?.email || "N/A"}</p>
                        </div>
                        <div class="md:col-span-2 border-t border-white/5 pt-2">
                            <p class="text-[8px] text-gray-500 uppercase tracking-[0.2em] mb-1">Shipping To</p>
                            <p class="text-xs text-gray-300 italic">${item.customer?.address || "N/A"}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
        )
        .join("");
}

// 4. Hàm xóa hàng
function cancelOrder(id) {
    if (confirm("Bạn có chắc chắn muốn xóa đơn hàng này?")) {
        let orders = JSON.parse(localStorage.getItem("orders")) || [];
        orders = orders.filter((o) => o.orderId !== id);
        localStorage.setItem("orders", JSON.stringify(orders));
        renderOrders(); // Cập nhật lại màn hình ngay
    }
}
