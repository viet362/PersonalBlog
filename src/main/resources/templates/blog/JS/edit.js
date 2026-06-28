// 1. HÀM KÍCH HOẠT SỬA: Gọi API lấy dữ liệu cũ rồi vẽ Form vào #show
function editBlog(id) {
    axios.get(`http://localhost:8080/api/blogs/${id}`)
        .then(res => {
            renderEditForm(res.data);
        })
        .catch(err => alert("Không thể tải dữ liệu bài viết để sửa!"));
}

// 2. HÀM VẼ FORM CHỈNH SỬA TẠI CHỖ (Thay thế danh sách card)
function renderEditForm(blog) {
    const showDiv = document.getElementById("show");

    // Đè toàn bộ vùng lưới thành giao diện form nhập liệu
    showDiv.innerHTML = `
        <div class="col-12">
            <div class="card shadow-sm border rounded-3">
                <div class="card-header bg-dark text-white p-3">
                    <h5 class="m-0 fw-bold">📝 Chỉnh sửa bài viết</h5>
                </div>
                <div class="card-body p-4 bg-white">
                    <div class="mb-3">
                        <label for="editTitle" class="form-label fw-semibold">Tiêu đề bài viết</label>
                        <input type="text" id="editTitle" class="form-control form-control-lg" value="${blog.title}">
                    </div>
                    
                    <div class="mb-4">
                        <label for="editContent" class="form-label fw-semibold">Nội dung chi tiết</label>
                        <textarea id="editContent" class="form-control" rows="10">${blog.content || ''}</textarea>
                    </div>
                    
                    <div class="d-flex justify-content-end gap-2">
                        <button onclick="loadMyBlogs()" class="btn btn-outline-secondary px-4 btn-sm">Hủy bỏ</button>
                        <button onclick="submitUpdate(${blog.id})" class="btn btn-primary px-4 btn-sm fw-medium">Lưu thay đổi</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// 3. HÀM SUBMIT LÊN SERVER: Gửi lệnh PUT để cập nhật dữ liệu
function submitUpdate(id) {
    const titleInput = document.getElementById("editTitle").value.trim();
    const contentInput = document.getElementById("editContent").value.trim();

    if (!titleInput || !contentInput) {
        alert("Vui lòng nhập đầy đủ tiêu đề và nội dung!");
        return;
    }

    const updatedData = {
        title: titleInput,
        content: contentInput
    };

    axios.put(`http://localhost:8080/api/blogs/${id}`, updatedData)
        .then(res => {
            alert("Cập nhật bài viết thành công! 🎉");
            loadMyBlogs(); // Cập nhật xong tự gọi lại danh sách bài viết mới nhất
        })
        .catch(err => {
            console.error("Lỗi cập nhật:", err);
            alert("Cập nhật thất bại, vui lòng kiểm tra lại backend!");
        });
}