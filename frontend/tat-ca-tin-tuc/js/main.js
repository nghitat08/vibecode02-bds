/*
  Tương tác cho trang "Tất cả tin tức" – Loki_Home:
  gộp NEWS (tin VnExpress) + LOKI_NEWS (tin minh họa) thành 1 danh sách mới nhất lên đầu rồi vẽ ra lưới;
  kèm menu điện thoại, header đổ bóng khi cuộn, hiệu ứng hiện dần.
*/

const $ = (selector) => document.querySelector(selector);

// ===== 0. Hàm tiện ích =====
// Escape chữ trước khi ghi vào innerHTML để chống XSS (phòng khi sau này dữ liệu lấy từ API).
function escapeHtml(text) {
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

// "2026-11-15" → "15/11/2026". Tách chuỗi thay vì new Date() để không lệch ngày do múi giờ.
function formatDate(isoDate) {
  const [y, m, d] = isoDate.split("-");
  return `${d}/${m}/${y}`;
}

const catLabel = (key) => (NEWS_CATEGORIES.find((c) => c.key === key) || { label: "Khác" }).label;

// ===== 1. Gộp 2 nguồn tin =====
// Gắn thêm trường source để biết tin nào có bài gốc (VnExpress) và tin nào là minh họa.
// Sắp xếp theo ngày giảm dần; chuỗi yyyy-mm-dd so sánh theo thứ tự chữ là đúng thứ tự ngày.
const allNews = [
  ...NEWS.map((n) => ({ ...n, source: "vnexpress" })),
  ...LOKI_NEWS.map((n) => ({ ...n, source: "minh-hoa" })),
].sort((a, b) => b.date.localeCompare(a.date) || b.id - a.id);

// ===== 2. Vẽ 1 thẻ tin =====
// Tin VnExpress: cả thẻ là link mở bài gốc ở tab mới.
// Tin minh họa: không có bài gốc nên dùng <article> (không bấm được), tránh link chết.
function cardHtml(item) {
  const isReal = item.source === "vnexpress";
  const inner = `
      <img src="${escapeHtml(item.image)}" alt="Ảnh minh họa cho tin: ${escapeHtml(item.title)}" loading="lazy" width="600" height="375" />
      <div class="news-body">
        <div class="news-meta">
          <span class="news-tag">${escapeHtml(catLabel(item.cat))}</span>
          <span class="news-source">${isReal ? "VnExpress" : "Minh họa"}</span>
          <time datetime="${escapeHtml(item.date)}">${formatDate(escapeHtml(item.date))}</time>
        </div>
        <h3>${escapeHtml(item.title)}</h3>
        ${item.summary ? `<p>${escapeHtml(item.summary)}</p>` : ""}
        ${isReal
          ? `<span class="news-more">Đọc bài gốc trên VnExpress ↗</span>`
          : `<span class="news-more is-muted">Tin minh họa – chưa có bài chi tiết</span>`}
      </div>`;
  return isReal
    ? `<a class="news-card reveal" href="${escapeHtml(item.url)}" target="_blank" rel="noopener">${inner}</a>`
    : `<article class="news-card reveal">${inner}</article>`;
}

$("#allNews").innerHTML = allNews.map(cardHtml).join("");
$("#newsCount").textContent = `${allNews.length} tin · mới nhất lên đầu`;

// ===== 3. Menu trên điện thoại =====
// Bấm ☰ để mở/đóng; bấm 1 mục thì tự đóng; Esc cũng đóng (tiện cho người dùng bàn phím).
const menuToggle = $("#menuToggle");
const nav = $("#nav");

function setMenu(open) {
  nav.classList.toggle("open", open);
  menuToggle.setAttribute("aria-expanded", String(open)); // CSS dựa vào thuộc tính này để vẽ dấu ✕
  menuToggle.setAttribute("aria-label", open ? "Đóng menu" : "Mở menu");
}

menuToggle.addEventListener("click", () => setMenu(!nav.classList.contains("open")));
nav.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });

// ===== 4. Header đổ bóng khi cuộn: tách header khỏi nội dung bên dưới =====
const header = $("#siteHeader");
function updateHeader() { header.classList.toggle("scrolled", window.scrollY > 10); }
window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

// ===== 5. Hiệu ứng hiện dần (IntersectionObserver nhẹ hơn tự tính trong sự kiện scroll) =====
// Trình duyệt cũ không hỗ trợ thì hiện luôn, không để nội dung bị ẩn.
const revealEls = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.15 });
  revealEls.forEach((el) => observer.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("visible"));
}
