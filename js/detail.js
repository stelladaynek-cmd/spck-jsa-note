document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id"); // Lấy ID từ URL

    fetch("products.json")
        .then((response) => response.json())
        .then((products) => {
            // Tìm sản phẩm khớp ID
            const product = products.find((p) => p.id == productId);

            if (product) {
                // Đổ dữ liệu vào đúng ID trong HTML
                document.getElementById("product-img").src = product.image;
                document.getElementById("product-name").innerText =
                    product.name;
                document.getElementById("product-price").innerText =
                    product.price;
                document.getElementById("product-desc").innerText =
                    product.description;

                const tag = document.querySelector(".limited-tag");
                if (tag) {
                    tag.innerText = product.isLimited
                        ? "Limited Edition Release"
                        : "Standard Edition";
                }
            } else {
                // Nếu không tìm thấy, báo lỗi rõ hơn thay vì xóa trắng trang
                document.getElementById("product-name").innerText =
                    "Sản phẩm không tồn tại";
            }
        })
        .catch((error) => console.error("Lỗi:", error));
});
