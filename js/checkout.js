document.addEventListener("DOMContentLoaded", () => {
    const product = JSON.parse(localStorage.getItem("pendingOrder"));

    // Hiển thị sản phẩm ra màn hình Checkout (nếu bạn đã đặt ID như các bước trước tui chỉ)
    if (product) {
        if (document.getElementById("checkout-img"))
            document.getElementById("checkout-img").src = product.image;
        if (document.getElementById("checkout-name"))
            document.getElementById("checkout-name").innerText = product.name;
        if (document.getElementById("checkout-price"))
            document.getElementById("checkout-price").innerText = product.price;
    }

    // QUAN TRỌNG: Khi ấn nút mua hàng thành công
    const btnBuy =
        document.querySelector("button.bg-primary-container") ||
        document.getElementById("btn-complete-purchase");

    if (btnBuy) {
        btnBuy.onclick = () => {
            // Lấy danh sách các đơn đã mua từ trước
            let orders = JSON.parse(localStorage.getItem("orders")) || [];

            // Thêm sản phẩm vừa mua vào danh sách
            orders.push({
                ...product,
                orderId: "LN-" + Math.floor(Math.random() * 900000),
                date: new Date().toLocaleString(),
            });

            // Lưu lại vào kho "orders"
            localStorage.setItem("orders", JSON.stringify(orders));

            // Xóa sản phẩm chờ
            localStorage.removeItem("pendingOrder");

            alert("Mua hàng thành công!");
            window.location.href = "order.html";
        };
    }
});
