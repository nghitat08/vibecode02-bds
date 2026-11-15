/*
  Dữ liệu tin tức bất động sản cho trang frontend/tin-tuc/.
  Tiêu đề và link lấy từ VnExpress (chuyên mục Bất động sản, ngày 13–15/11/2026); phần tóm tắt do Loki_Home tự viết lại,
  chuyên mục do Loki_Home tự phân loại. Ảnh là ảnh minh họa từ Unsplash (không phải ảnh của bài gốc, tránh vi phạm bản quyền).
*/

// Danh sách chuyên mục: key dùng trong dữ liệu, label/icon/desc để vẽ thẻ chuyên mục.
const NEWS_CATEGORIES = [
  { key: "thi-truong", label: "Thị trường", icon: "📈", desc: "Giá cả, thanh khoản và xu hướng mua bán nhà đất." },
  { key: "chinh-sach", label: "Chính sách", icon: "⚖️", desc: "Luật, quy định, thuế phí liên quan đến đất đai." },
  { key: "du-an", label: "Dự án", icon: "🏗️", desc: "Dự án mới mở bán, tiến độ và chương trình ưu đãi." },
  { key: "khong-gian-song", label: "Không gian sống", icon: "🏠", desc: "Nhà đẹp, kiến trúc và cách bố trí không gian." },
  { key: "tu-van", label: "Tư vấn", icon: "💡", desc: "Mẹo mua, thuê và thiết kế nhà cho từng nhu cầu." },
  { key: "kinh-te-vung", label: "Kinh tế vùng", icon: "🗺️", desc: "Quy hoạch, đấu giá đất và phát triển đô thị địa phương." },
];

