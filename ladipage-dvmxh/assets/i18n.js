let currentLang = 'vi';
try {
    const savedLang = localStorage.getItem('sub24h_lang');
    if (savedLang === 'en' || savedLang === 'vi') {
        currentLang = savedLang;
    }
} catch (e) {
    console.warn('LocalStorage access issue:', e);
}
const I18N = {
    vi: {
        lang_label: 'Ngôn ngữ:',
        nav_home: 'Trang chủ',
        nav_services: 'Dịch vụ',
        nav_pricing: 'Bảng giá',
        nav_features: 'Ưu điểm',
        nav_workflow: 'Hướng dẫn',
        nav_faq: 'FAQ',
        btn_login: 'Đăng nhập',
        btn_register: 'Đăng ký ngay',
        btn_register_new: 'Đăng ký tài khoản mới',
        hero_badge: 'NỀN TẢNG SMM PANEL TỰ ĐỘNG SỐ 1 VIỆT NAM',
        hero_title_1: 'PHÁT TRIỂN MẠNG XÃ HỘI –',
        hero_title_2: 'BỨT PHÁ GIỚI HẠN',
        hero_desc: 'Nền tảng cung cấp giải pháp tăng trưởng mạng xã hội nhanh chóng, tiện lợi và tiết kiệm. Đồng hành cùng bạn trên hành trình phát triển thương hiệu cá nhân và kinh doanh online.',
        hero_cta_explore: 'Khám phá dịch vụ',
        hero_cta_start: 'Bắt đầu ngay',
        final_btn: 'ĐĂNG KÝ VÀ TRẢI NGHIỆM NGAY',
        lang_switched: 'Đã chuyển ngôn ngữ sang Tiếng Việt!'
    },
    en: {
        lang_label: 'Language:',
        nav_home: 'Home',
        nav_services: 'Services',
        nav_pricing: 'Pricing',
        nav_features: 'Features',
        nav_workflow: 'How It Works',
        nav_faq: 'FAQ',
        btn_login: 'Log In',
        btn_register: 'Sign Up',
        btn_register_new: 'Create New Account',
        hero_badge: 'LEADING AUTOMATED SMM PANEL PLATFORM',
        hero_title_1: 'GROW YOUR SOCIAL MEDIA –',
        hero_title_2: 'BREAK ALL LIMITS',
        hero_desc: 'The leading platform providing fast, seamless, and cost-effective social media growth solutions. Empowering your personal brand and online business scaling.',
        hero_cta_explore: 'Explore Services',
        hero_cta_start: 'Get Started Now',
        final_btn: 'SIGN UP & GET STARTED NOW',
        lang_switched: 'Language switched to English!'
    }
};
function applyLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;
    try {
        localStorage.setItem('sub24h_lang', lang);
    } catch (e) {}
    const currentFlag = document.getElementById('current-lang-flag');
    const currentText = document.getElementById('current-lang-text');
    if (currentFlag) currentFlag.textContent = lang === 'vi' ? '🇻🇳' : '🇬🇧';
    if (currentText) currentText.textContent = lang.toUpperCase();
    document.querySelectorAll('.mobile-lang-btn').forEach(btn => {
        if (btn.getAttribute('data-lang') === lang) {
            btn.className = 'mobile-lang-btn px-2.5 py-1 rounded-lg text-xs font-bold transition-all bg-cyan-500/20 text-cyan-300 border border-cyan-500/30';
        } else {
            btn.className = 'mobile-lang-btn px-2.5 py-1 rounded-lg text-xs font-medium transition-all text-slate-400 hover:text-white';
        }
    });
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (I18N[lang] && I18N[lang][key]) {
            el.textContent = I18N[lang][key];
        }
    });
    if (typeof renderServices === 'function') renderServices(window.currentServiceCategory || 'all');
    if (typeof renderPricingTable === 'function') renderPricingTable();
    if (typeof renderFaqs === 'function') renderFaqs();
}
function initLanguageSwitcher() {
    const btnLangToggle = document.getElementById('btn-lang-toggle');
    const langDropdownMenu = document.getElementById('lang-dropdown-menu');
    if (btnLangToggle && langDropdownMenu) {
        btnLangToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            langDropdownMenu.classList.toggle('hidden');
        });
        document.addEventListener('click', (e) => {
            if (!btnLangToggle.contains(e.target) && !langDropdownMenu.contains(e.target)) {
                langDropdownMenu.classList.add('hidden');
            }
        });
        document.querySelectorAll('.btn-lang-option').forEach(btn => {
            btn.addEventListener('click', () => {
                const targetLang = btn.getAttribute('data-lang');
                langDropdownMenu.classList.add('hidden');
                applyLanguage(targetLang);
                if (typeof showToast === 'function') {
                    showToast(I18N[targetLang].lang_switched);
                }
            });
        });
    }
    document.querySelectorAll('.mobile-lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const targetLang = btn.getAttribute('data-lang');
            applyLanguage(targetLang);
            if (typeof showToast === 'function') {
                showToast(I18N[targetLang].lang_switched);
            }
        });
    });
    applyLanguage(currentLang);
}
