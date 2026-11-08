# Hướng dẫn nhanh cho anh em chỉnh sửa SUB24H.NET

Tài liệu ngắn gọn để anh em vào là biết sửa ngay, không dài dòng.

---

## 1. File nào làm việc nấy?

```text
sub24h-landing/
├── index.html              -> Giao diện chính (chữ tĩnh, bố cục, icon, modal)
├── css/
│   └── style.css           -> Toàn bộ màu mè, hiệu ứng kính (glassmorphism), viền sáng
├── js/
│   ├── data.js             -> QUAN TRỌNG: Sửa giá, thêm dịch vụ, sửa FAQ ở đây
│   ├── i18n.js             -> Sửa chữ Tiếng Việt / Tiếng Anh, hoặc thêm tiếng khác
│   └── app.js              -> Logic chạy biểu đồ, tính tiền tự động, bật tắt modal
└── assets/
    └── dashboard-3d.jpg    -> Ảnh 3D ở phần đầu trang
```

---

## 2. Muốn sửa cái gì thì vào đâu?

### Cần đổi giá hoặc thêm dịch vụ mới
👉 Mở file **`js/data.js`**, kéo đến đoạn `PRICING_DATA`:
* **Đổi giá:** Sửa số ở dòng `price: 12000` (đơn vị: VNĐ trên 1.000 tương tác).
* **Thêm gói mới:** Copy nguyên một cụm dưới đây rồi dán nối tiếp vào:

```javascript
{
    id: 'srv-204',
    platform: 'TikTok',
    name: 'Follower TikTok VIP [Người Thật]',
    speed: '5K - 10K / ngày',
    warranty: 'Bảo hành 30 ngày',
    price: 45000,
    unit: 1000,
    status: 'Siêu tốc',
    statusColor: 'text-cyan-400 bg-cyan-400/10',
    isPopular: true
},
```
*Lưu ý:* Bảng giá và thanh kéo tính tiền ở trang chủ sẽ tự động cập nhật theo, không cần đụng vào file HTML.

---

### Cần đổi số tài khoản ngân hàng VietQR
👉 Mở file **`index.html`**, bấm `Ctrl + F` tìm từ khóa:
* `00000` -> Đổi thành số tài khoản của bạn.
* `MB BANK` -> Đổi tên ngân hàng.
* `SUB24H CO LTD` -> Đổi tên chủ tài khoản.

Muốn đổi nội dung cú pháp khi bấm nút "Sao chép":
👉 Mở file **`js/app.js`**, tìm dòng `NAP SUB24H 8899` và sửa lại theo cú pháp của bạn.

---

### Cần đổi link Telegram, Hotline, Email
👉 Mở file **`index.html`**, kéo xuống phần cuối trang (`<footer>`):
* Tìm `@sub24h_cskh` -> Thay bằng username Telegram của bạn.
* Tìm `support@sub24h.net` -> Thay bằng email của bạn.

---

### Cần thêm / sửa câu hỏi FAQ
👉 Mở file **`js/data.js`**, tìm đoạn `FAQS_DATA` rồi sửa trực tiếp câu hỏi (`q`) và câu trả lời (`a`):

```javascript
{
    q: 'Bao lâu thì đơn hàng bắt đầu chạy?',
    a: 'Thường sau 1 đến 3 phút hệ thống sẽ tự động kích hoạt.'
},
```

---

### Cần sửa chữ trên web hoặc dịch lại tiếng Anh
👉 Mở file **`js/i18n.js`**:
* Nhánh `vi: { ... }` là toàn bộ chữ Tiếng Việt.
* Nhánh `en: { ... }` là toàn bộ chữ Tiếng Anh.
* Thích đổi chữ nào thì chỉ cần sửa chữ trong ngoặc kép ở file này là xong.

---

## 3. Cách chạy thử và tải lên mạng

1. **Xem trên máy:** Bấm đúp chuột vào file `index.html` để mở bằng Chrome/Cốc Cốc, hoặc dùng tiện ích `Live Server` trong VS Code.
2. **Đưa lên web:** Toàn bộ là code tĩnh (HTML/CSS/JS thuần). Anh em chỉ cần ném nguyên thư mục này lên Vercel, Netlify, cPanel hoặc Nginx là chạy ngay, không cần cài đặt thêm Node.js hay build code gì cả.