// Danh sách tin. featured: true = hiện ở khu "Tin nổi bật"; còn lại hiện ở khu "Tin mới".
// date dạng yyyy-mm-dd để dễ sắp xếp; JS sẽ đổi sang dd/mm/yyyy khi hiển thị.
const NEWS = [
  {
    id: 1, featured: true, cat: "chinh-sach", date: "2026-11-15",
    title: "TP HCM đề xuất tăng thời gian miễn tiền thuê đất cho nhiều dự án",
    summary: "Nhiều nhóm dự án bất động sản và hạ tầng có thể được miễn tiền thuê đất lâu hơn, từ 5 năm cho tới hết thời hạn dự án.",
    url: "https://vnexpress.net/tp-hcm-de-xuat-tang-thoi-gian-mien-tien-thue-dat-cho-nhieu-du-an-5144811.html",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=70",
  },
  {
    id: 2, featured: true, cat: "thi-truong", date: "2026-11-15",
    title: "'Hoa hồng cao' không còn là ưu tiên của môi giới bất động sản",
    summary: "Giao dịch chậm khiến môi giới quan tâm hơn tới khả năng bán được hàng và uy tín chủ đầu tư, thay vì chỉ nhìn mức hoa hồng.",
    url: "https://vnexpress.net/hoa-hong-cao-khong-con-la-uu-tien-cua-moi-gioi-bat-dong-san-5143938.html",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=70",
  },
  {
    id: 3, featured: true, cat: "du-an", date: "2026-11-14",
    title: "Phú Mỹ Hưng sắp ra mắt căn hộ cao cấp The Aristo",
    summary: "Dự án căn hộ mới nằm ở mặt tiền đường Nguyễn Lương Bằng, khu Nam Viên, gần các tiện ích sẵn có của Phú Mỹ Hưng.",
    url: "https://vnexpress.net/phu-my-hung-sap-ra-mat-can-ho-cao-cap-the-aristo-5144487.html",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=70",
  },
  {
    id: 4, featured: false, cat: "khong-gian-song", date: "2026-11-15",
    title: "Biệt thự 500 m2 'giấu' bể bơi giữa nhà sau mặt tiền kín",
    summary: "Các phòng sinh hoạt quay vào một sân trong có bể bơi, còn mặt tiền dùng lam ngang và cây xanh để giữ riêng tư.",
    url: "https://vnexpress.net/biet-thu-500-m2-giau-be-boi-giua-nha-sau-mat-tien-kin-5144827.html",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=70",
  },
  {
    id: 5, featured: false, cat: "kinh-te-vung", date: "2026-11-14",
    title: "Huế tính mở rộng trường học, công viên, chỉnh trang đô thị trung tâm",
    summary: "Khu trung tâm TP Huế có thể được bổ sung trường học, công viên và bãi đỗ xe trong kế hoạch chỉnh trang đô thị.",
    url: "https://vnexpress.net/hue-tinh-mo-rong-truong-hoc-cong-vien-chinh-trang-do-thi-trung-tam-5144622.html",
    image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&q=70",
  },
  {
    id: 6, featured: false, cat: "khong-gian-song", date: "2026-11-14",
    title: "Cách kiến trúc sư Pháp sử dụng vật liệu đá trong thiết kế The Legatus",
    summary: "Kiến trúc sư Jean-François Milou phối hợp đá tự nhiên với ánh sáng và hình khối để tạo nét riêng cho công trình.",
    url: "https://vnexpress.net/cach-kien-truc-su-phap-su-dung-vat-lieu-da-trong-thiet-ke-the-legatus-5144695.html",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=70",
  },
  {
    id: 7, featured: false, cat: "kinh-te-vung", date: "2026-11-14",
    title: "Đấu giá hơn 2,5 ha đất làm khu nhà ở, thương mại dịch vụ tại Vỹ Dạ",
    summary: "Khu đất trước Nhà thi đấu Bà Triệu (phường Vỹ Dạ, TP Huế) sẽ được đưa ra đấu giá để làm nhà ở và thương mại dịch vụ.",
    url: "https://vnexpress.net/dau-gia-hon-2-5-ha-dat-lam-khu-nha-o-thuong-mai-dich-vu-tai-vy-da-5144503.html",
    image: "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=600&q=70",
  },
  {
    id: 8, featured: false, cat: "du-an", date: "2026-11-14",
    title: "Van Phuc Group tặng căn hộ 8 tỷ đồng cho người mua nhà tại Diamond Sky",
    summary: "Chương trình khuyến mãi \"Mua nhà trúng nhà\" kéo dài một năm, từ 1/11/2026 đến 1/11/2027.",
    url: "https://vnexpress.net/van-phuc-group-tang-can-ho-8-ty-dong-cho-nguoi-mua-nha-tai-diamond-sky-5143482.html",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=70",
  },
  {
    id: 9, featured: false, cat: "thi-truong", date: "2026-11-14",
    title: "Huế tìm được nhà đầu tư trúng đấu giá khu đất vàng ven sông Hương",
    summary: "Doji Land trúng đấu giá các khu đất rộng hơn 10.600 m2 trên đường Lê Lợi, sát sông Hương.",
    url: "https://vnexpress.net/hue-tim-duoc-nha-dau-tu-trung-dau-gia-khu-dat-vang-ven-song-huong-5144499.html",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&q=70",
  },
  {
    id: 10, featured: false, cat: "chinh-sach", date: "2026-11-14",
    title: "Lâm Đồng cho thuê 177 trụ sở dôi dư",
    summary: "Tỉnh đã xử lý gần 940 cơ sở nhà đất công dư thừa; riêng việc cho thuê 177 trụ sở mang về hơn 26 tỷ đồng.",
    url: "https://vnexpress.net/lam-dong-cho-thue-177-tru-so-doi-du-5144440.html",
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=70",
  },
  {
    id: 11, featured: false, cat: "tu-van", date: "2026-11-14",
    title: "Nhà 24 m2 đủ không gian cho gia đình 5 người",
    summary: "Biến tường thành tủ chứa đồ và mở cửa sổ trên mái để lấy sáng: gợi ý hay cho nhà diện tích nhỏ.",
    url: "https://vnexpress.net/nha-24-m2-du-khong-gian-cho-gia-dinh-5-nguoi-5144416.html",
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&q=70",
  },
  {
    id: 12, featured: false, cat: "thi-truong", date: "2026-11-13",
    title: "Sân vận động Chi Lăng giảm hơn 1.500 tỷ đồng ở lần đấu giá thứ 8",
    summary: "Khu đất phức hợp sân vận động Chi Lăng (Đà Nẵng) tiếp tục được đấu giá lần thứ 8 với giá khởi điểm thấp hơn trước.",
    url: "https://vnexpress.net/san-van-dong-chi-lang-giam-hon-1-500-ty-dong-o-lan-dau-gia-thu-8-5144418.html",
    image: "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?w=600&q=70",
  },
];

// 5 tin MINH HỌA chép từ khung "Tin tức mới nhất" của trang gốc ../index.html (tin tự đặt, không có bài gốc nên không có url).
// Để thành mảng riêng (không gộp vào NEWS) để trang tin-tuc vẫn chỉ hiện tin thật; trang tat-ca-tin-tuc thì gộp cả hai.
const LOKI_NEWS = [
  { id: 101, cat: "thi-truong", date: "2026-11-08", title: "Thị trường căn hộ TP.HCM cuối năm: nguồn cung mới tăng mạnh", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=70" },
  { id: 102, cat: "tu-van", date: "2026-11-07", title: "5 lưu ý pháp lý khi mua nhà lần đầu bạn cần biết", image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=70" },
  { id: 103, cat: "thi-truong", date: "2026-11-06", title: "Giá đất nền vùng ven có xu hướng ổn định trở lại", image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=70" },
  { id: 104, cat: "tu-van", date: "2026-11-05", title: "Kinh nghiệm thuê căn hộ: kiểm tra gì trước khi ký hợp đồng?", image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=70" },
  { id: 105, cat: "kinh-te-vung", date: "2026-11-04", title: "Hạ tầng metro thúc đẩy bất động sản khu Đông", image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=70" },
];
