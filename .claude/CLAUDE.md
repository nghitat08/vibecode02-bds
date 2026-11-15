# CLAUDE.md: Loki_Home (dự án nhà đất)
<!-- Tệp này lưu quy tắc và kiến trúc dự án để Claude đọc mỗi buổi làm việc. -->

## 1. Dự án là gì
- **Tên dự án:** Loki_Home: trang chủ mua bán, cho thuê nhà đất toàn quốc
- **Mô tả:** Landing page bất động sản giúp người xem tìm, lọc và sắp xếp tin đăng
  bán/cho thuê; dữ liệu là dữ liệu minh họa.
- **Người dùng chính:** người mua/thuê nhà 25–45 tuổi, xem chủ yếu trên điện thoại
- **Mục tiêu chính:** người xem tìm được tin phù hợp và bấm "📞 Gọi" người đăng.

## 2. Phạm vi
- **Phải có (MVP):**
  - Danh sách tin đăng (thẻ tin: ảnh, giá, diện tích, vị trí, nút Gọi)
  - Tìm kiếm + bộ lọc: Bán/Thuê, từ khóa, danh mục, tỉnh/thành, giá, diện tích, phòng ngủ
  - Sắp xếp: mới nhất, giá tăng/giảm, diện tích
  - Hiển thị tốt trên điện thoại (375px)
- **Chưa làm ở giai đoạn này (AI không tự làm khi chưa được yêu cầu):**
  đăng nhập/đăng ký, đăng tin thật, backend/API, thanh toán, bản đồ, chat,
  trang chi tiết tin, phân trang, lưu yêu thích vào localStorage.
- **Tham khảo:** bản gốc một tệp tại `../index.html`, mô tả chi tiết tại `../README.md`.

## 3. Tiêu chí "xong"
- [ ] Mở `frontend/index.html` không có lỗi trong Console
- [ ] Lọc theo khoảng giá / danh mục trả đúng số tin
- [ ] Sắp xếp đúng thứ tự cho cả 4 kiểu
- [ ] Hiển thị không vỡ ở màn hình 375px, 820px, 1200px
- [ ] Khi không có kết quả: hiện thông báo + liên kết "xóa bộ lọc"

## 4. Công nghệ
- **Giao diện:** HTML + CSS + JavaScript thuần (Vanilla JS ES6+), không framework
- **Backend:** không có
- **Cơ sở dữ liệu:** dữ liệu giả trong `data/*.js`
- **Thư viện được phép dùng:** không dùng thư viện ngoài.
  Chỉ tải font Google Fonts (Be Vietnam Pro) và ảnh Unsplash/Pexels/Picsum.

## 5. Cấu trúc thư mục
```
day_1_realestate/
├── .claude/
│   └── CLAUDE.md        quy tắc + kiến trúc (tệp này)
├── frontend/
│   ├── index.html       khung trang
│   ├── css/style.css    toàn bộ giao diện, biến màu trong :root
│   ├── js/app.js        state → render → sự kiện
│   └── images/          ảnh tĩnh (logo, icon)
├── data/
│   └── listings.js      CATEGORIES, LISTINGS, PROJECTS, NEWS, PROVINCES
├── docs/
│   └── progress.md      nhật ký từng buổi
├── .gitignore
└── README.md
```

### Kiến trúc JavaScript
Luồng một chiều: **mọi giao diện động đều vẽ lại từ `state`**, không sửa DOM lẻ tẻ.
```
Người dùng thao tác → cập nhật `state` (readForm / syncForm)
  → renderAll() = renderCats() + renderPriceQuick() + renderListings()
  → filtered() lọc + sắp xếp LISTINGS theo state → ghi innerHTML
```
- `state = { type, q, cat, city, price, area, bed, dir, sort }`
- Khoảng giá/diện tích lưu dạng chuỗi `"min-max"`, so sánh `min ≤ v < max`
- Giá bán đơn vị **tỷ**, giá thuê đơn vị **triệu/tháng**; `priceValue()` quy về tỷ để so sánh
- Sự kiện gắn trên phần tử cha (event delegation) để vẫn chạy sau mỗi lần render lại

## 6. Quy ước
- **Ngôn ngữ giao diện:** tiếng Việt
- **Code & comment:** tên biến tiếng Anh, comment tiếng Việt
- **Đặt tên:** tệp kebab-case (`listing-card.js`), biến/hàm camelCase,
  hằng số dữ liệu UPPER_CASE (`LISTINGS`)
- **Hiển thị dữ liệu:** giá `799 triệu` / `4,2 tỷ` / `20,5 triệu/tháng`; ngày dd/mm/yyyy;
  diện tích `78 m²`
- **Thương hiệu:** đỏ `#d7262f` (chính), cam `#f5a623` (nhấn), chữ `#1f2430`;
  font Be Vietnam Pro; giọng thân thiện, ngắn gọn
- **Bảo mật:** dữ liệu từ người dùng/API phải escape trước khi đưa vào innerHTML (chống XSS)
- **Commit:** tiếng Việt, ngắn gọn, mỗi commit một việc: "thêm bộ lọc giá"

## 7. Lệnh hay dùng
- **Chạy dự án:** mở `frontend/index.html` bằng Live Server
  (hoặc `python -m http.server 5500` rồi vào http://localhost:5500/frontend/)
- **Chạy test:** chưa có
- **Dựng lại dữ liệu:** không áp dụng

## 8. Cách làm việc với tôi
- Luôn theo 4 bước: **Explore → Plan → Code → Verify**.
- Trước khi sửa code: đưa kế hoạch từng bước và **chờ tôi duyệt**.
- Làm từng bước, xong mỗi bước báo đã đụng vào tệp nào.
- Báo "xong" phải kèm bằng chứng chạy thật (Console, ảnh chụp).
- Chưa rõ thì hỏi lại, không tự đoán.
- Giải thích bằng tiếng Việt đơn giản; tôi mới học code, có nền marketing/phân tích dữ liệu.

## 9. Không được làm
- Không xóa dữ liệu hoặc tệp khi chưa hỏi.
- Không cài thêm package khi chưa hỏi.
- Không sửa tệp ngoài phạm vi việc đang làm (kể cả `../index.html` bản gốc).
- Không đưa mật khẩu, API key vào code (dùng `.env`, đã có trong `.gitignore`).
- Không thêm framework (React, Vue, Tailwind…) khi chưa được yêu cầu.

## 10. Trạng thái hiện tại
- **Đã xong:** bản một tệp `../index.html` chạy được; đã tạo cấu trúc thư mục này.
- **Đang làm:** thiết lập CLAUDE.md.
- **Việc tiếp theo:** tách `../index.html` thành `frontend/index.html`,
  `css/style.css`, `js/app.js` và `data/listings.js`.
- **Ghi chú buổi trước:** xem `docs/progress.md`
