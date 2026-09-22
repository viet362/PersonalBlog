function createBlog() {
    const authorUser = JSON.parse(localStorage.getItem("user"));
    if (!authorUser) {
        if (confirm("Bạn cần đăng nhập để tạo bài viết mới. Chuyển đến trang đăng nhập?")) {
            window.location.href = "/index.html";
        }
        return;
    }

    const showDiv = document.getElementById("show");
    showDiv.innerHTML = `
        <div class="col-12">
            <div class="card shadow-sm border rounded-4">
                <div class="card-header bg-dark text-white p-3 rounded-top-4">
                    <h5 class="m-0 fw-bold">➕ Viết bài blog mới</h5>
                </div>
                <div class="card-body p-4 bg-white">
                    <div class="mb-3">
                        <label for="addTitle" class="form-label fw-semibold">Tiêu đề bài viết</label>
                        <input type="text" id="addTitle" class="form-control form-control-lg" placeholder="Nhập tiêu đề bài viết của bạn...">
                    </div>
                    
                    <div class="mb-4">
                        <label for="addContent" class="form-label fw-semibold">Nội dung chi tiết</label>
                        <textarea id="addContent" class="form-control" rows="10" placeholder="Bắt đầu viết nội dung tại đây..."></textarea>
                    </div>
                    
                    <div class="d-flex justify-content-end gap-2">
                        <button onclick="cancelCreate()" class="btn btn-outline-secondary px-4">Hủy bỏ</button>
                        <button id="btnSubmitBlog" onclick="submitCreate()" class="btn btn-primary px-4 fw-semibold">Đăng bài viết</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function submitCreate() {
    const authorUser = JSON.parse(localStorage.getItem("user"));
    if (!authorUser) {
        alert("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại!");
        window.location.href = "/index.html";
        return;
    }

    const titleInput = document.getElementById("addTitle").value.trim();
    const contentInput = document.getElementById("addContent").value.trim();
    const btn = document.getElementById("btnSubmitBlog");

    if (!titleInput || !contentInput) {
        alert("Vui lòng điền đầy đủ tiêu đề và nội dung trước khi đăng!");
        return;
    }

    const newBlogData = {
        title: titleInput,
        content: contentInput,
        users: { id: authorUser.id }
    };

    btn.disabled = true;
    btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Đang đăng bài...';

    axios.post("/api/blogs", newBlogData)
        .then(res => {
            alert("Đăng bài viết mới thành công! 🎉");
            backToOldList();
        })
        .catch(err => {
            console.error("Lỗi khi tạo bài viết:", err);
            alert("Đăng bài thất bại! Vui lòng thử lại.");
            btn.disabled = false;
            btn.innerText = "Đăng bài viết";
        });
}

function cancelCreate() {
    backToOldList();
}

function backToOldList() {
    if (typeof loadMyBlogs === 'function' && window.currentTab === 'myBlogs') {
        loadMyBlogs();
    } else {
        window.location.href = "/blog/home.html";
    }
}
