function viewDetail(id) {
    axios.get(`/api/blogs/${id}`)
        .then(res => {
            renderSingleBlog(res.data);
        })
        .catch(err => {
            console.error("Lỗi tải chi tiết bài viết:", err);
            alert("Không thể tải nội dung bài viết. Vui lòng thử lại!");
        });
}

function renderSingleBlog(blog) {
    const showDiv = document.getElementById("show");
    const authorName = blog.users ? blog.users.name : (blog.user ? blog.user.name : "Tác giả");

    showDiv.innerHTML = `
        <div class="col-12">
            <div class="bg-white p-4 p-md-5 rounded-4 shadow-sm border">
                
                <div class="mb-4">
                    <button class="btn btn-outline-secondary btn-sm px-3 rounded-pill" onclick="backToHomeList()">
                        ← Quay lại danh sách
                    </button>
                </div>
                
                <h1 class="fw-bold text-dark m-0 mb-3" style="font-size: 2.2rem; line-height: 1.3;">
                    ${escapeHtml(blog.title)}
                </h1>
                
                <div class="text-secondary mb-4 fs-6 d-flex align-items-center gap-2">
                    <span>✍️ Tác giả:</span>
                    <strong class="text-primary">${escapeHtml(authorName)}</strong>
                </div>
                
                <hr class="text-muted opacity-25 mb-4">
                
                <div class="text-secondary lh-lg fs-5" 
                     style="white-space: pre-line; word-break: break-word; color: #334155 !important;">
                    ${escapeHtml(blog.content || 'Bài viết này chưa có nội dung chi tiết.')}
                </div>
                
            </div>
        </div>
    `;
}

function backToHomeList() {
    axios.get("/api/blogs")
        .then(res => {
            render(res.data);
        })
        .catch(err => console.error("Lỗi khi quay lại danh sách:", err));
}
