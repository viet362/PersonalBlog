# =========================================================
# Multi-stage Dockerfile for Spring Boot 3 & Java 21 (Render)
# Tối ưu dung lượng nhẹ (<180MB) và RAM cho Render Free Tier
# =========================================================

# Stage 1: Build JAR bằng Gradle
FROM eclipse-temurin:21-jdk-alpine AS builder
WORKDIR /app

# Copy gradle wrapper và file cấu hình trước để tận dụng Docker Cache
COPY gradlew .
COPY gradle gradle
COPY build.gradle settings.gradle ./

RUN chmod +x gradlew

# Copy toàn bộ mã nguồn và build file bootJar (bỏ qua test khi build container)
COPY src src
RUN ./gradlew bootJar --no-daemon -x test

# Stage 2: Runtime Image siêu nhẹ
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Tạo non-root user nhằm tăng tính bảo mật chuẩn Production
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Copy file jar đã build từ builder stage
COPY --from=builder /app/build/libs/*.jar app.jar

# Render tự động gán biến PORT (mặc định 8080 nếu chạy local)
ENV PORT=8080
EXPOSE 8080

# Cấu hình tối ưu RAM 75% cho container để không bị tràn RAM (OOM) trên Render 512MB
ENTRYPOINT ["sh", "-c", "java -XX:+UseContainerSupport -XX:MaxRAMPercentage=75.0 -Dserver.port=${PORT} -jar app.jar"]
