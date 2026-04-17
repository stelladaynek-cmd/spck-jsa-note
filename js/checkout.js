document.addEventListener("DOMContentLoaded", () => {
    const product = JSON.parse(localStorage.getItem("pendingOrder"));

    if (product) {
        // Hiển thị thông tin sản phẩm muốn mua
        if (document.getElementById("checkout-img"))
            document.getElementById("checkout-img").src = product.image;
        if (document.getElementById("checkout-name"))
            document.getElementById("checkout-name").innerText = product.name;
        if (document.getElementById("checkout-price"))
            document.getElementById("checkout-price").innerText = product.price;
    } else {
        alert("Không có sản phẩm nào để thanh toán!");
        window.location.href = "index.html";
    }

    const btnBuy =
        document.getElementById("btn-complete-purchase") ||
        document.querySelector("button.bg-primary-container");

    if (btnBuy) {
        btnBuy.onclick = () => {
            let orders = JSON.parse(localStorage.getItem("orders")) || [];

            // Tạo đơn hàng mới
            const newOrder = {
                ...product,
                orderId: "LN-" + Math.floor(Math.random() * 900000),
                date: new Date().toLocaleString(),
            };

            orders.push(newOrder);
            localStorage.setItem("orders", JSON.stringify(orders));
            localStorage.removeItem("pendingOrder"); // Xóa hàng chờ sau khi mua xong

            alert("Mua hàng thành công!");
            window.location.href = "order.html";
        };
    }
});
