/*
  Tương tác cho trang Tin tức bất động sản – Loki Riverside:
  vẽ tin nổi bật / chuyên mục / tin mới từ data/news.js, menu điện thoại, header đổi kiểu khi cuộn,
  hiệu ứng hiện dần, kiểm tra và gửi form liên hệ (chưa có backend nên chỉ hiện thông báo).
*/

const $ = (selector) => document.querySelector(selector);

// ===== 0. Hàm tiện ích =====
// Escape chữ trước khi ghi vào innerHTML: biến < > & " ' thành ký tự vô hại.
// Dữ liệu tin hiện do mình tự viết, nhưng sau này có thể lấy từ API → escape ngay từ đầu để chống XSS.
function escapeHtml(text) {
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

// Đổi "2026-11-15" thành "15/11/2026" theo quy ước hiển thị ngày của dự án.
// Tách chuỗi thay vì dùng new Date() để tránh lệch ngày do múi giờ.
function formatDate(isoDate) {
  const [y, m, d] = isoDate.split("-");
  return `${d}/${m}/${y}`;
}

// Tra tên chuyên mục từ key (vd "chinh-sach" → "Chính sách")
const catLabel = (key) => (NEWS_CATEGORIES.find((c) => c.key === key) || { label: "Khác" }).label;

// ===== 1. Vẽ thẻ tin =====
// Cả thẻ là 1 link mở bài gốc ở tab mới (rel="noopener" để tab mới không điều khiển được trang mình).
function newsCardHtml(item) {
  return `
    <a class="news-card reveal${item.featured ? " is-featured" : ""}" href="${escapeHtml(item.url)}" target="_blank" rel="noopener">
      <img src="${escapeHtml(item.image)}" alt="Ảnh minh họa cho tin: ${escapeHtml(item.title)}" loading="lazy" width="600" height="375" />
      <div class="news-body">
        <div class="news-meta">
          <span class="news-tag">${escapeHtml(catLabel(item.cat))}</span>
          <time datetime="${escapeHtml(item.date)}">${formatDate(escapeHtml(item.date))}</time>
        </div>
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.summary)}</p>
        <span class="news-more">Đọc bài gốc trên VnExpress ↗</span>
      </div>
    </a>`;
}

// Tin mới nhất lên đầu. So sánh chuỗi yyyy-mm-dd được luôn vì định dạng này sắp theo thứ tự chữ cũng đúng thứ tự ngày.
const byNewest = (a, b) => b.date.localeCompare(a.date) || b.id - a.id;

function renderNews() {
  const featured = NEWS.filter((n) => n.featured).sort(byNewest);
  const latest = NEWS.filter((n) => !n.featured).sort(byNewest);
  $("#featuredList").innerHTML = featured.map(newsCardHtml).join("");
  $("#newsList").innerHTML = latest.map(newsCardHtml).join("");
}

// ===== 2. Vẽ thẻ chuyên mục =====
// Mỗi thẻ hiện icon, tên, mô tả và số tin thuộc chuyên mục đó; bấm vào thì cuộn xuống khu Tin mới.
function renderCategories() {
  $("#catList").innerHTML = NEWS_CATEGORIES.map((cat) => {
    const count = NEWS.filter((n) => n.cat === cat.key).length;
    return `
      <a class="feature reveal" href="#tin-moi">
        <span class="feature-icon" aria-hidden="true">${escapeHtml(cat.icon)}</span>
        <h3>${escapeHtml(cat.label)}</h3>
        <p>${escapeHtml(cat.desc)}</p>
        <span class="feature-count">${count} tin</span>
      </a>`;
  }).join("");
}

// Vẽ trước, rồi mới gắn hiệu ứng hiện dần (mục 5) để các thẻ vừa vẽ cũng có hiệu ứng.
renderNews();
renderCategories();

// ===== 3. Menu trên điện thoại =====
// Bấm ☰ để mở/đóng; bấm một mục trong menu thì tự đóng để người dùng thấy nội dung vừa cuộn tới.
const menuToggle = $("#menuToggle");
const nav = $("#nav");

function setMenu(open) {
  nav.classList.toggle("open", open);
  menuToggle.setAttribute("aria-expanded", String(open)); // CSS dựa vào thuộc tính này để vẽ dấu ✕
  menuToggle.setAttribute("aria-label", open ? "Đóng menu" : "Mở menu");
}

menuToggle.addEventListener("click", () => setMenu(!nav.classList.contains("open")));
nav.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
// Phím Esc đóng menu: tiện cho người dùng bàn phím
document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });

