const SERVICES_DATA = [
    {
        id: 'fb-01',
        category: 'facebook',
        platform: 'Facebook',
        icon: 'fa-brands fa-facebook',
        brandColor: 'text-blue-500',
        badgeBg: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
        name: 'Facebook Marketing Toàn Diện',
        desc: 'Tối ưu độ uy tín trang cá nhân và doanh nghiệp với tương tác chuẩn người dùng thật.',
        priceStarting: '12đ',
        featuredList: [
            'Tăng Like & Follow Fanpage chuẩn SEO',
            'Tăng Like, Thả tim bài viết đa cảm xúc',
            'Lượt xem Video, Reels, Story 100% người thật',
            'Mắt xem Livestream không tụt trong suốt phiên',
            'Seeding bình luận theo kịch bản tùy chỉnh'
        ]
    },
    {
        id: 'tt-01',
        category: 'tiktok',
        platform: 'TikTok',
        icon: 'fa-brands fa-tiktok',
        brandColor: 'text-rose-400',
        badgeBg: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
        name: 'TikTok Viral & Xu Hướng',
        desc: 'Đẩy video lên đề xuất triệu view, xây kênh thần tốc với thuật toán FYP mới nhất.',
        priceStarting: '8đ',
        featuredList: [
            'Follower thật 100% tài khoản Việt Nam',
            'Lượt tim video đề xuất tự nhiên',
            'Lượt xem (Views) đẩy tab Xu hướng siêu tốc',
            'Chia sẻ (Share) & Lưu bài viết (Save video)',
            'Tăng mắt Livestream PK và seeding bình luận'
        ]
    },
    {
        id: 'ig-01',
        category: 'instagram',
        platform: 'Instagram',
        icon: 'fa-brands fa-instagram',
        brandColor: 'text-pink-400',
        badgeBg: 'bg-pink-500/10 text-pink-400 border-pink-500/20',
        name: 'Instagram Growth & Branding',
        desc: 'Giải pháp nâng tầm phong cách sống, thời trang và thương hiệu quốc tế sang trọng.',
        priceStarting: '15đ',
        featuredList: [
            'Follower chuẩn avatar, bio đầy đủ',
            'Like ảnh, carousel bài đăng tương tác cao',
            'Views Story, Reels & Video tự động',
            'Impressions & Saves tối ưu đề xuất Explore',
            'Bảo hành chống tụt vĩnh viễn'
        ]
    },
    {
        id: 'yt-01',
        category: 'youtube',
        platform: 'YouTube',
        icon: 'fa-brands fa-youtube',
        brandColor: 'text-red-500',
        badgeBg: 'bg-red-500/10 text-red-400 border-red-500/20',
        name: 'YouTube Partner & Kiếm Tiền',
        desc: 'Hỗ trợ đủ điều kiện Bật kiếm tiền và tăng đề xuất video an toàn tuyệt đối với YPP.',
        priceStarting: '28đ',
        featuredList: [
            'Tăng Subscribers kênh không tụt, bảo hành trọn đời',
            '4.000 giờ xem chất lượng cao đạt chuẩn YPP',
            'Views video độ dài cao, nguồn đề xuất tự nhiên',
            'Tăng Like & Comment thảo luận video',
            'Lượt xem YouTube Shorts xu hướng'
        ]
    },
    {
        id: 'oth-01',
        category: 'others',
        platform: 'Marketing tổng hợp',
        icon: 'fa-solid fa-bullhorn',
        brandColor: 'text-purple-400',
        badgeBg: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
        name: 'Marketing Tổng Hợp & Đa Kênh',
        desc: 'Gói giải pháp phủ sóng toàn diện trên Telegram, X (Twitter), Shopee và Google Maps.',
        priceStarting: '20đ',
        featuredList: [
            'Tăng thành viên nhóm/kênh Telegram cộng đồng',
            'X (Twitter) Followers, Retweet & Like',
            'Đánh giá Google Maps 5 sao người thật định vị',
            'Tăng lượt mua & Đánh giá Shopee tăng tỷ lệ chốt',
            'Threads tương tác thảo luận sôi nổi'
        ]
    }
];
const PRICING_DATA = [
    {
        id: 'srv-101',
        platform: 'Facebook',
        name: 'Like Bài Viết Facebook [Server 1 - Tốc độ cao]',
        speed: '10K - 50K / ngày',
        warranty: 'Không tụt',
        price: 12000,
        unit: 1000,
        status: 'Siêu tốc',
        statusColor: 'text-cyan-400 bg-cyan-400/10',
        isPopular: true
    },
    {
        id: 'srv-102',
        platform: 'Facebook',
        name: 'Follow Trang Cá Nhân / Fanpage [Server VIP]',
        speed: '5K - 20K / ngày',
        warranty: 'Bảo hành 30 ngày',
        price: 38000,
        unit: 1000,
        status: 'Ổn định',
        statusColor: 'text-emerald-400 bg-emerald-400/10',
        isPopular: true
    },
    {
        id: 'srv-103',
        platform: 'Facebook',
        name: 'Mắt Xem Livestream Facebook [60 Phút]',
        speed: 'Khởi chạy 30s',
        warranty: 'Ổn định suốt phiên',
        price: 45000,
        unit: 1000,
        status: 'Tức thì',
        statusColor: 'text-cyan-400 bg-cyan-400/10',
        isPopular: false
    },
    {
        id: 'srv-201',
        platform: 'TikTok',
        name: 'Lượt Xem (Views) Video TikTok [Đẩy Xu Hướng]',
        speed: '500K / ngày',
        warranty: 'Vĩnh viễn',
        price: 8000,
        unit: 1000,
        status: 'Siêu tốc',
        statusColor: 'text-cyan-400 bg-cyan-400/10',
        isPopular: true
    },
    {
        id: 'srv-202',
        platform: 'TikTok',
        name: 'Follower TikTok Việt Nam [Người thật hoạt động]',
        speed: '3K - 10K / ngày',
        warranty: 'Bảo hành 60 ngày',
        price: 52000,
        unit: 1000,
        status: 'Ổn định',
        statusColor: 'text-emerald-400 bg-emerald-400/10',
        isPopular: true
    },
    {
        id: 'srv-203',
        platform: 'TikTok',
        name: 'Thả Tim (Like) Video TikTok [Server 2]',
        speed: '20K - 50K / ngày',
        warranty: 'Bảo hành 30 ngày',
        price: 24000,
        unit: 1000,
        status: 'Nhanh',
        statusColor: 'text-cyan-400 bg-cyan-400/10',
        isPopular: false
    },
    {
        id: 'srv-301',
        platform: 'Instagram',
        name: 'Follower Instagram Quốc Tế / VN [Chất lượng cao]',
        speed: '5K - 15K / ngày',
        warranty: 'Bảo hành 30 ngày',
        price: 42000,
        unit: 1000,
        status: 'Ổn định',
        statusColor: 'text-emerald-400 bg-emerald-400/10',
        isPopular: true
    },
    {
        id: 'srv-302',
        platform: 'Instagram',
        name: 'Like Bài Đăng Instagram [Thả tim tự động]',
        speed: '10K - 30K / ngày',
        warranty: 'Không tụt',
        price: 18000,
        unit: 1000,
        status: 'Siêu tốc',
        statusColor: 'text-cyan-400 bg-cyan-400/10',
        isPopular: false
    },
    {
        id: 'srv-401',
        platform: 'YouTube',
        name: 'Lượt Xem (Views) YouTube Đề Xuất [Giữ chân cao]',
        speed: '10K - 50K / ngày',
        warranty: 'Bảo hành trọn đời',
        price: 49000,
        unit: 1000,
        status: 'Chất lượng',
        statusColor: 'text-emerald-400 bg-emerald-400/10',
        isPopular: true
    },
    {
        id: 'srv-402',
        platform: 'YouTube',
        name: 'Subscribers Kênh YouTube [An toàn chuẩn Bật Kiếm Tiền]',
        speed: '500 - 1K / ngày',
        warranty: 'Bảo hành vĩnh viễn',
        price: 165000,
        unit: 1000,
        status: 'An toàn YPP',
        statusColor: 'text-amber-400 bg-amber-400/10',
        isPopular: true
    },
    {
        id: 'srv-501',
        platform: 'Others',
        name: 'Telegram Member Nhóm / Kênh [Người dùng thật]',
        speed: '5K - 20K / ngày',
        warranty: 'Bảo hành 30 ngày',
        price: 68000,
        unit: 1000,
        status: 'Ổn định',
        statusColor: 'text-emerald-400 bg-emerald-400/10',
        isPopular: false
    },
    {
        id: 'srv-502',
        platform: 'Others',
        name: 'Đánh Giá Google Maps 5 Sao [Nick Thật Có Lịch Sử]',
        speed: '50 - 200 / ngày',
        warranty: 'Bảo hành 90 ngày',
        price: 250000,
        unit: 1000,
        status: 'Chất lượng cao',
        statusColor: 'text-purple-400 bg-purple-400/10',
        isPopular: false
    }
];
const FAQS_DATA = [
    {
        q: 'Dịch vụ tại SUB24H có an toàn cho tài khoản mạng xã hội của tôi không?',
        a: 'Tuyệt đối an toàn 100%! Chúng tôi KHÔNG BAO GIỜ yêu cầu bạn cung cấp mật khẩu tài khoản. Bạn chỉ cần dán đường liên kết (URL) công khai của bài viết, video hoặc trang cá nhân. Toàn bộ tương tác chạy qua hệ thống phân phối tự nhiên, tuân thủ nghiêm ngặt thuật toán của Meta, TikTok và YouTube.'
    },
    {
        q: 'Nạp tiền vào tài khoản mất bao lâu và hỗ trợ những hình thức nào?',
        a: 'Hệ thống tích hợp cổng thanh toán VietQR tự động 24/7. Sau khi quét mã QR và chuyển khoản thành công với đúng nội dung cú pháp, tiền sẽ được cộng tự động vào số dư của bạn trong vòng từ 10 đến 30 giây mà không cần nhân viên duyệt thủ công. Ngoài ra hệ thống còn hỗ trợ USDT và thẻ cào.'
    },
    {
        q: 'Sau khi đặt hàng thì bao lâu dịch vụ bắt đầu chạy và hoàn thành?',
        a: 'Đa số các gói dịch vụ bắt đầu kích hoạt sau 1-3 phút kể từ khi khởi tạo thành công. Thời gian hoàn thành phụ thuộc vào số lượng và tốc độ của gói bạn chọn (ví dụ: gói View thường xong trong vài giờ, gói Follower người thật sẽ được chia đều tốc độ để tài khoản phát triển tự nhiên nhất).'
    },
    {
        q: 'Chính sách bảo hành tụt giảm (Refill) hoạt động như thế nào?',
        a: 'Đối với các gói dịch vụ có cam kết bảo hành (30 ngày, 60 ngày hoặc vĩnh viễn), nếu số lượng bị tụt giảm trong thời hạn bảo hành, bạn chỉ cần bấm nút "Bảo hành" trong phần Quản lý đơn hàng hoặc gửi mã đơn cho đội ngũ hỗ trợ. Hệ thống sẽ tự động bù đủ số lượng thiếu hụt hoàn toàn miễn phí.'
    },
    {
        q: 'Tôi có thể hủy đơn hàng hoặc yêu cầu hoàn tiền không?',
        a: 'Nếu đơn hàng bị lỗi kỹ thuật từ phía máy chủ hoặc không thể khởi chạy sau 24h, hệ thống sẽ tự động hủy đơn và hoàn trả 100% số tiền về tài khoản số dư của bạn ngay lập tức. Bạn có thể sử dụng số dư để tạo đơn máy chủ khác hoặc rút về tài khoản ngân hàng theo chính sách hỗ trợ.'
    },
    {
        q: 'SUB24H có cung cấp kết nối API cho đại lý / đối tác SMM Panel không?',
        a: 'Có! SUB24H.NET hỗ trợ đầy đủ tài liệu chuẩn REST API kết nối tự động cho các đại lý, website bán lẻ và đối tác SMM Panel. Bạn có thể kết nối danh mục dịch vụ, tự động tạo đơn và kiểm tra tiến độ đơn hàng thời gian thực với mức chiết khấu giá đại lý lên đến 10% - 15%.'
    }
];
const RECENT_ORDERS_SIMULATION = [
    { user: '098***122', service: '5,000 TikTok Follower', icon: 'fa-brands fa-tiktok', time: '10s trước' },
    { user: '091***482', service: '10,000 Facebook Page Likes', icon: 'fa-brands fa-facebook', time: '25s trước' },
    { user: '088***331', service: '50,000 TikTok Video Views', icon: 'fa-brands fa-tiktok', time: '40s trước' },
    { user: '097***554', service: '2,000 YouTube Subscribers', icon: 'fa-brands fa-youtube', time: '1m trước' },
    { user: '090***679', service: '20,000 Instagram Reels Views', icon: 'fa-brands fa-instagram', time: '2m trước' },
    { user: '034***890', service: '1,000 Telegram Members', icon: 'fa-brands fa-telegram', time: '3m trước' }
];
