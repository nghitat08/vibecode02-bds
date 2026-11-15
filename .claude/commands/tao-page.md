---
description: Tạo landing page hoàn chỉnh (HTML/CSS/JS thuần, responsive) theo mô tả
argument-hint: [mô tả trang, vd: "trang giới thiệu dự án căn hộ Quận 7"]
---
Tôi muốn tạo một landing page. Yêu cầu: $ARGUMENTS
(Nếu phần yêu cầu đang trống, hỏi tôi: trang nói về gì, cho ai xem, muốn người xem làm gì.)

## Bước 1: Explore (tìm hiểu)
- Đọc CLAUDE.md của dự án (nếu có) để theo đúng màu thương hiệu, font, quy ước đặt tên,
  định dạng giá/ngày và cấu trúc thư mục đã chốt.
- Nếu dự án chưa có quy ước: dùng mặc định bên dưới.

## Bước 2: Plan (chờ tôi duyệt)
Đưa tôi bản kế hoạch ngắn gồm:
- Tên thư mục trang (kebab-case) và danh sách tệp sẽ tạo
- Nội dung dự kiến của từng khu vực (tiêu đề, 3–6 ý chính, câu kêu gọi hành động)
- Màu chính, font, giọng văn sẽ dùng
- Các tương tác JavaScript sẽ có
Chờ tôi duyệt rồi mới viết code.

## Bước 3: Code
Cấu trúc tệp mặc định (nếu CLAUDE.md dự án chưa quy định khác):
```
<ten-trang>/
├── index.html
├── css/style.css
├── js/main.js
└── images/        (để trống nếu dùng ảnh online)
```
Bố cục bắt buộc, theo thứ tự:
1. Header: logo, menu (thu thành nút ☰ trên điện thoại), nút CTA chính
2. Banner giới thiệu (hero): tiêu đề lớn, mô tả ngắn, nút hành động, ảnh nền
3. Thông tin nổi bật: 3–4 con số / điểm mạnh dạng thẻ
4. Tiện ích / giá trị: lưới 4–6 thẻ có icon (emoji hoặc SVG viết tay)
5. Kêu gọi hành động / liên hệ: form (họ tên, số điện thoại, nhu cầu) + nút gọi/Zalo
6. Footer: thông tin liên hệ, liên kết

JavaScript tương tác cơ bản:
- Mở/đóng menu trên điện thoại; cuộn mượt tới từng khu vực
- Header đổi kiểu khi cuộn; hiệu ứng hiện dần khi khu vực xuất hiện (IntersectionObserver)
- Kiểm tra form (bắt buộc nhập, số điện thoại Việt Nam 10 số), báo lỗi ngay dưới ô
- Gửi form thành công thì hiện thông báo (chưa gửi đi đâu vì không có backend)

Quy tắc kỹ thuật:
- HTML + CSS + JavaScript thuần, không framework, không cài package.
  Chỉ tải Google Fonts và ảnh Unsplash / Picsum.
- Mobile-first; không vỡ ở 375px, 768px, 1200px; không cuộn ngang.
- Màu đặt thành biến trong :root. Mặc định nếu CLAUDE.md không quy định:
  đỏ #d7262f, font Be Vietnam Pro.
- HTML có ngữ nghĩa (header, main, section, footer), ảnh có alt, nút có nhãn rõ ràng.
- Mỗi tệp mở đầu bằng 2–3 dòng chú thích tiếng Việt; mỗi khối/hàm chính có chú thích
  làm gì và vì sao.
- Không đưa dữ liệu người dùng vào innerHTML khi chưa escape.
- Không tự thêm tính năng ngoài yêu cầu (đăng nhập, backend, thanh toán…).

## Bước 4: Verify (kiểm chứng)
- Mở trang thật, kiểm tra Console không có lỗi, chụp màn hình ở 375px và 1200px nếu có thể.
- Thử: bấm menu, cuộn tới khu vực, gửi form trống (phải báo lỗi), gửi form đúng.
- Báo cáo: danh sách tệp đã tạo, bằng chứng chạy thật, tóm tắt cách code hoạt động
  trong 3–5 dòng, và câu commit đề xuất (không tự commit).
