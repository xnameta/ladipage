let currentUser = null;
try {
    const saved = localStorage.getItem('sub24h_user');
    if (saved) {
        currentUser = JSON.parse(saved);
    }
} catch (e) {
    console.warn('Storage access not allowed', e);
}
let currentPricingFilter = 'all';
let currentPricingSort = 'price-asc';
let currentPricingSearch = '';
let currentGrowthPeriod = '7d';
window.currentServiceCategory = 'all';
function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-2xl shadow-2xl text-xs sm:text-sm font-semibold text-white border transition-all duration-300 transform translate-y-2 opacity-0 ' + 
        (type === 'success' ? 'bg-emerald-950/90 border-emerald-500/40 text-emerald-200' : 'bg-rose-950/90 border-rose-500/40 text-rose-200');
    const icon = type === 'success' ? 'fa-circle-check text-emerald-400' : 'fa-circle-exclamation text-rose-400';
    toast.innerHTML = `<i class="fa-solid ${icon} text-base"></i><span>${message}</span>`;
    container.appendChild(toast);
    requestAnimationFrame(() => {
        toast.classList.remove('translate-y-2', 'opacity-0');
    });
    setTimeout(() => {
        toast.classList.add('opacity-0', '-translate-y-2');
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}
function renderServices(filter = 'all') {
    window.currentServiceCategory = filter;
    const grid = document.getElementById('services-grid');
    if (!grid) return;
    const filtered = filter === 'all' 
        ? SERVICES_DATA 
        : SERVICES_DATA.filter(s => s.category === filter);
    grid.innerHTML = filtered.map(item => `
        <div class="glass-card rounded-3xl p-7 relative flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1.5 border border-white/10 hover:border-cyan-500/40">
            <div>
                <!-- Header badge & Logo -->
                <div class="flex items-center justify-between mb-5">
                    <div class="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl ${item.brandColor} group-hover:scale-110 transition-transform">
                        <i class="${item.icon}"></i>
                    </div>
                    <span class="text-xs font-bold px-3 py-1 rounded-full border ${item.badgeBg}">
                        Chá» tá»« ${item.priceStarting}
                    </span>
                </div>
                <!-- Title & Description -->
                <h3 class="text-xl font-bold text-white mb-2">${item.name}</h3>
                <p class="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">${item.desc}</p>
                <!-- Feature list -->
                <div class="space-y-2.5 pt-4 border-t border-white/5 mb-6">
                    ${item.featuredList.map(feat => `
                        <div class="flex items-start gap-2.5 text-xs text-slate-300">
                            <i class="fa-solid fa-check text-cyan-400 mt-0.5 text-[11px] flex-shrink-0"></i>
                            <span>${feat}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
            <!-- Action Button -->
            <button class="btn-select-service w-full py-3 rounded-xl bg-white/5 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-600 text-white font-bold text-xs border border-white/10 hover:border-transparent transition-all flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-cyan-500/20" data-platform="${item.platform}">
                <span>Xem dá»ch vá»¥ & BÃ¡o giÃ¡</span>
                <i class="fa-solid fa-arrow-right text-[10px] transition-transform group-hover:translate-x-1"></i>
            </button>
        </div>
    `).join('');
    grid.querySelectorAll('.btn-select-service').forEach(btn => {
        btn.addEventListener('click', () => {
            const plat = btn.getAttribute('data-platform');
            document.getElementById('pricing').scrollIntoView({ behavior: 'smooth' });
            setPricingFilter(plat);
        });
    });
}
function renderPricingTable() {
    const tbody = document.getElementById('pricing-table-body');
    const countDisplay = document.getElementById('pricing-count-display');
    if (!tbody) return;
    let list = [...PRICING_DATA];
    if (currentPricingFilter !== 'all') {
        list = list.filter(item => item.platform.toLowerCase() === currentPricingFilter.toLowerCase());
    }
    if (currentPricingSearch.trim() !== '') {
        const q = currentPricingSearch.toLowerCase();
        list = list.filter(item => 
            item.name.toLowerCase().includes(q) || 
            item.platform.toLowerCase().includes(q)
        );
    }
    if (currentPricingSort === 'price-asc') {
        list.sort((a, b) => a.price - b.price);
    } else if (currentPricingSort === 'price-desc') {
        list.sort((a, b) => b.price - a.price);
    } else if (currentPricingSort === 'popular') {
        list.sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0));
    }
    if (countDisplay) {
        countDisplay.textContent = list.length;
    }
    if (list.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" class="text-center py-12 text-slate-400 text-sm">
                    <i class="fa-solid fa-magnifying-glass text-2xl mb-2 block text-slate-600"></i>
                    KhÃ´ng tÃ¬m tháº¥y dá»ch vá»¥ nÃ o phÃ¹ há»£p vá»i tá»« khÃ³a "${currentPricingSearch}".
                </td>
            </tr>
        `;
        return;
    }
    tbody.innerHTML = list.map(item => `
        <tr class="hover:bg-white/[0.03] transition-colors group">
            <td class="py-4 px-6">
                <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-sm font-bold text-cyan-400">
                        ${item.platform === 'Facebook' ? '<i class="fa-brands fa-facebook text-blue-500"></i>' :
                          item.platform === 'TikTok' ? '<i class="fa-brands fa-tiktok text-rose-400"></i>' :
                          item.platform === 'Instagram' ? '<i class="fa-brands fa-instagram text-pink-400"></i>' :
                          item.platform === 'YouTube' ? '<i class="fa-brands fa-youtube text-red-500"></i>' :
                          '<i class="fa-solid fa-bullhorn text-purple-400"></i>'}
                    </div>
                    <div>
                        <div class="font-bold text-white text-xs sm:text-sm group-hover:text-cyan-300 transition-colors">
                            ${item.name}
                        </div>
                        <div class="text-[11px] text-slate-400 font-mono mt-0.5">ID: ${item.id}</div>
                    </div>
                </div>
            </td>
            <td class="py-4 px-4 text-xs text-slate-300 font-medium">
                <i class="fa-solid fa-gauge-high text-cyan-400 text-[10px] mr-1"></i>
                ${item.speed}
            </td>
            <td class="py-4 px-4 text-xs">
                <span class="inline-flex items-center gap-1 text-emerald-400 font-semibold bg-emerald-400/10 px-2 py-0.5 rounded">
                    <i class="fa-solid fa-shield-check text-[10px]"></i>
                    ${item.warranty}
                </span>
            </td>
            <td class="py-4 px-4">
                <div class="font-black text-cyan-400 text-sm sm:text-base font-mono">
                    ${(item.price).toLocaleString('vi-VN')}Ä
                </div>
                <div class="text-[10px] text-slate-400">/ 1.000 tÆ°Æ¡ng tÃ¡c</div>
            </td>
            <td class="py-4 px-4 text-center">
                <span class="text-[11px] font-semibold px-2.5 py-1 rounded-full ${item.statusColor}">
                    ${item.status}
                </span>
            </td>
            <td class="py-4 px-6 text-right">
                <button class="btn-table-order px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-md shadow-cyan-500/20 transition-all flex items-center gap-1.5 ml-auto" data-service-id="${item.id}">
                    <i class="fa-solid fa-cart-shopping text-[10px]"></i>
                    <span>Táº¡o ÄÆ¡n</span>
                </button>
            </td>
        </tr>
    `).join('');
    tbody.querySelectorAll('.btn-table-order').forEach(btn => {
        btn.addEventListener('click', () => {
            const sId = btn.getAttribute('data-service-id');
            openOrderModal(sId);
        });
    });
}
function setPricingFilter(plat) {
    currentPricingFilter = plat;
    document.querySelectorAll('.pricing-pill-btn').forEach(btn => {
        if (btn.getAttribute('data-platform').toLowerCase() === plat.toLowerCase()) {
            btn.className = 'pricing-pill-btn active px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30';
        } else {
            btn.className = 'pricing-pill-btn px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-white/5 border border-white/5';
        }
    });
    renderPricingTable();
}
function renderFaqs() {
    const container = document.getElementById('faq-accordion-container');
    if (!container) return;
    container.innerHTML = FAQS_DATA.map((item, idx) => `
        <div class="glass-card rounded-2xl border border-white/10 overflow-hidden transition-all duration-300">
            <button class="faq-question-btn w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none" data-faq-index="${idx}">
                <span class="text-sm sm:text-base font-bold text-white flex items-center gap-3">
                    <span class="w-6 h-6 rounded-lg bg-cyan-500/10 text-cyan-400 text-xs flex items-center justify-center font-mono">
                        0${idx + 1}
                    </span>
                    ${item.q}
                </span>
                <i class="faq-chevron fa-solid fa-chevron-down text-slate-400 text-xs transition-transform duration-300"></i>
            </button>
            <div class="faq-answer-pane max-h-0 overflow-hidden transition-all duration-300 px-5 sm:px-6">
                <div class="pb-6 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5">
                    ${item.a}
                </div>
            </div>
        </div>
    `).join('');
    const firstPane = container.querySelector('.faq-answer-pane');
    const firstChevron = container.querySelector('.faq-chevron');
    if (firstPane) firstPane.style.maxHeight = firstPane.scrollHeight + 'px';
    if (firstChevron) firstChevron.style.transform = 'rotate(180deg)';
    container.querySelectorAll('.faq-question-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const pane = btn.nextElementSibling;
            const chevron = btn.querySelector('.faq-chevron');
            const isOpen = pane.style.maxHeight && pane.style.maxHeight !== '0px';
            container.querySelectorAll('.faq-answer-pane').forEach(p => p.style.maxHeight = '0px');
            container.querySelectorAll('.faq-chevron').forEach(c => c.style.transform = 'rotate(0deg)');
            if (!isOpen) {
                pane.style.maxHeight = pane.scrollHeight + 'px';
                chevron.style.transform = 'rotate(180deg)';
            }
        });
    });
}
function renderLiveMarquee() {
    const marquee = document.getElementById('live-marquee');
    if (!marquee) return;
    const items = [...RECENT_ORDERS_SIMULATION, ...RECENT_ORDERS_SIMULATION];
    marquee.innerHTML = items.map(ord => `
        <div class="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-xs text-slate-300">
            <i class="${ord.icon} text-cyan-400"></i>
            <span>KhÃ¡ch hÃ ng <strong class="text-white">${ord.user}</strong></span>
            <span class="text-slate-400">â¢ Vá»«a mua:</span>
            <span class="font-bold text-cyan-300">${ord.service}</span>
            <span class="text-[10px] text-slate-500 font-mono">(${ord.time})</span>
        </div>
    `).join('');
}
let activityIndex = 0;
function updateActivityPopup() {
    const popup = document.getElementById('live-activity-popup');
    const userEl = document.getElementById('activity-user');
    const timeEl = document.getElementById('activity-time');
    const textEl = document.getElementById('activity-text');
    const avatarEl = document.getElementById('activity-avatar');
    if (!popup || !userEl) return;
    const item = RECENT_ORDERS_SIMULATION[activityIndex % RECENT_ORDERS_SIMULATION.length];
    userEl.textContent = `KhÃ¡ch hÃ ng ${item.user}`;
    timeEl.textContent = item.time;
    textEl.textContent = `Vá»«a táº¡o ÄÆ¡n ${item.service}`;
    avatarEl.innerHTML = `<i class="${item.icon}"></i>`;
    activityIndex++;
}
function initCostCalculator() {
    const select = document.getElementById('calc-service-select');
    const slider = document.getElementById('calc-qty-slider');
    const qtyDisplay = document.getElementById('calc-qty-display');
    const priceDisplay = document.getElementById('calc-total-price');
    const btnOrderNow = document.getElementById('btn-calc-order-now');
    if (!select || !slider) return;
    select.innerHTML = PRICING_DATA.map(p => `
        <option value="${p.id}" data-price="${p.price}">${p.name} (${(p.price).toLocaleString()}Ä/1K)</option>
    `).join('');
    function updatePrice() {
        const opt = select.options[select.selectedIndex];
        const unitPrice = parseFloat(opt.getAttribute('data-price') || 0);
        const qty = parseInt(slider.value, 10);
        qtyDisplay.textContent = `${qty.toLocaleString('vi-VN')} lÆ°á»£t`;
        const total = Math.round((qty / 1000) * unitPrice);
        priceDisplay.textContent = `${total.toLocaleString('vi-VN')} VNÄ`;
    }
    select.addEventListener('change', updatePrice);
    slider.addEventListener('input', updatePrice);
    updatePrice();
    if (btnOrderNow) {
        btnOrderNow.addEventListener('click', () => {
            const sId = select.value;
            const qty = parseInt(slider.value, 10);
            openOrderModal(sId, qty);
        });
    }
}
let heroChartInstance = null;
function initGrowthChart() {
    const ctx = document.getElementById('heroGrowthChart');
    if (!ctx) return;
    const chartData = {
        '7d': {
            labels: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
            followers: [1200, 2400, 3900, 5800, 8400, 11200, 14250],
            interactions: [5000, 9500, 16000, 28000, 42000, 68000, 86400]
        },
        '30d': {
            labels: ['Tuáº§n 1', 'Tuáº§n 2', 'Tuáº§n 3', 'Tuáº§n 4'],
            followers: [8500, 22000, 45000, 89000],
            interactions: [40000, 110000, 260000, 480000]
        },
        '90d': {
            labels: ['ThÃ¡ng 1', 'ThÃ¡ng 2', 'ThÃ¡ng 3'],
            followers: [28000, 85000, 195000],
            interactions: [180000, 650000, 1420000]
        }
    };
    const data = chartData[currentGrowthPeriod];
    if (heroChartInstance) {
        heroChartInstance.destroy();
    }
    heroChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.labels,
            datasets: [
                {
                    label: 'LÆ°á»£t TÆ°Æ¡ng tÃ¡c (Views & Likes)',
                    data: data.interactions,
                    borderColor: '#06B6D4',
                    backgroundColor: 'rgba(6, 182, 212, 0.15)',
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#06B6D4',
                    pointBorderColor: '#ffffff',
                    pointHoverRadius: 6,
                    borderWidth: 2.5
                },
                {
                    label: 'Followers Má»i',
                    data: data.followers,
                    borderColor: '#8B5CF6',
                    backgroundColor: 'rgba(139, 92, 246, 0.1)',
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#8B5CF6',
                    pointBorderColor: '#ffffff',
                    pointHoverRadius: 6,
                    borderWidth: 2
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: '#070A12',
                    titleColor: '#ffffff',
                    bodyColor: '#cbd5e1',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    borderWidth: 1,
                    padding: 10,
                    boxPadding: 4,
                    usePointStyle: true,
                    callbacks: {
                        label: function(context) {
                            return ` ${context.dataset.label}: ${context.parsed.y.toLocaleString()} lÆ°á»£t`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: { color: 'rgba(255, 255, 255, 0.04)' },
                    ticks: { color: '#94a3b8', font: { size: 10 } }
                },
                y: {
                    grid: { color: 'rgba(255, 255, 255, 0.04)' },
                    ticks: {
                        color: '#94a3b8',
                        font: { size: 10 },
                        callback: function(value) {
                            if (value >= 1000) return (value / 1000) + 'K';
                            return value;
                        }
                    }
                }
            }
        }
    });
}
const modalAuth = document.getElementById('modal-auth');
const modalOrder = document.getElementById('modal-order');
const modalTopup = document.getElementById('modal-topup');
const modalPolicy = document.getElementById('modal-policy');
function updateHeaderUserUI() {
    const guestActions = document.getElementById('header-guest-actions');
    const userActions = document.getElementById('header-user-actions');
    const userName = document.getElementById('header-user-name');
    const userBalance = document.getElementById('header-user-balance');
    const userAvatar = document.getElementById('header-user-avatar');
    if (currentUser) {
        if (guestActions) guestActions.classList.add('hidden');
        if (userActions) {
            userActions.classList.remove('hidden');
            userActions.classList.add('flex');
        }
        if (userName) userName.textContent = currentUser.username || 'user_vip';
        if (userBalance) userBalance.textContent = (currentUser.balance || 50000).toLocaleString('vi-VN') + 'Ä';
        if (userAvatar) userAvatar.textContent = (currentUser.username || 'U').charAt(0).toUpperCase();
    } else {
        if (guestActions) guestActions.classList.remove('hidden');
        if (userActions) {
            userActions.classList.add('hidden');
            userActions.classList.remove('flex');
        }
    }
}
function openAuthModal(isRegister = false) {
    if (!modalAuth) return;
    const tabLogin = document.getElementById('tab-auth-login');
    const tabRegister = document.getElementById('tab-auth-register');
    const title = document.getElementById('modal-auth-title');
    const subtitle = document.getElementById('modal-auth-subtitle');
    const fieldEmail = document.getElementById('field-auth-email');
    const fieldAgree = document.getElementById('field-auth-agree');
    const btnSubmit = document.getElementById('btn-auth-submit');
    if (isRegister) {
        tabRegister.className = 'flex-1 py-2 text-xs font-bold rounded-lg transition-all bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow';
        tabLogin.className = 'flex-1 py-2 text-xs font-bold rounded-lg transition-all text-slate-400 hover:text-white';
        title.textContent = 'ÄÄng kÃ½ tÃ i khoáº£n má»i';
        subtitle.textContent = 'Khá»i táº¡o tÃ i khoáº£n SUB24H hoÃ n toÃ n miá»n phÃ­';
        fieldEmail.classList.remove('hidden');
        fieldAgree.classList.remove('hidden');
        fieldAgree.classList.add('flex');
        btnSubmit.textContent = 'HoÃ n táº¥t ÄÄng kÃ½';
    } else {
        tabLogin.className = 'flex-1 py-2 text-xs font-bold rounded-lg transition-all bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow';
        tabRegister.className = 'flex-1 py-2 text-xs font-bold rounded-lg transition-all text-slate-400 hover:text-white';
        title.textContent = 'ÄÄng nháº­p SUB24H';
        subtitle.textContent = 'Truy cáº­p báº£ng Äiá»u khiá»n vÃ  quáº£n lÃ½ ÄÆ¡n hÃ ng';
        fieldEmail.classList.add('hidden');
        fieldAgree.classList.add('hidden');
        fieldAgree.classList.remove('flex');
        btnSubmit.textContent = 'XÃ¡c nháº­n ÄÄng nháº­p';
    }
    modalAuth.classList.remove('hidden');
}
function closeAuthModal() {
    if (modalAuth) modalAuth.classList.add('hidden');
}
function openOrderModal(serviceId = null, prefillQty = 1000) {
    if (!modalOrder) return;
    const select = document.getElementById('modal-order-service');
    const qtyInput = document.getElementById('modal-order-quantity');
    const unitPriceDisplay = document.getElementById('modal-order-unitprice');
    const totalDisplay = document.getElementById('modal-order-total');
    const warrantyDisplay = document.getElementById('modal-order-warranty');
    const speedDisplay = document.getElementById('modal-order-speed');
    select.innerHTML = PRICING_DATA.map(p => `
        <option value="${p.id}" ${p.id === serviceId ? 'selected' : ''}>${p.platform} - ${p.name}</option>
    `).join('');
    qtyInput.value = prefillQty;
    function syncOrderSummary() {
        const curId = select.value;
        const found = PRICING_DATA.find(p => p.id === curId) || PRICING_DATA[0];
        const qty = parseInt(qtyInput.value || 1000, 10);
        const total = Math.round((qty / 1000) * found.price);
        unitPriceDisplay.textContent = `${(found.price).toLocaleString('vi-VN')}Ä`;
        totalDisplay.textContent = `${total.toLocaleString('vi-VN')} VNÄ`;
        warrantyDisplay.textContent = found.warranty;
        speedDisplay.textContent = found.speed;
    }
    select.addEventListener('change', syncOrderSummary);
    qtyInput.addEventListener('input', syncOrderSummary);
    syncOrderSummary();
    modalOrder.classList.remove('hidden');
}
function closeOrderModal() {
    if (modalOrder) modalOrder.classList.add('hidden');
}
function openTopupModal() {
    if (modalTopup) modalTopup.classList.remove('hidden');
}
function closeTopupModal() {
    if (modalTopup) modalTopup.classList.add('hidden');
}
function openPolicyModal(type) {
    if (!modalPolicy) return;
    const title = document.getElementById('modal-policy-title');
    const content = document.getElementById('modal-policy-content');
    if (type === 'privacy') {
        title.textContent = 'ChÃ­nh SÃ¡ch Báº£o Máº­t (Privacy Policy)';
        content.innerHTML = `
            <p><strong>1. Thu tháº­p thÃ´ng tin:</strong> SUB24H.NET cam káº¿t báº£o máº­t tuyá»t Äá»i dá»¯ liá»u ngÆ°á»i dÃ¹ng. ChÃºng tÃ´i chá» lÆ°u trá»¯ tÃªn tÃ i khoáº£n vÃ  email Äá» há» trá»£ khÃ´i phá»¥c máº­t kháº©u vÃ  thÃ´ng bÃ¡o giao dá»ch.</p>
            <p><strong>2. Tuyá»t Äá»i khÃ´ng lÆ°u máº­t kháº©u máº¡ng xÃ£ há»i:</strong> Há» thá»ng khÃ´ng bao giá» ÄÃ²i há»i thÃ´ng tin ÄÄng nháº­p tÃ i khoáº£n Facebook, TikTok hay YouTube cá»§a quÃ½ khÃ¡ch.</p>
            <p><strong>3. MÃ£ hÃ³a an toÃ n:</strong> Má»i dá»¯ liá»u truyá»n táº£i trÃªn há» thá»ng Äá»u ÄÆ°á»£c mÃ£ hÃ³a báº±ng chuáº©n SSL 256-bit cao cáº¥p nháº¥t.</p>
        `;
    } else if (type === 'terms') {
        title.textContent = 'Äiá»u Khoáº£n Dá»ch Vá»¥ (Terms of Service)';
        content.innerHTML = `
            <p><strong>1. Quy Äá»nh sá»­ dá»¥ng:</strong> NgÆ°á»i dÃ¹ng cam káº¿t chá» sá»­ dá»¥ng dá»ch vá»¥ cho cÃ¡c má»¥c ÄÃ­ch há»£p phÃ¡p, khÃ´ng vi pháº¡m phÃ¡p luáº­t hiá»n hÃ nh vÃ  thuáº§n phong má»¹ tá»¥c.</p>
            <p><strong>2. LiÃªn káº¿t cÃ´ng khai:</strong> Trong suá»t quÃ¡ trÃ¬nh há» thá»ng Äang xá»­ lÃ½ ÄÆ¡n hÃ ng, ngÆ°á»i dÃ¹ng tuyá»t Äá»i khÃ´ng Äá»i tÃªn ngÆ°á»i dÃ¹ng (username), khÃ´ng Äá»i link bÃ i viáº¿t hoáº·c chuyá»n tÃ i khoáº£n vá» cháº¿ Äá» riÃªng tÆ°.</p>
            <p><strong>3. TrÃ¡ch nhiá»m ngÆ°á»i dÃ¹ng:</strong> Kiá»m tra ká»¹ ÄÆ°á»ng dáº«n bÃ i viáº¿t trÆ°á»c khi báº¥m xÃ¡c nháº­n táº¡o ÄÆ¡n.</p>
        `;
    } else if (type === 'refund') {
        title.textContent = 'ChÃ­nh SÃ¡ch HoÃ n Tiá»n & Báº£o HÃ nh (Refund Policy)';
        content.innerHTML = `
            <p><strong>1. HoÃ n tiá»n tá»± Äá»ng:</strong> TrÆ°á»ng há»£p ÄÆ¡n hÃ ng bá» lá»i mÃ¡y chá»§ hoáº·c khÃ´ng thá» hoÃ n thÃ nh trong 24h, há» thá»ng sáº½ tá»± Äá»ng hoÃ n 100% tiá»n vá» tÃ i khoáº£n sá» dÆ° cá»§a báº¡n.</p>
            <p><strong>2. Báº£o hÃ nh tá»¥t giáº£m:</strong> CÃ¡c gÃ³i cÃ³ kÃ½ hiá»u "Báº£o hÃ nh" sáº½ ÄÆ°á»£c bÃ¹ Äá»§ sá» lÆ°á»£ng tá»¥t giáº£m hoÃ n toÃ n miá»n phÃ­ trong suá»t thá»i háº¡n báº£o hÃ nh.</p>
            <p><strong>3. TrÆ°á»ng há»£p khÃ´ng há» trá»£ hoÃ n tiá»n:</strong> KhÃ¡ch hÃ ng Äiá»n sai Äá»nh dáº¡ng liÃªn káº¿t, bÃ i viáº¿t bá» xÃ³a hoáº·c vi pháº¡m tiÃªu chuáº©n cá»ng Äá»ng cá»§a ná»n táº£ng.</p>
        `;
    } else if (type === 'api') {
        title.textContent = 'TÃ i Liá»u Káº¿t Ná»i API Cho Äáº¡i LÃ½ (Reseller API)';
        content.innerHTML = `
            <p><strong>1. Chuáº©n káº¿t ná»i:</strong> SUB24H cung cáº¥p REST API tÆ°Æ¡ng thÃ­ch 100% vá»i cÃ¡c mÃ£ nguá»n SMM Panel phá» biáº¿n (SmartStore, Rental, Perfect Panel...).</p>
            <p><strong>2. Endpoint chÃ­nh:</strong> <code>https://api.sub24h.net/v2</code></p>
            <p><strong>3. TÃ­nh nÄng há» trá»£:</strong> ThÃªm ÄÆ¡n hÃ ng (add), Kiá»m tra tráº¡ng thÃ¡i ÄÆ¡n (status), Láº¥y danh sÃ¡ch dá»ch vá»¥ (services), Tra cá»©u sá» dÆ° (balance).</p>
            <p><strong>4. Má»©c chiáº¿t kháº¥u:</strong> Äáº¡i lÃ½ ÄÆ°á»£c hÆ°á»ng má»©c giÃ¡ giáº£m tá»« 5% Äáº¿n 15% theo tá»ng doanh sá» náº¡p hÃ ng thÃ¡ng.</p>
        `;
    }
    modalPolicy.classList.remove('hidden');
}
function closePolicyModal() {
    if (modalPolicy) modalPolicy.classList.add('hidden');
}
document.addEventListener('DOMContentLoaded', () => {
    initLanguageSwitcher();
    renderServices('all');
    renderPricingTable();
    renderFaqs();
    renderLiveMarquee();
    initCostCalculator();
    initGrowthChart();
    updateHeaderUserUI();
    updateActivityPopup();
    setInterval(updateActivityPopup, 7000);
    const btnMobileToggle = document.getElementById('btn-mobile-toggle');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const mobileIcon = document.getElementById('mobile-icon');
    if (btnMobileToggle && mobileDrawer) {
        btnMobileToggle.addEventListener('click', () => {
            const isHidden = mobileDrawer.classList.contains('hidden');
            if (isHidden) {
                mobileDrawer.classList.remove('hidden');
                mobileIcon.className = 'fa-solid fa-xmark text-lg';
            } else {
                mobileDrawer.classList.add('hidden');
                mobileIcon.className = 'fa-solid fa-bars text-lg';
            }
        });
        document.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileDrawer.classList.add('hidden');
                mobileIcon.className = 'fa-solid fa-bars text-lg';
            });
        });
    }
    const btnHeaderLogin = document.getElementById('btn-header-login');
    const btnHeaderRegister = document.getElementById('btn-header-register');
    const btnMobileLogin = document.getElementById('btn-mobile-login');
    const btnMobileRegister = document.getElementById('btn-mobile-register');
    const btnHeroStart = document.getElementById('btn-hero-start');
    const btnFinalRegister = document.getElementById('btn-final-register');
    const btnHeaderTopup = document.getElementById('btn-header-topup');
    const btnHeaderLogout = document.getElementById('btn-header-logout');
    if (btnHeaderLogin) btnHeaderLogin.addEventListener('click', () => openAuthModal(false));
    if (btnMobileLogin) btnMobileLogin.addEventListener('click', () => {
        if (mobileDrawer) mobileDrawer.classList.add('hidden');
        openAuthModal(false);
    });
    if (btnHeaderRegister) btnHeaderRegister.addEventListener('click', () => openAuthModal(true));
    if (btnMobileRegister) btnMobileRegister.addEventListener('click', () => {
        if (mobileDrawer) mobileDrawer.classList.add('hidden');
        openAuthModal(true);
    });
    if (btnHeroStart) btnHeroStart.addEventListener('click', () => openAuthModal(true));
    if (btnFinalRegister) btnFinalRegister.addEventListener('click', () => openAuthModal(true));
    if (btnHeaderTopup) btnHeaderTopup.addEventListener('click', openTopupModal);
    if (btnHeaderLogout) {
        btnHeaderLogout.addEventListener('click', () => {
            currentUser = null;
            try {
                localStorage.removeItem('sub24h_user');
            } catch (e) {}
            updateHeaderUserUI();
            showToast('ÄÃ£ ÄÄng xuáº¥t tÃ i khoáº£n thÃ nh cÃ´ng!');
        });
    }
    const chartBtn7d = document.getElementById('chart-btn-7d');
    const chartBtn30d = document.getElementById('chart-btn-30d');
    const chartBtn90d = document.getElementById('chart-btn-90d');
    function setChartPeriod(period, activeBtn) {
        currentGrowthPeriod = period;
        [chartBtn7d, chartBtn30d, chartBtn90d].forEach(btn => {
            if (btn) btn.className = 'px-2 py-1 rounded text-[11px] font-medium text-slate-400 hover:text-white';
        });
        activeBtn.className = 'px-2 py-1 rounded text-[11px] font-semibold bg-cyan-500/20 text-cyan-300';
        initGrowthChart();
    }
    if (chartBtn7d) chartBtn7d.addEventListener('click', () => setChartPeriod('7d', chartBtn7d));
    if (chartBtn30d) chartBtn30d.addEventListener('click', () => setChartPeriod('30d', chartBtn30d));
    if (chartBtn90d) chartBtn90d.addEventListener('click', () => setChartPeriod('90d', chartBtn90d));
    const filterContainer = document.getElementById('service-filter-buttons');
    if (filterContainer) {
        filterContainer.querySelectorAll('.service-tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const cat = btn.getAttribute('data-cat');
                filterContainer.querySelectorAll('.service-tab-btn').forEach(b => {
                    b.className = 'service-tab-btn px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/5';
                });
                btn.className = 'service-tab-btn active px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20';
                renderServices(cat);
            });
        });
    }
    const pricingFilterContainer = document.getElementById('pricing-category-filters');
    if (pricingFilterContainer) {
        pricingFilterContainer.querySelectorAll('.pricing-pill-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const plat = btn.getAttribute('data-platform');
                setPricingFilter(plat);
            });
        });
    }
    const pricingSearchInput = document.getElementById('pricing-search-input');
    const pricingSortSelect = document.getElementById('pricing-sort-select');
    if (pricingSearchInput) {
        pricingSearchInput.addEventListener('input', (e) => {
            currentPricingSearch = e.target.value;
            renderPricingTable();
        });
    }
    if (pricingSortSelect) {
        pricingSortSelect.addEventListener('change', (e) => {
            currentPricingSort = e.target.value;
            renderPricingTable();
        });
    }
    const tabAuthLogin = document.getElementById('tab-auth-login');
    const tabAuthRegister = document.getElementById('tab-auth-register');
    const formAuth = document.getElementById('form-auth');
    if (tabAuthLogin) tabAuthLogin.addEventListener('click', () => openAuthModal(false));
    if (tabAuthRegister) tabAuthRegister.addEventListener('click', () => openAuthModal(true));
    if (formAuth) {
        formAuth.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('input-auth-username').value;
            currentUser = {
                username: username || 'user_sub24h',
                balance: 100000
            };
            try {
                localStorage.setItem('sub24h_user', JSON.stringify(currentUser));
            } catch (err) {}
            updateHeaderUserUI();
            closeAuthModal();
            showToast(`ChÃ o má»«ng ${currentUser.username} ÄÃ£ ÄÄng nháº­p thÃ nh cÃ´ng!`);
        });
    }
    const btnForgotPass = document.getElementById('btn-forgot-password');
    if (btnForgotPass) {
        btnForgotPass.addEventListener('click', () => {
            showToast('Vui lÃ²ng liÃªn há» CSKH Telegram @sub24h_cskh Äá» Äáº·t láº¡i máº­t kháº©u!', 'info');
        });
    }
    const formOrder = document.getElementById('form-order');
    if (formOrder) {
        formOrder.addEventListener('submit', (e) => {
            e.preventDefault();
            const sId = document.getElementById('modal-order-service').value;
            const link = document.getElementById('modal-order-link').value;
            const qty = document.getElementById('modal-order-quantity').value;
            const found = PRICING_DATA.find(p => p.id === sId);
            closeOrderModal();
            showToast(`Táº¡o ÄÆ¡n thÃ nh cÃ´ng cho ${found ? found.name : 'Dá»ch vá»¥'} (${qty} lÆ°á»£t). Há» thá»ng Äang kÃ­ch hoáº¡t!`);
        });
    }
    const btnAuthClose = document.getElementById('btn-modal-auth-close');
    const btnOrderClose = document.getElementById('btn-modal-order-close');
    const btnTopupClose = document.getElementById('btn-modal-topup-close');
    const btnPolicyClose = document.getElementById('btn-modal-policy-close');
    const btnPolicyOk = document.getElementById('btn-modal-policy-ok');
    if (btnAuthClose) btnAuthClose.addEventListener('click', closeAuthModal);
    if (btnOrderClose) btnOrderClose.addEventListener('click', closeOrderModal);
    if (btnTopupClose) btnTopupClose.addEventListener('click', closeTopupModal);
    if (btnPolicyClose) btnPolicyClose.addEventListener('click', closePolicyModal);
    if (btnPolicyOk) btnPolicyOk.addEventListener('click', closePolicyModal);
    [modalAuth, modalOrder, modalTopup, modalPolicy].forEach(modal => {
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.add('hidden');
                }
            });
        }
    });
    const btnCopySyntax = document.getElementById('btn-copy-syntax');
    if (btnCopySyntax) {
        btnCopySyntax.addEventListener('click', () => {
            const text = 'NAP SUB24H 8899';
            if (navigator.clipboard) {
                navigator.clipboard.writeText(text).then(() => {
                    showToast('ÄÃ£ sao chÃ©p ná»i dung: ' + text);
                }).catch(() => {
                    showToast('Ná»i dung: ' + text);
                });
            } else {
                showToast('Ná»i dung: ' + text);
            }
        });
    }
    const btnPrivacy = document.getElementById('btn-policy-privacy');
    const btnTerms = document.getElementById('btn-policy-terms');
    const btnRefund = document.getElementById('btn-policy-refund');
    const btnApi = document.getElementById('btn-policy-api');
    const btnFaqSupport = document.getElementById('btn-faq-support');
    if (btnPrivacy) btnPrivacy.addEventListener('click', () => openPolicyModal('privacy'));
    if (btnTerms) btnTerms.addEventListener('click', () => openPolicyModal('terms'));
    if (btnRefund) btnRefund.addEventListener('click', () => openPolicyModal('refund'));
    if (btnApi) btnApi.addEventListener('click', () => openPolicyModal('api'));
    if (btnFaqSupport) btnFaqSupport.addEventListener('click', () => {
        window.open('https://t.me/sub24h_cskh', '_blank');
    });
    const btnBackToTop = document.getElementById('btn-back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            btnBackToTop.classList.remove('opacity-0', 'pointer-events-none');
            btnBackToTop.classList.add('opacity-100');
        } else {
            btnBackToTop.classList.remove('opacity-100');
            btnBackToTop.classList.add('opacity-0', 'pointer-events-none');
        }
    });
    if (btnBackToTop) {
        btnBackToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    const btnCloseActivity = document.getElementById('btn-close-activity');
    const liveActivityPopup = document.getElementById('live-activity-popup');
    if (btnCloseActivity && liveActivityPopup) {
        btnCloseActivity.addEventListener('click', () => {
            liveActivityPopup.style.display = 'none';
        });
    }
});
