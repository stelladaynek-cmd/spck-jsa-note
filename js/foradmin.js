let profile = document.getElementById("profile");
let name = document.getElementById("name");
let btnLogout = document.getElementById("btn-logout");
let btnLogin = document.getElementById("btn-login");

// lấy trong localStorage ra currentUser và kiểm tra xem có không
// Thay đổi dòng này:
let currentUser = JSON.parse(localStorage.getItem("currentUser")); // Không để mặc định là "{}"

if (currentUser) {
    profile.classList.remove("hidden");
    btnLogin.classList.add("hidden");
    // Cập nhật tên người dùng hiển thị
    document.getElementById("name").innerText =
        currentUser.fullName || currentUser.email;
} else {
    profile.classList.add("hidden");
    btnLogin.classList.remove("hidden");
}

btnLogout.addEventListener("click", () => {
    localStorage.setItem("currentUser", null);
    window.location.reload();
});
