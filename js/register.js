const registerForm = document.getElementById("register-form");

// lắng nghe sự kiện submit trên form
registerForm.addEventListener("submit", (e) => {
    e.preventDefault(); // tắt chức năng reload trang khi submit form
    let fullName = e.target.fullName.value;
    let email = e.target.email.value;
    let password = e.target.password.value;
    let repeatPassword = e.target.repeatPassword.value;
    console.log({ fullName, email, password, repeatPassword });

    // nếu giá trị = null: rỗng thì cảnh báo
    if (!fullName) {
        alert("Vui lòng nhập tên đầy đủ");
        return;
    }

    if (!email) {
        alert("Vui lòng nhập email");
        return;
    }

    if (!password) {
        alert("Vui lòng nhập mật khẩu");
        return;
    }

    // tạo regex để match password
    // mật khẩu yêu cầu bảo mật phải cao như
    // + trên 8 kí tự
    // + có chữ hoa
    // + có chữ số
    let regexUppercase = /[A-Z]/;
    let regexNumber = /[0-9]/;
    if (password.length < 8) {
        alert("Mật khẩu phải trên 8 kí tự!");
        return;
    }

    if (!password.match(regexUppercase)) {
        alert("Mật khẩu phải có ký tự viết hoa");
        return;
    }

    if (!password.match(regexNumber)) {
        alert("Mật khẩu phải có chữ số");
        return;
    }

    if (password != repeatPassword) {
        alert("Mật khẩu không khớp");
        return;
    }

    console.log("đăng nhập thành công");
    // tạo 1 object user mới
    let newUser = {
        fullName,
        email,
        password,
    };

    // parse ra mảng JSON, nếu k có thì ra mảng rỗng
    let users = JSON.parse(localStorage.getItem("users") || "[]");
    users.push(newUser);

    // lưu vào lại localStorage
    localStorage.setItem("users", JSON.stringify(users));

    alert("Đăng nhập thành công");
    //điều hướng người dùng về trang /login
    window.location.href = "login.html";
});
