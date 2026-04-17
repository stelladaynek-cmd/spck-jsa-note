const STORAGE_KEY = "luminous_db";

document.addEventListener("DOMContentLoaded", () => {
    console.log("Detail System Online...");

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) {
        console.error("Không tìm thấy ID sản phẩm!");
        return;
    }

    const products = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    // Tìm kiếm sản phẩm
    const item = products.find((p) => String(p.id) === String(id));

    if (item) {
        // Đổ dữ liệu vào các ID đã có trong trangchitiet.html của bạn
        if (document.getElementById("mainImg"))
            document.getElementById("mainImg").src = item.image;
        if (document.getElementById("mainTitle"))
            document.getElementById("mainTitle").innerText = item.name;
        if (document.getElementById("mainPrice"))
            document.getElementById("mainPrice").innerText = item.price;
        if (document.getElementById("mainDesc"))
            document.getElementById("mainDesc").innerText =
                item.desc || "No metadata available.";

        const btnContainer = document.getElementById("button-container");
        if (btnContainer) {
            btnContainer.innerHTML = `
                <button onclick="addToCart('${item.id}')" class="flex-1 bg-white/5 border border-white/10 text-white px-4 py-4 rounded-full font-bold uppercase text-[10px] hover:bg-white/10 transition-all">
                    Thêm giỏ hàng
                </button>
                <button onclick="buyNow('${item.id}')" class="flex-1 bg-cyan-400 text-black px-8 py-4 rounded-full font-bold uppercase text-[10px] hover:bg-white transition-all">
                    Mua ngay
                </button>
            `;
        }
    } else {
        alert("Sản phẩm không tồn tại!");
        window.location.href = "index.html";
    }
});

// Đưa hàm ra ngoài để HTML có thể gọi được
window.addToCart = function (id) {
    const products = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    const item = products.find((p) => String(p.id) === String(id));
    let cart = JSON.parse(localStorage.getItem("luminous_cart")) || [];

    if (item) {
        if (!cart.some((p) => String(p.id) === String(id))) {
            cart.push(item);
            localStorage.setItem("luminous_cart", JSON.stringify(cart));
            alert("Đã thêm vào giỏ hàng!");
        } else {
            alert("Món này đã có trong giỏ rồi!");
        }
    }
};

window.buyNow = function (id) {
    const products = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    const item = products.find((p) => String(p.id) === String(id));
    if (item) {
        localStorage.setItem("pendingOrder", JSON.stringify(item));
        window.location.href = "checkout.html";
    }
};
// Thêm hàm này vào detail.js
window.addToCartFromDetail = () => {
    const product = JSON.parse(localStorage.getItem("selectedProduct"));
    if (product) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        if (!cart.some((item) => item.id == product.id)) {
            cart.push(product);
            localStorage.setItem("cart", JSON.stringify(cart));
            alert("Đã thêm vào Wishlist!");
        } else {
            alert("Sản phẩm đã có trong Wishlist.");
        }
    }
};
