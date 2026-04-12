document.addEventListener("DOMContentLoaded", () => {
    // 1. Lấy ID từ URL (Ví dụ: trangchitiet.html?id=1)
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");

    let currentProduct = null; // Biến lưu sản phẩm hiện tại để dùng cho nút bấm

    // 2. Tải dữ liệu từ file JSON
    fetch("products.json")
        .then((response) => response.json())
        .then((products) => {
            // 3. Tìm sản phẩm theo ID
            currentProduct = products.find((p) => p.id == productId);

            if (currentProduct) {
                // 4. Đổ dữ liệu vào HTML
                document.getElementById("product-img").src =
                    currentProduct.image;
                document.getElementById("product-name").innerText =
                    currentProduct.name;
                document.getElementById("product-price").innerText =
                    currentProduct.price;
                document.getElementById("product-desc").innerText =
                    currentProduct.description;

                const tag = document.querySelector(".limited-tag");
                if (tag) {
                    tag.innerText = currentProduct.isLimited
                        ? "Limited Edition Release"
                        : "Standard Edition";
                }
            } else {
                document.body.innerHTML =
                    "<h1 style='color:white; text-align:center;'>Sản phẩm không tồn tại!</h1>";
            }
        })
        .catch((error) => console.error("Lỗi khi tải JSON:", error));

    // 5. Xử lý sự kiện nút ADD TO CART
    document.querySelector(".btn-add-cart").onclick = () => {
        if (currentProduct) {
            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            // ... logic thêm sản phẩm vào mảng cart ...

            localStorage.setItem("cart", JSON.stringify(cart));

            // Chuyển hướng ngay lập tức
            window.location.href = "checkout.html";
        }
    };

    // 6. Xử lý sự kiện nút ADD TO WISH-LIST
    document.querySelector(".btn-wishlist").addEventListener("click", () => {
        if (currentProduct) {
            addToStorage("wishlist", currentProduct);
            alert("Đã thêm vào Wishlist!");
        }
    });
});

// Hàm dùng chung để lưu vào localStorage
function addToStorage(key, product) {
    let items = JSON.parse(localStorage.getItem(key)) || [];
    // Kiểm tra xem sản phẩm đã có trong danh sách chưa để tránh trùng lặp
    const exists = items.find((item) => item.id === product.id);
    if (!exists) {
        items.push(product);
        localStorage.setItem(key, JSON.stringify(items));
    }
}
