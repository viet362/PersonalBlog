function render(data) {
    let html = "";
    data.forEach(b => {
        const authorName = b.users ? b.users.name : (b.user ? b.user.name : "Unknown");

        html += `
            <div class="col-12 col-md-6 col-lg-4">
                <div class="mb-4 py-2">
                    
                    <h3 class="fw-bold text-dark m-0 mb-1" onclick="viewDetail(${b.id})" style="cursor: pointer; font-size: 1.75rem;">
                        ${b.title}
                    </h3>
                    
                    <div class="text-secondary mb-2" onclick="viewDetail(${b.id})" style="cursor: pointer; font-size: 0.95rem;">
                        ✍️ ${authorName}
                    </div>
                    
                    <p class="text-muted mb-2 text-break" onclick="viewDetail(${b.id})" 
                       style="cursor: pointer; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; line-height: 1.5;">
                        ${b.content || 'Không có nội dung mô tả...'}
                    </p>
                    
                    <div class="text-primary fw-semibold small" onclick="viewDetail(${b.id})" style="cursor: pointer;">
                        Read More →
                    </div>
                    
                </div>
            </div>
        `;
    });
    document.getElementById("show").innerHTML = html;
}