document.addEventListener("DOMContentLoaded", () => {
    const btnSave = document.getElementById("btn-save-product");

    btnSave.onclick = () => {
        const name = document.getElementById("add-name").value;
        const price = document.getElementById("add-price").value;
        const image = document.getElementById("add-image").value;
        const desc = document.getElementById("add-desc").value;

        if (!name || !price || !image) {
            alert("Vui lòng điền đủ Tên, Giá và Link ảnh!");
            return;
        }

        // 1. Lấy danh sách hàng tự thêm cũ
        let customProducts =
            JSON.parse(localStorage.getItem("customProducts")) || [];

        // 2. Tạo sản phẩm mới (ID có chữ "custom" để không bị trùng với file JSON)
        const newProduct = {
            id: "custom-" + Date.now(),
            name: name,
            price: price,
            image: image,
            description: desc,
            isLimited: false,
        };

        // 3. Cất vào kho LocalStorage
        customProducts.push(newProduct);
        localStorage.setItem("customProducts", JSON.stringify(customProducts));

        alert("Đã lưu sản phẩm thành công!");
        window.location.href = "index.html"; // Chuyển về trang chủ để xem
    };
});
