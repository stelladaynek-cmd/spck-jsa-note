const loginForm = document.getElementById("login-form");

// Lắng nghe sự kiện submit trên form
loginForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Tắt chức năng reload trang

    // Lấy giá trị từ input (đảm bảo input trong HTML có name="email" và name="password")
    let email = e.target.email.value.trim();
    let password = e.target.password.value.trim();

    // 1. Kiểm tra rỗng
    if (!email) {
        alert("Vui lòng nhập email");
        return;
    }

    if (!password) {
        alert("Vui lòng nhập mật khẩu");
        return;
    }

    // 2. Lấy dữ liệu users từ localStorage
    let users = JSON.parse(localStorage.getItem("users") || "[]");

    // 3. Kiểm tra sự tồn tại của tài khoản
    const isExisting = users.find(
        (item) => item.email === email && item.password === password,
    );

    // 4. Xử lý logic đăng nhập
    if (isExisting) {
        // Đăng nhập thành công
        localStorage.setItem("currentUser", JSON.stringify(isExisting));
        alert("Đăng nhập thành công!");
        window.location.href = "index.html";
    } else {
        // Không tìm thấy tài khoản hoặc sai mật khẩu
        // Hiển thị lựa chọn cho người dùng
        const confirmRegister = confirm(
            "Tài khoản không tồn tại hoặc sai thông tin. Bạn có muốn chuyển sang trang Đăng ký không?",
        );

        if (confirmRegister) {
            // Nếu bấm OK -> chuyển hướng
            window.location.href = "/register.html";
        }
        // Nếu bấm Cancel -> ở lại trang login để nhập lại
    }
});
