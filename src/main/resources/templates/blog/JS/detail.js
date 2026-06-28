function viewDetail(id) {
    axios.get(`http://localhost:8080/api/blogs/${id}`)
        .then(res => {
            renderSingleBlog(res.data);
        })
        .catch(err => {
            console.error("Lỗi tải chi tiết:", err);
        });
}

function renderSingleBlog(blog) {
    const showDiv = document.getElementById("show");
    const authorName = blog.users ? blog.users.name : (blog.user ? blog.user.name : "Unknown");

    // col-12 giờ đây sẽ bung rộng tối đa 100% màn hình vì thẻ cha HTML đã được giải phóng
    showDiv.innerHTML = `
        <div class="col-12">
            <div class="py-2">
                
                <div class="mb-4">
                    <button class="btn btn-outline-secondary btn-sm px-3" onclick="backToHomeList()" style="border-radius: 20px;">
                        ← Quay lại danh sách
                    </button>
                </div>
                
                <h1 class="fw-bold text-dark m-0 mb-2" style="font-size: 2.5rem; word-break: break-all;">
                    ${blog.title}
                </h1>
                
                <div class="text-secondary mb-4 fs-6">
                    ✍️ <span>Tác giả: </span><strong class="text-dark">${authorName}</strong>
                </div>
                
                <hr class="text-muted opacity-25 mb-4">
                
                <div class="text-muted lh-lg" 
                     style="white-space: pre-line; font-size: 1.15rem; color: #4a4a4a !important; word-break: break-all; overflow-wrap: break-word;">
                    ${blog.content || 'Bài viết này chưa có nội dung chi tiết.'}
                </div>
                
            </div>
        </div>
    `;
}

// Hàm xử lý khi ấn nút "Quay lại trang chủ"
function backToHomeList() {
    axios.get("http://localhost:8080/api/blogs")
        .then(res => {
            render(res.data);
        })
        .catch(err => console.error("Lỗi khi quay lại danh sách:", err));
}