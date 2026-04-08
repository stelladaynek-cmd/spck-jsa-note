const loginForm = document.getElementById("login-form");

// lắng nghe sự kiện submit trên form
loginForm.addEventListener("submit", (e) => {
    e.preventDefault(); // tắt chức năng reload trang khi submit form
    let email = e.target.email.value;
    let password = e.target.password.value;
    console.log({ email, password });

    // nếu giá trị = null: rỗng thì cảnh báo

    if (!email) {
        alert("Vui lòng nhập email");
        return;
    }

    if (!password) {
        alert("Vui lòng nhập mật khẩu");
        return;
    }

    // lấy ra mảng users để kiểm tra
    let users = JSON.parse(localStorage.getItem("users") || "[]");

    // kiểm tra xem với email và password này có tồn tại trong bể users chưa, nếu có thì biến isExising = true, ngược lại là false
    const isExisting = users.find(
        (item) => item.email == email && item.password == password,
    );

    // nếu mà = true, thì có nghĩa là đúng tài khoản mật khẩu
    if (isExisting) {
        console.log(isExisting);
        // tạo ra biến user hiện tại đã đăng nhập thành công vào local
        localStorage.setItem("currentUser", JSON.stringify(isExisting));
        window.location.href = "/index.html";
    } else {
        alert("Sai tài khoản hoặc mật khẩu");
    }
});
