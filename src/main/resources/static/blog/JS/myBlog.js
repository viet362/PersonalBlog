function loadMyBlogs() {
    window.currentTab = 'myBlogs';
    const currentUser = JSON.parse(localStorage.getItem("user"));
    if (!currentUser) {
        if (confirm("Vui lòng đăng nhập để xem bài viết của bạn!")) {
            window.location.href = "/index.html";
        }
        return;
    }

    // Cập nhật tab active trên navbar
    document.querySelectorAll('.navbar-nav .nav-link').forEach(el => el.classList.remove('active'));
    const myBlogTab = document.getElementById('navMyBlogs');
    if (myBlogTab) myBlogTab.classList.add('active');

    // Gọi API lấy bài viết theo user id
    axios.get(`/api/blogs/search/user/${currentUser.id}`)
        .then(res => {
            renderMyList(res.data);
        })
        .catch(err => {
            console.warn("Lỗi API search by user, fallback lấy tất cả và lọc:", err);
            axios.get("/api/blogs")
                .then(res => {
                    const myBlogs = res.data.filter(b => b.users && b.users.id === currentUser.id);
                    renderMyList(myBlogs);
                })
                .catch(e => console.error("Lỗi tải bài viết:", e));
        });
}

function renderMyList(data) {
    const showDiv = document.getElementById("show");

    if (!data || data.length === 0) {
        showDiv.innerHTML = `
          <div class="col-12 text-center my-5 py-5 text-muted">
            <i class="fa-solid fa-pen-to-square fa-3x mb-3 text-secondary opacity-50"></i>
            <p class="fs-5">Bạn chưa có bài viết nào cả!</p>
            <button class="btn btn-primary btn-sm px-3 mt-2" onclick="createBlog()">Viết bài đầu tiên ngay</button>
          </div>`;
        return;
    }

    let html = "";
    data.forEach(b => {
        const authorName = b.users ? b.users.name : (b.user ? b.user.name : "Steven Bui");

        html += `
            <div class="col-12 col-md-6 col-lg-4">
                <div class="blog-card p-4 d-flex flex-column justify-content-between">
                    <div>
                        <h3 class="fw-bold text-dark m-0 mb-2" onclick="viewDetail(${b.id})" style="cursor: pointer; font-size: 1.35rem; line-height: 1.4;">
                            ${escapeHtml(b.title)}
                        </h3>
                        
                        <div class="text-secondary small mb-3">
                            ✍️ <strong>${escapeHtml(authorName)}</strong> (Của bạn)
                        </div>
                        
                        <p class="text-muted mb-3" onclick="viewDetail(${b.id})" 
                           style="cursor: pointer; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; line-height: 1.6; font-size: 0.95rem;">
                            ${escapeHtml(b.content || 'Không có nội dung mô tả...')}
                        </p>
                    </div>
                    
                    <div class="pt-3 border-top d-flex align-items-center justify-content-between">
                        <span class="text-primary fw-semibold small" onclick="viewDetail(${b.id})" style="cursor: pointer;">
                            Xem chi tiết →
                        </span>
                        
                        <div class="d-flex gap-3">
                            <span onclick="editBlog(${b.id})" style="cursor: pointer;" title="Sửa bài viết" class="text-warning fs-6">
                                <i class="fas fa-edit"></i> Sửa
                            </span>
                            <span onclick="deleteBlog(${b.id})" style="cursor: pointer;" title="Xóa bài viết" class="text-danger fs-6">
                                <i class="fas fa-trash-alt"></i> Xóa
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
    showDiv.innerHTML = html;
}

function deleteBlog(id) {
    if (confirm("Bạn có chắc chắn muốn xóa bài viết này không? Thao tác này không thể hoàn tác!")) {
        axios.delete(`/api/blogs/${id}`)
            .then(() => {
                alert("Xóa bài viết thành công! 🗑️");
                loadMyBlogs();
            })
            .catch(err => {
                console.error("Lỗi khi xóa bài viết:", err);
                alert("Lỗi khi xóa bài viết! Vui lòng thử lại.");
            });
    }
}