// ===== 4. Header đổ bóng khi cuộn =====
// Ở đầu trang header hòa vào hero; cuộn xuống thì có bóng để tách khỏi nội dung bên dưới.
const header = $("#siteHeader");
function updateHeader() { header.classList.toggle("scrolled", window.scrollY > 10); }
window.addEventListener("scroll", updateHeader, { passive: true }); // passive: không chặn cuộn → cuộn mượt hơn
updateHeader();

// ===== 5. Hiệu ứng hiện dần khi phần tử lọt vào màn hình =====
// Dùng IntersectionObserver thay vì tính toán trong sự kiện scroll vì nhẹ hơn nhiều.
// Trình duyệt quá cũ không hỗ trợ thì hiện luôn mọi thứ, không để nội dung bị ẩn.
const revealEls = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      observer.unobserve(entry.target); // chỉ chạy hiệu ứng 1 lần
    });
  }, { threshold: 0.15 });
  revealEls.forEach((el) => observer.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("visible"));
}

// ===== 6. Toast thông báo =====
let toastTimer;
function toast(message) {
  const t = $("#toast");
  t.textContent = message; // textContent (không phải innerHTML) để chữ người dùng nhập không thành mã HTML → chống XSS
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 3500);
}

// ===== 7. Kiểm tra form liên hệ =====
// Mỗi ô có 1 hàm kiểm tra, trả về chuỗi lỗi ("" nghĩa là hợp lệ). Gom vào 1 chỗ để dễ thêm ô mới.
const form = $("#leadForm");
const validators = {
  fullName: (v) => {
    if (!v) return "Vui lòng nhập họ và tên.";
    if (v.length < 2) return "Họ tên quá ngắn.";
    return "";
  },
  phone: (v) => {
    const digits = v.replace(/[\s.-]/g, ""); // cho phép gõ "0901 234 567" hoặc "0901.234.567"
    if (!digits) return "Vui lòng nhập số điện thoại.";
    if (!/^0\d{9}$/.test(digits)) return "Số điện thoại cần 10 chữ số, bắt đầu bằng 0.";
    return "";
  },
};

// Kiểm tra 1 ô, hiện/xóa lỗi ngay dưới ô đó. Trả về true nếu hợp lệ.
function validateField(name) {
  const input = form.elements[name];
  const message = validators[name](input.value.trim());
  $(`#${name}Error`).textContent = message;
  input.closest(".field").classList.toggle("invalid", Boolean(message));
  input.setAttribute("aria-invalid", String(Boolean(message)));
  return !message;
}

// Kiểm tra khi rời ô (blur) để báo lỗi sớm; khi gõ lại ô đang lỗi thì cập nhật ngay để lỗi biến mất khi sửa đúng.
Object.keys(validators).forEach((name) => {
  const input = form.elements[name];
  input.addEventListener("blur", () => validateField(name));
  input.addEventListener("input", () => {
    if (input.closest(".field").classList.contains("invalid")) validateField(name);
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault(); // chặn tải lại trang vì chưa có backend nhận dữ liệu
  const results = Object.keys(validators).map(validateField); // kiểm tra TẤT CẢ ô để hiện hết lỗi 1 lần
  if (results.includes(false)) {
    form.querySelector(".invalid input").focus(); // đưa con trỏ tới ô lỗi đầu tiên
    return;
  }
  const name = form.elements.fullName.value.trim();
  toast(`Cảm ơn ${name}! Chúng tôi sẽ gọi lại cho bạn trong 15 phút.`);
  form.reset();
});
