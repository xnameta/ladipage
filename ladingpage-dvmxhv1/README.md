# SUB24H.NET — Modern Landing Page Demo

Bản thiết kế giao diện **Frontend Demo** cho nền tảng Social Media Marketing **SUB24H.NET**, xây dựng hoàn toàn bằng **HTML5, CSS3 và JavaScript thuần (Vanilla JS)**, không sử dụng framework, không backend và không can thiệp vào mã nguồn hệ thống đang hoạt động.

## Cấu trúc thư mục

```text
sub24h-landing-demo/
├── index.html
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── main.js
│   └── images/
│       ├── logo.svg
│       ├── favicon.svg
│       ├── hero-dashboard.png
│       ├── dashboard-preview.png
│       └── platforms/
│           ├── facebook.svg
│           ├── tiktok.svg
│           ├── instagram.svg
│           ├── youtube.svg
│           ├── threads.svg
│           ├── twitter.svg
│           ├── telegram.svg
│           ├── shopee.svg
│           ├── lazada.svg
│           └── google.svg
└── README.md
```

## Cách chạy bản Demo

1. Giải nén thư mục `sub24h-landing-demo/`.
2. Mở trực tiếp tệp `index.html` bằng trình duyệt bất kỳ (Chrome, Edge, Firefox, Safari).
3. Hoặc chạy bằng local server (ví dụ `python3 -m http.server 8080` trong thư mục `sub24h-landing-demo/`) rồi truy cập `http://localhost:8080`.

## Tính năng tương tác trong bản Demo

- **Header cố định & Menu Mobile**: Tự động đổi trạng thái khi cuộn và chuyển thành menu hamburger trên màn hình nhỏ.
- **Lọc & Tìm kiếm bảng giá**: Lọc nhanh theo nền tảng (`Facebook`, `TikTok`, `Instagram`, `YouTube`, `Telegram`) kết hợp tìm kiếm theo từ khóa.
- **FAQ Accordion**: Mở/đóng từng câu hỏi thường gặp mượt mà.
- **Thông báo Demo rõ ràng**: Các nút `Đăng nhập`, `Đăng ký miễn phí`, `Xem dịch vụ`, `Chính sách bảo mật`, `Điều khoản dịch vụ` đều hiển thị hộp thoại thông báo chế độ Frontend Demo.
- **Animation & Back-to-top**: Hiệu ứng xuất hiện khi cuộn, đếm số thống kê (hỗ trợ `prefers-reduced-motion`) và nút quay lại đầu trang.
