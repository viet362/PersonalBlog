function render(data) {
    const showDiv = document.getElementById("show");
    if (!data || data.length === 0) {
        showDiv.innerHTML = `
            <div class="col-12 text-center my-5 py-5 text-muted">
                <i class="fa-solid fa-folder-open fa-3x mb-3 text-secondary opacity-50"></i>
                <p class="fs-5">Chưa tìm thấy bài viết nào!</p>
            </div>`;
        return;
    }

    let html = "";
    data.forEach(b => {
        const authorName = b.users ? b.users.name : (b.user ? b.user.name : "Tác giả ẩn danh");
        html += `
            <div class="col-12 col-md-6 col-lg-4">
                <div class="blog-card p-4 d-flex flex-column justify-content-between">
                    <div>
                        <h3 class="fw-bold text-dark m-0 mb-2" onclick="viewDetail(${b.id})" style="cursor: pointer; font-size: 1.35rem; line-height: 1.4;">
                            ${escapeHtml(b.title)}
                        </h3>
                        <div class="text-secondary small mb-3" onclick="viewDetail(${b.id})" style="cursor: pointer;">
                            ✍️ <strong>${escapeHtml(authorName)}</strong>
                        </div>
                        <p class="text-muted mb-3" onclick="viewDetail(${b.id})" 
                           style="cursor: pointer; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; line-height: 1.6; font-size: 0.95rem;">
                            ${escapeHtml(b.content || 'Không có nội dung mô tả...')}
                        </p>
                    </div>
                    <div class="pt-3 border-top d-flex justify-content-between align-items-center">
                        <span class="text-primary fw-semibold small" onclick="viewDetail(${b.id})" style="cursor: pointer;">
                            Đọc chi tiết →
                        </span>
                    </div>
                </div>
            </div>
        `;
    });
    showDiv.innerHTML = html;
}

function escapeHtml(text) {
    if (!text) return "";
    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
