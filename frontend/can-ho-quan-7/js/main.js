/*
  Tương tác cho trang Loki Riverside – Quận 7:
  menu điện thoại, header đổi kiểu khi cuộn, hiệu ứng hiện dần, kiểm tra và gửi form liên hệ.
  Không dùng thư viện; chưa có backend nên form chỉ hiện thông báo, không gửi dữ liệu đi đâu.
*/

const $ = (selector) => document.querySelector(selector);

// ===== 1. Menu trên điện thoại =====
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

// ===== 2. Header đổ bóng khi cuộn =====
// Ở đầu trang header hòa vào hero; cuộn xuống thì có bóng để tách khỏi nội dung bên dưới.
const header = $("#siteHeader");
function updateHeader() { header.classList.toggle("scrolled", window.scrollY > 10); }
window.addEventListener("scroll", updateHeader, { passive: true }); // passive: báo trình duyệt không chặn cuộn → cuộn mượt hơn
updateHeader();

// ===== 3. Hiệu ứng hiện dần khi phần tử lọt vào màn hình =====
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

// ===== 4. Toast thông báo =====
let toastTimer;
function toast(message) {
  const t = $("#toast");
  t.textContent = message; // textContent (không phải innerHTML) để chữ người dùng nhập không thành mã HTML → chống XSS
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 3500);
}

// ===== 5. Kiểm tra form liên hệ =====
// Mỗi ô có 1 hàm kiểm tra, trả về chuỗi lỗi ("" nghĩa là hợp lệ). Gom vào 1 chỗ để dễ thêm ô mới.
const form = $("#leadForm");
const validators = {
  fullName: (v) => {
    if (!v) return "Vui lòng nhập họ và tên.";
    if (v.length < 2) return "Họ tên quá ngắn.";
    return "";
  },
  phone: (v) => {
    const digits = v.replace(/[\s.-]/g, ""); // cho phép người dùng gõ "0901 234 567" hoặc "0901.234.567"
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

// Kiểm tra khi rời ô (blur) để báo lỗi sớm; khi đang gõ lại ô đã lỗi thì cập nhật ngay để lỗi biến mất khi sửa đúng.
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
