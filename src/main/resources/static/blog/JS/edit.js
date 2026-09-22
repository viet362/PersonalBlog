function editBlog(id) {
    axios.get(`/api/blogs/${id}`)
        .then(res => {
            renderEditForm(res.data);
        })
        .catch(err => {
            console.error(err);
            alert("Không thể tải dữ liệu bài viết để sửa!");
        });
}

function renderEditForm(blog) {
    const showDiv = document.getElementById("show");

    showDiv.innerHTML = `
        <div class="col-12">
            <div class="card shadow-sm border rounded-4">
                <div class="card-header bg-dark text-white p-3 rounded-top-4">
                    <h5 class="m-0 fw-bold">📝 Chỉnh sửa bài viết</h5>
                </div>
                <div class="card-body p-4 bg-white">
                    <div class="mb-3">
                        <label for="editTitle" class="form-label fw-semibold">Tiêu đề bài viết</label>
                        <input type="text" id="editTitle" class="form-control form-control-lg" value="${escapeHtml(blog.title)}">
                    </div>
                    
                    <div class="mb-4">
                        <label for="editContent" class="form-label fw-semibold">Nội dung chi tiết</label>
                        <textarea id="editContent" class="form-control" rows="10">${escapeHtml(blog.content || '')}</textarea>
                    </div>
                    
                    <div class="d-flex justify-content-end gap-2">
                        <button onclick="loadMyBlogs()" class="btn btn-outline-secondary px-4">Hủy bỏ</button>
                        <button id="btnSaveBlog" onclick="submitUpdate(${blog.id})" class="btn btn-primary px-4 fw-semibold">Lưu thay đổi</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function submitUpdate(id) {
    const titleInput = document.getElementById("editTitle").value.trim();
    const contentInput = document.getElementById("editContent").value.trim();
    const btn = document.getElementById("btnSaveBlog");

    if (!titleInput || !contentInput) {
        alert("Vui lòng nhập đầy đủ tiêu đề và nội dung!");
        return;
    }

    btn.disabled = true;
    btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Đang lưu...';

    const updatedData = {
        title: titleInput,
        content: contentInput
    };

    axios.put(`/api/blogs/${id}`, updatedData)
        .then(res => {
            alert("Cập nhật bài viết thành công! 🎉");
            loadMyBlogs();
        })
        .catch(err => {
            console.error("Lỗi cập nhật:", err);
            alert("Cập nhật thất bại, vui lòng kiểm tra lại!");
            btn.disabled = false;
            btn.innerText = "Lưu thay đổi";
        });
}
