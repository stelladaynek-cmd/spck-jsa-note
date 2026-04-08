let profile = document.getElementById("profile");
let name = document.getElementById("name");
let btnLogout = document.getElementById("btn-logout");
let btnLogin = document.getElementById("btn-login");

// lấy trong localStorage ra currentUser và kiểm tra xem có không
let currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
if (currentUser) {
    profile.classList.remove("hidden");
    btnLogin.classList.add("hidden");
    console.log("check");
} else {
    profile.classList.add("hidden");
    btnLogin.classList.remove("hidden");
}

btnLogout.addEventListener("click", () => {
    localStorage.setItem("currentUser", null);
    window.location.reload();
});
