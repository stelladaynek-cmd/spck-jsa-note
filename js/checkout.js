document.addEventListener("DOMContentLoaded", () => {
    const product = JSON.parse(localStorage.getItem("pendingOrder"));
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    // 1. Hiển thị thông tin sản phẩm và giá
    if (product) {
        document.getElementById("checkout-img").src = product.image;
        document.getElementById("checkout-name").innerText = product.name;
        document.getElementById("checkout-price").innerText = product.price;
        document.getElementById("subtotal-price").innerText = product.price;
        document.getElementById("final-price").innerText = product.price;
    } else {
        alert("Giỏ hàng trống!");
        window.location.href = "index.html";
    }

    // 2. Tự động điền nếu có user đăng nhập
    if (currentUser) {
        document.getElementById("checkout-fullname").value =
            currentUser.fullName || "";
        document.getElementById("checkout-email").value =
            currentUser.email || "";
    }

    // 3. Xử lý đặt hàng
    document.getElementById("btn-complete-purchase").onclick = () => {
        const name = document.getElementById("checkout-fullname").value.trim();
        const email = document.getElementById("checkout-email").value.trim();
        const phone = document.getElementById("checkout-phone").value.trim();
        const address = document
            .getElementById("checkout-address")
            .value.trim();

        if (!name || !phone || !address) {
            alert("Vui lòng điền đầy đủ thông tin giao hàng!");
            return;
        }

        const orders = JSON.parse(localStorage.getItem("orders")) || [];

        const newOrder = {
            ...product,
            orderId: "LN-" + Math.floor(100000 + Math.random() * 900000),
            date: new Date().toLocaleString("vi-VN"),
            customer: { name, email, phone, address }, // Gắn chặt thông tin vào đơn này
        };

        orders.push(newOrder);
        localStorage.setItem("orders", JSON.stringify(orders));
        localStorage.removeItem("pendingOrder");

        alert("Thanh toán thành công!");
        window.location.href = "order.html";
    };
});
