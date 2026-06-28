const currentUser = JSON.parse(localStorage.getItem("user"));

// Hàm tải danh sách bài viết của riêng tôi
function loadMyBlogs() {
    // LƯU Ý: Thay url này bằng API lấy bài viết theo User của bạn nếu có
    // (Ví dụ: `http://localhost:8080/api/blogs/user/${currentUser.id}`)
    axios.get("http://localhost:8080/api/blogs")
        .then(res => {
            // Giả định lọc các bài viết do chính user này viết nếu API trả về chung
            // Nếu API của bạn đã tự lọc sẵn ở backend thì không cần dòng .filter này nữa nhé
            const myBlogs = res.data.filter(b => b.users && b.users.name === currentUser?.name);
            renderMyList(myBlogs);
        })
        .catch(err => console.error("Lỗi tải bài viết cá nhân:", err));
}

// Hàm vẽ danh sách bài viết dưới dạng lưới (Grid) kèm công cụ Quản lý (Sửa/Xóa)
function renderMyList(data) {
    const showDiv = document.getElementById("show");

    if (!data || data.length === 0) {
        showDiv.innerHTML = `
          <div class="col-12 text-center my-5 py-5 text-muted">
            <i class="fa-solid fa-pen-to-square fa-3x mb-3"></i>
            <p class="fs-5">Bạn chưa viết bài blog nào cả!</p>
          </div>`;
        return;
    }

    let html = "";
    data.forEach(b => {
        // Tự động bẫy dữ liệu để lấy đúng tên tác giả hiển thị dưới tiêu đề
        const authorName = b.users ? b.users.name : (b.user ? b.user.name : "Unknown");

        html += `
            <div class="col">
                <div class="py-3">
                    
                    <h2 class="fw-bold text-dark m-0 mb-1" onclick="viewDetail(${b.id})" style="cursor: pointer; font-size: 1.65rem;">
                        ${b.title}
                    </h2>
                    
                    <div class="text-secondary mb-2" onclick="viewDetail(${b.id})" style="cursor: pointer; font-size: 0.95rem;">
                        ✍️ ${authorName}
                    </div>
                    
                    <p class="text-muted mb-2" onclick="viewDetail(${b.id})" 
                       style="cursor: pointer; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; font-size: 1rem; line-height: 1.5;">
                        ${b.content || 'Không có nội dung mô tả...'}
                    </p>
                    
                    <div class="d-flex align-items-center gap-3">
                        <span class="text-primary fw-semibold small" onclick="viewDetail(${b.id})" style="cursor: pointer;">
                            Read More →
                        </span>
                        
                        <div class="d-flex gap-2 opacity-75">
                            <span onclick="editBlog(${b.id})" style="cursor: pointer;" title="Sửa bài viết">
                                <i class="fas fa-edit text-warning"></i>
                            </span>
                            <span onclick="deleteBlog(${b.id})" style="cursor: pointer;" title="Xóa bài viết">
                                <i class="fas fa-trash-alt text-danger"></i>
                            </span>
                        </div>
                    </div>

                </div>
            </div>
        `;
    });
    showDiv.innerHTML = html;
}

// Hàm xem chi tiết bài viết tại chỗ (Ghi đè nội dung vào #show)
function viewDetail(id) {
    axios.get(`http://localhost:8080/api/blogs/${id}`)
        .then(res => {
            renderMyBlogDetail(res.data);
        })
        .catch(err => alert("Không thể tải chi tiết bài viết này!"));
}

// Hàm vẽ giao diện xem chi tiết
function renderMyBlogDetail(blog) {
    const showDiv = document.getElementById("show");

    // Bẫy dữ liệu an toàn cho cả thuộc tính 'users' hoặc 'user'
    const authorName = blog.users ? blog.users.name : (blog.user ? blog.user.name : "Unknown");

    showDiv.innerHTML = `
        <div class="col-12">
            <div class="bg-white p-4 p-md-5 rounded-3 shadow-sm border">
                <div class="mb-4">
                    <button class="btn btn-outline-secondary btn-sm fw-medium" onclick="loadMyBlogs()">
                        ← Quay lại danh sách của tôi
                    </button>
                </div>
                
                <h1 class="fw-bold text-dark mb-3">${blog.title}</h1>
                
                <div class="text-muted mb-4 pb-3 border-bottom fs-6">
                    <span>Tác giả: </span>
                    <strong class="text-primary">${authorName}</strong> 
                </div>
                
                <div class="fs-5 lh-lg text-secondary" style="white-space: pre-line;">
                    ${blog.content || 'Bài viết chưa có nội dung.'}
                </div>
            </div>
        </div>
    `;
}

// Hàm xử lý chức năng Xóa bài viết
function deleteBlog(id) {
    if (confirm("Bạn có chắc chắn muốn xóa bài viết này không? Hành động này không thể hoàn tác!")) {
        axios.delete(`http://localhost:8080/api/blogs/${id}`)
            .then(() => {
                alert("Xóa bài viết thành công!");
                loadMyBlogs(); // Tải lại danh sách sau khi xóa
            })
            .catch(err => alert("Lỗi khi xóa bài viết!"));
    }
}