const authorUser = JSON.parse(localStorage.getItem("user"));

// 1. HÀM KÍCH HOẠT: Biến đổi vùng #show thành Form tạo bài viết mới tại chỗ
function createBlog() {
    const showDiv = document.getElementById("show");

    // Đè giao diện form vào thẻ #show, dùng col-12 để form tràn rộng full màn hình
    showDiv.innerHTML = `
        <div class="col-12">
            <div class="card shadow-sm border rounded-3">
                <div class="card-header bg-dark text-white p-3">
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
                        <button onclick="cancelCreate()" class="btn btn-outline-secondary px-4 btn-sm">Hủy bỏ</button>
                        <button onclick="submitCreate()" class="btn btn-primary px-4 btn-sm fw-medium">Đăng bài viết</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// 2. HÀM SUBMIT: Thu thập dữ liệu và gửi request POST lên Backend API
function submitCreate() {
    const titleInput = document.getElementById("addTitle").value.trim();
    const contentInput = document.getElementById("addContent").value.trim();

    // Kiểm tra dữ liệu đầu vào
    if (!titleInput || !contentInput) {
        alert("Vui lòng điền đầy đủ tiêu đề và nội dung trước khi đăng!");
        return;
    }

    // Đóng gói dữ liệu (Có đính kèm object users làm tác giả nếu Backend yêu cầu mapping)
    const newBlogData = {
        title: titleInput,
        content: contentInput,
        users: authorUser ? { id: authorUser.id } : null // Gửi ID của user đang đăng nhập
    };

    // Gọi API lưu xuống database
    axios.post("http://localhost:8080/api/blogs", newBlogData)
        .then(res => {
            alert("Đăng bài viết mới thành công! 🎉");
            backToOldList(); // Đăng xong thì tự động quay lại danh sách bài viết
        })
        .catch(err => {
            console.error("Lỗi khi tạo bài viết:", err);
            alert("Đăng bài thất bại! Vui lòng kiểm tra lại cấu trúc dữ liệu Backend.");
        });
}

// 3. HÀM HỦY BỎ: Khi người dùng không muốn viết nữa
function cancelCreate() {
    backToOldList();
}

// 4. HÀM BỔ TRỢ: Tự động nhận diện trang để load lại danh sách tương ứng
function backToOldList() {
    // Kiểm tra xem hàm load danh sách của trang nào đang có sẵn thì gọi hàm đó
    if (typeof loadMyBlogs === 'function') {
        loadMyBlogs();   // Nếu bạn đang ở trang "Bài viết của tôi", nó sẽ nạp lại bài viết của bạn
    } else if (typeof loadHomeBlogs === 'function') {
        loadHomeBlogs(); // Nếu bạn đang ở "Trang chủ", nó sẽ nạp lại toàn bộ bài viết chung
    } else {
        window.location.reload(); // Phương án dự phòng cuối cùng nếu không tìm thấy hàm nào
    }
}