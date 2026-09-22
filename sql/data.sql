-- Active: 1785914295113@@mysql-22176-buivietbacn01-1ff7.a.aivencloud.com@10055@personal-blog
-- =======================================================
-- Seed Data for Personal Blog
-- =======================================================

USE `personal-blog`;

-- Xóa dữ liệu cũ nếu có (thêm WHERE 1 = 1 để tránh cảnh báo Safe Mode)
DELETE FROM `blog` WHERE 1 = 1;

DELETE FROM `users` WHERE 1 = 1;

-- Reset auto-increment
ALTER TABLE `users` AUTO_INCREMENT = 1;

ALTER TABLE `blog` AUTO_INCREMENT = 1;

INSERT INTO
    `users` (
        `id`,
        `username`,
        `password`,
        `name`
    )
VALUES (
        1,
        'steven.bui',
        '123',
        'Steven Bui'
    ),
    (
        2,
        'admin',
        '123',
        'Quản trị viên'
    ),
    (
        3,
        'techlead',
        '123',
        'Alex Nguyễn'
    );

-- 2. Khởi tạo các bài viết blog chuyên sâu cho CV
INSERT INTO
    `blog` (
        `id`,
        `title`,
        `content`,
        `user_id`
    )
VALUES (
        1,
        'Xây dựng Kiến trúc Backend hiện đại với Spring Boot 3 & Clean Architecture',
        'Trong quá trình phát triển các hệ thống phần mềm quy mô lớn, việc duy trì mã nguồn sạch và dễ mở rộng là thách thức hàng đầu đối với mỗi kỹ sư phần mềm.

Kiến trúc Clean Architecture giúp phân tách rõ ràng trách nhiệm giữa các tầng: Domain Layer, Use Cases, Data Access và Presentation Layer. Với Spring Boot 3, việc tận dụng tối đa Dependency Injection, Spring Data JPA cùng các nguyên lý SOLID mang lại sự linh hoạt tuyệt đối khi cần thay đổi cơ sở dữ liệu hoặc tích hợp thêm dịch vụ của bên thứ ba.

Một số điểm cốt lõi cần lưu ý:
1. Độc lập với framework: Logic nghiệp vụ không nên phụ thuộc chặt chẽ vào thư viện bên ngoài.
2. Dễ dàng viết Unit Test & Mocking: Nhờ phân chia interface và repository rõ ràng.
3. Khả năng bảo trì vượt trội khi dự án mở rộng hàng chục nghìn dòng code.',
        1
    ),
    (
        2,
        'Tối ưu hóa Database Query & Connection Pool với HikariCP trong Cloud Environment',
        'Khi triển khai ứng dụng Spring Boot lên các nền tảng Cloud như Render kết hợp cùng cơ sở dữ liệu đám mây Aiven MySQL, độ trễ mạng (Network Latency) và số lượng kết nối đồng thời là bài toán cực kỳ quan trọng.

Để ứng dụng duy trì hiệu năng cao:
- Cấu hình HikariCP tối ưu: Đặt maximum-pool-size phù hợp với cấu hình RAM/CPU của server, kích hoạt connection-timeout và idle-timeout hợp lý.
- Đánh chỉ mục (Indexing) thông minh: Luôn đánh chỉ mục trên các cột thường xuyên tìm kiếm như username, title, author.
- Giảm thiểu bài toán N+1 Queries: Sử dụng JOIN FETCH hoặc EntityGraph trong Spring Data JPA để tối ưu số lần truy vấn.

Kết quả đo lường thực tế cho thấy thời gian phản hồi (P95 Response Time) giảm hơn 60% sau khi tinh chỉnh connection pool và tối ưu hóa index.',
        1
    ),
    (
        3,
        'Hành trình triển khai CI/CD và Containerization với Docker lên Render Cloud',
        'Triển khai ứng dụng tự động (Continuous Deployment) là kỹ năng không thể thiếu của một kỹ sư phần mềm hiện đại. Trong dự án Personal Blog này:

- Multi-stage Docker Build: Giai đoạn 1 sử dụng Eclipse Temurin JDK để build và đóng gói file JAR với Gradle; Giai đoạn 2 chỉ dùng Temurin JRE siêu nhẹ để giảm kích thước image xuống dưới 180MB.
- Thiết lập biến môi trường động: Biến $PORT và connection string tới Aiven Cloud Database được inject tự động qua Dashboard của Render.
- Zero Downtime Deployment: Ứng dụng tự động kiểm tra Health Check trước khi chuyển hướng lưu lượng truy cập thực tế.

Nhờ kiến trúc này, toàn bộ quá trình từ khi lập trình viên git push lên nhánh demo đến khi bản cập nhật xuất hiện trên môi trường Production chỉ mất chưa tới 2 phút.',
        1
    ),
    (
        4,
        'Thiết kế RESTful API chuẩn mực: Từ Spec đến Implementation',
        'Một hệ thống API tốt cần tuân thủ các nguyên tắc thiết kế RESTful rõ ràng:
1. Danh từ số nhiều cho Endpoint (/api/blogs, /api/users).
2. Sử dụng đúng HTTP Methods: GET (truy vấn), POST (tạo mới), PUT (cập nhật toàn phần), PATCH (cập nhật một phần), DELETE (xóa).
3. Sử dụng đúng HTTP Status Codes: 200 OK, 201 Created, 204 No Content, 400 Bad Request, 401 Unauthorized, 404 Not Found.
4. Xử lý Exception tập trung qua @ControllerAdvice và @ExceptionHandler để trả về định dạng JSON lỗi đồng nhất cho Client.

Việc tuân thủ quy chuẩn này giúp team Frontend và Mobile dễ dàng tích hợp mà không gặp phải bất kỳ sự hiểu nhầm nào về mặt dữ liệu.',
        3
    ),
    (
        5,
        'Chiến lược quản lý State và Tối ưu trải nghiệm Frontend cho Blog Platform',
        'Mặc dù là một kiến trúc Monolith tích hợp trực tiếp Frontend vào Spring Boot, việc tối ưu trải nghiệm tương tác (UX/UI) vẫn được đặt lên hàng đầu.

- Sử dụng cơ chế Single Page Interaction cho các thao tác Tạo, Sửa, Xem chi tiết và Xóa bài viết tại chỗ thông qua Dynamic DOM Rendering.
- Tận dụng LocalStorage để lưu trữ phiên làm việc người dùng gọn nhẹ.
- Xử lý tìm kiếm đa tiêu chí mượt mà: Tìm kiếm theo tiêu đề bài viết, tên tác giả hoặc nội dung chi tiết.
- Thiết kế Responsive hoàn chỉnh tương thích từ màn hình điện thoại di động đến máy tính để bàn.',
        2
    );