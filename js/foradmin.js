// admin.js

// 1. Hàm hiển thị danh sách người dùng
function renderUsers() {
    const userTableBody = document.getElementById("user-table-body");
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    // Xóa trắng bảng trước khi vẽ lại
    userTableBody.innerHTML = "";

    if (users.length === 0) {
        userTableBody.innerHTML = `
            <tr>
                <td colspan="5" class="p-10 text-center text-secondary opacity-50 uppercase tracking-widest">No data available in the archive</td>
            </tr>
        `;
        return;
    }

    users.forEach((user, index) => {
        const row = document.createElement("tr");
        row.className =
            "hover:bg-white/5 transition-colors border-b border-white/5";

        row.innerHTML = `
            <td class="p-4 text-xs font-mono text-secondary">${index + 1}</td>
            <td class="p-4 font-bold text-sm text-[#00e5ff]">${user.fullName || "Unknown"}</td>
            <td class="p-4 text-sm">${user.email}</td>
            <td class="p-4 text-xs font-mono opacity-40">••••••••</td>
            <td class="p-4">
                <button onclick="deleteUser('${user.email}')" class="bg-red-900/20 text-red-400 border border-red-900/50 px-3 py-1 text-[10px] font-bold uppercase rounded hover:bg-red-500 hover:text-white transition-all">
                    Terminate
                </button>
            </td>
        `;
        userTableBody.appendChild(row);
    });
}

// 2. Hàm xóa người dùng
window.deleteUser = function (email) {
    if (
        confirm(`Hành động này sẽ xóa vĩnh viễn Identity: ${email}. Tiếp tục?`)
    ) {
        let users = JSON.parse(localStorage.getItem("users") || "[]");

        // Lọc bỏ user có email được chọn
        users = users.filter((user) => user.email !== email);

        // Cập nhật lại localStorage
        localStorage.setItem("users", JSON.stringify(users));

        // Vẽ lại bảng
        renderUsers();
    }
};

// 3. Khởi chạy khi trang load
document.addEventListener("DOMContentLoaded", renderUsers);
