// ===== i18n Translation System =====
const i18n = {
    currentLang: 'en',
    translations: {
        en: {
            // Common
            'app.name': 'DOKTORJUDI',
            'app.tagline': 'No Deposit Free Credit',
            'nav.home': 'Home',
            'nav.dashboard': 'Dashboard',
            'nav.deposit': 'Deposit',
            'nav.withdraw': 'Withdraw',
            'nav.profile': 'Profile',
            'btn.deposit': 'Deposit',
            'btn.withdraw': 'Withdraw',
            'btn.submit': 'Submit',
            'btn.login': 'Login',
            'btn.logout': 'Logout',
            'btn.cancel': 'Cancel',
            'btn.save': 'Save',
            'btn.draw': 'Draw',
            'btn.viewMore': 'View More',
            'btn.downloadApp': 'Download App for Better Experience',
            'badge.free25': 'FREE25',
            'badge.vip': 'VIP',
            'badge.online': 'Online',
            'label.balance': 'Balance',
            'label.amount': 'Amount',
            'label.username': 'Username',
            'label.password': 'Password',
            'label.email': 'Email',
            'label.phone': 'Phone',
            'label.registered': 'Registered',
            'label.totalGames': 'Total Games',
            'label.minAmount': 'Min',
            'label.maxAmount': 'Max',
            'label.dailyLimit': 'Daily Limit',
            'label.estimated': 'Estimated',
            'label.status': 'Status',
            'label.success': 'Success',
            'label.pending': 'Pending',
            'label.failed': 'Failed',
            'label.normal': 'Normal',
            'label.connected': 'Connected',
            'label.onlineUsers': 'Online Users',
            'label.peak': 'Peak',
            'label.today': 'Today',
            'label.thisWeek': 'This Week',
            'label.lastLogin': 'Last Login',
            
            // Home Page
            'home.welcome': 'Welcome back',
            'home.player': 'Player',
            'home.balance': 'Balance',
            'home.liveTransaction': 'LIVE TRANSACTION',
            'home.live': 'LIVE',
            'home.luckyDraw': 'Deposit Lucky Draw',
            'home.luckyDesc': 'Every RM20 deposit gets 1 lucky number.',
            'home.luckyNumber': 'Lucky Number',
            'home.drawInfo': 'Daily Draw',
            'home.moreInfo': 'More Info',
            'home.adminLogin': 'Admin Login',
            
            // Dashboard
            'dashboard.title': 'My Dashboard',
            'dashboard.totalDeposit': 'Total Deposit',
            'dashboard.totalBet': 'Total Bet',
            'dashboard.totalWithdraw': 'Total Withdraw',
            'dashboard.todayTurnover': 'Today\'s Turnover',
            'dashboard.weeklyCommission': 'Weekly Commission',
            'dashboard.availableBalance': 'Available Balance',
            'dashboard.todayLucky': 'Today\'s Lucky Number',
            'dashboard.recentGames': 'Recent Games',
            'dashboard.noData': 'No Data',
            
            // Deposit
            'deposit.title': 'Deposit Center',
            'deposit.currentBalance': 'Current Balance',
            'deposit.method': 'Payment Method',
            'deposit.qrTransfer': 'QR / Transfer',
            'deposit.enterAmount': 'Enter deposit amount',
            'deposit.quickAmount': 'Quick Amount',
            'deposit.instantDeposit': 'Instant Deposit',
            'deposit.minDeposit': 'Minimum RM10 · Maximum RM5000',
            'deposit.history': 'Deposit History',
            'deposit.bonus': 'Deposit Bonus',
            'deposit.autoBonus': 'Auto Bonus',
            'deposit.noRecords': 'No Records',
            
            // Withdraw
            'withdraw.title': 'Withdraw',
            'withdraw.availableBalance': 'Available Balance',
            'withdraw.method': 'Withdraw Method',
            'withdraw.bankTransfer': 'Bank Transfer',
            'withdraw.accountName': 'Account Name',
            'withdraw.bankName': 'Bank Name',
            'withdraw.accountNumber': 'Account Number',
            'withdraw.enterAmount': 'Enter withdraw amount',
            'withdraw.submit': 'Submit Withdraw',
            'withdraw.minWithdraw': 'Minimum RM20 · Daily Limit RM888',
            'withdraw.history': 'Withdraw History',
            'withdraw.estimatedTime': 'Estimated Time',
            'withdraw.businessDay': 'Business Day',
            
            // Profile
            'profile.title': 'Profile',
            'profile.personalInfo': 'Personal Information',
            'profile.settings': 'Settings',
            'profile.notifications': 'Notifications',
            'profile.language': 'Language',
            'profile.security': 'Security',
            'profile.verified': 'Verified',
            'profile.enabled': 'Enabled',
            
            // Admin Login
            'admin.login.title': 'Administrator Login',
            'admin.login.subtitle': 'Admin Management System',
            'admin.login.secure': 'Secure Login',
            'admin.login.demo': 'Demo Account: admin / admin123',
            'admin.login.back': 'Back to Home',
            
            // Admin Dashboard
            'admin.dashboard.title': 'Admin Panel',
            'admin.dashboard.welcome': 'Welcome back',
            'admin.dashboard.administrator': 'Administrator',
            'admin.dashboard.totalUsers': 'Total Users',
            'admin.dashboard.todayDeposit': 'Today\'s Deposit',
            'admin.dashboard.todayWithdraw': 'Today\'s Withdraw',
            'admin.dashboard.activeBets': 'Active Bets',
            'admin.dashboard.latestTransactions': 'Latest Transactions',
            'admin.dashboard.systemStatus': 'System Status',
            'admin.dashboard.server': 'Server',
            'admin.dashboard.database': 'Database',
            'admin.dashboard.quickActions': 'Quick Actions',
            'admin.dashboard.addUser': 'Add User',
            'admin.dashboard.transactionReview': 'Transaction Review',
            'admin.dashboard.backToHome': 'Back to Home',
            'admin.dashboard.thisWeek': 'This Week',
            'admin.dashboard.latency': 'Latency',
            'admin.dashboard.connections': 'Connections',
            
            // Messages
            'msg.depositSuccess': 'Deposit RM{amount} successful! Please wait for processing.',
            'msg.depositMin': 'Minimum deposit amount is RM10',
            'msg.withdrawSuccess': 'Withdraw RM{amount} submitted! Estimated 5-10 minutes.',
            'msg.withdrawRange': 'Withdraw amount must be between RM20 - RM888',
            'msg.luckyNumber': 'Your lucky number: {number}\nGood luck!',
            'msg.loginError': 'Invalid username or password!\nHint: admin / admin123',
            'msg.logoutConfirm': 'Are you sure you want to logout?',
        },
        zh: {
            // Common
            'app.name': 'DOKTORJUDI',
            'app.tagline': '无需存款 免费积分',
            'nav.home': '首页',
            'nav.dashboard': '仪表板',
            'nav.deposit': '充值',
            'nav.withdraw': '提现',
            'nav.profile': '我的',
            'btn.deposit': '充值',
            'btn.withdraw': '提现',
            'btn.submit': '提交',
            'btn.login': '登录',
            'btn.logout': '登出',
            'btn.cancel': '取消',
            'btn.save': '保存',
            'btn.draw': '抽奖',
            'btn.viewMore': '查看更多',
            'btn.downloadApp': '下载APP 更好体验',
            'badge.free25': '免费25',
            'badge.vip': 'VIP',
            'badge.online': '在线',
            'label.balance': '余额',
            'label.amount': '金额',
            'label.username': '用户名',
            'label.password': '密码',
            'label.email': '邮箱',
            'label.phone': '手机',
            'label.registered': '注册日期',
            'label.totalGames': '总游戏',
            'label.minAmount': '最低',
            'label.maxAmount': '最高',
            'label.dailyLimit': '每日限额',
            'label.estimated': '预计',
            'label.status': '状态',
            'label.success': '成功',
            'label.pending': '待处理',
            'label.failed': '失败',
            'label.normal': '正常',
            'label.connected': '连接正常',
            'label.onlineUsers': '在线用户',
            'label.peak': '峰值',
            'label.today': '今天',
            'label.thisWeek': '本周',
            'label.lastLogin': '最后登录',
            
            // Home Page
            'home.welcome': '欢迎回来',
            'home.player': '玩家',
            'home.balance': '余额',
            'home.liveTransaction': '实时交易',
            'home.live': '在线',
            'home.luckyDraw': '存款幸运抽奖',
            'home.luckyDesc': '每存款 RM20 可获得 1 个幸运号码。',
            'home.luckyNumber': '幸运号码',
            'home.drawInfo': '每日开奖',
            'home.moreInfo': '了解更多',
            'home.adminLogin': '管理员登录',
            
            // Dashboard
            'dashboard.title': '我的仪表板',
            'dashboard.totalDeposit': '总充值',
            'dashboard.totalBet': '总投注',
            'dashboard.totalWithdraw': '总提现',
            'dashboard.todayTurnover': '今日流水',
            'dashboard.weeklyCommission': '本周佣金',
            'dashboard.availableBalance': '可提现余额',
            'dashboard.todayLucky': '今日幸运数',
            'dashboard.recentGames': '最近游戏',
            'dashboard.noData': '暂无数据',
            
            // Deposit
            'deposit.title': '充值中心',
            'deposit.currentBalance': '当前余额',
            'deposit.method': '充值方式',
            'deposit.qrTransfer': '二维码 / 转账',
            'deposit.enterAmount': '输入充值金额',
            'deposit.quickAmount': '快捷金额',
            'deposit.instantDeposit': '立即充值',
            'deposit.minDeposit': '最低 RM10 · 最高 RM5000',
            'deposit.history': '充值记录',
            'deposit.bonus': '充值红利',
            'deposit.autoBonus': '自动发放',
            'deposit.noRecords': '暂无记录',
            
            // Withdraw
            'withdraw.title': '提现',
            'withdraw.availableBalance': '可提现余额',
            'withdraw.method': '提现方式',
            'withdraw.bankTransfer': '银行转账',
            'withdraw.accountName': '开户姓名',
            'withdraw.bankName': '银行名称',
            'withdraw.accountNumber': '银行卡号',
            'withdraw.enterAmount': '输入提现金额',
            'withdraw.submit': '提交提现',
            'withdraw.minWithdraw': '最低 RM20 · 每日限 RM888',
            'withdraw.history': '提现记录',
            'withdraw.estimatedTime': '预计到账',
            'withdraw.businessDay': '工作日',
            
            // Profile
            'profile.title': '个人中心',
            'profile.personalInfo': '个人信息',
            'profile.settings': '设置',
            'profile.notifications': '通知',
            'profile.language': '语言',
            'profile.security': '安全',
            'profile.verified': '已认证',
            'profile.enabled': '已开启',
            
            // Admin Login
            'admin.login.title': '管理员登录',
            'admin.login.subtitle': '后台管理系统',
            'admin.login.secure': '安全登录',
            'admin.login.demo': '演示账号: admin / admin123',
            'admin.login.back': '返回首页',
            
            // Admin Dashboard
            'admin.dashboard.title': '管理面板',
            'admin.dashboard.welcome': '欢迎回来',
            'admin.dashboard.administrator': '管理员',
            'admin.dashboard.totalUsers': '总用户',
            'admin.dashboard.todayDeposit': '今日充值',
            'admin.dashboard.todayWithdraw': '今日提现',
            'admin.dashboard.activeBets': '活跃投注',
            'admin.dashboard.latestTransactions': '最新交易',
            'admin.dashboard.systemStatus': '系统状态',
            'admin.dashboard.server': '服务器',
            'admin.dashboard.database': '数据库',
            'admin.dashboard.quickActions': '快捷操作',
            'admin.dashboard.addUser': '添加用户',
            'admin.dashboard.transactionReview': '交易审核',
            'admin.dashboard.backToHome': '返回用户首页',
            'admin.dashboard.thisWeek': '本周',
            'admin.dashboard.latency': '延迟',
            'admin.dashboard.connections': '个连接',
            
            // Messages
            'msg.depositSuccess': '充值 RM{amount} 成功！\n请等待处理。',
            'msg.depositMin': '最低充值金额为 RM10',
            'msg.withdrawSuccess': '提现 RM{amount} 已提交！\n预计5-10分钟到账。',
            'msg.withdrawRange': '提现金额需在 RM20 - RM888 之间',
            'msg.luckyNumber': '🎰 您的幸运号码：{number}\n祝您好运！',
            'msg.loginError': '用户名或密码错误！\n提示: admin / admin123',
            'msg.logoutConfirm': '确定要退出后台吗？',
        }
    }
};

// ===== i18n Functions =====
function t(key, params = {}) {
    const lang = i18n.currentLang;
    let text = i18n.translations[lang]?.[key] || i18n.translations['en'][key] || key;
    
    // Replace parameters
    Object.keys(params).forEach(param => {
        text = text.replace(`{${param}}`, params[param]);
    });
    
    return text;
}

function setLanguage(lang) {
    if (!i18n.translations[lang]) return;
    i18n.currentLang = lang;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    updateAllTexts();
    updateLanguageButtons(lang);
    localStorage.setItem('preferred_language', lang);
}

function updateAllTexts() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const params = el.dataset.i18nParams ? JSON.parse(el.dataset.i18nParams) : {};
        el.textContent = t(key, params);
    });
    
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        el.placeholder = t(key);
    });
    
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
        const key = el.getAttribute('data-i18n-html');
        const params = el.dataset.i18nParams ? JSON.parse(el.dataset.i18nParams) : {};
        el.innerHTML = t(key, params);
    });
}

function updateLanguageButtons(lang) {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
}

// ===== DOM Ready =====
document.addEventListener('DOMContentLoaded', function() {
    // Load saved language
    const savedLang = localStorage.getItem('preferred_language') || 'en';
    setLanguage(savedLang);
    
    // Language switcher
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            setLanguage(this.dataset.lang);
        });
    });
    
    // Get current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Highlight navigation
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href && currentPage.includes(href.replace('./', ''))) {
            item.classList.add('active');
        }
    });

    // ===== Admin Login =====
    const loginBtn = document.querySelector('#admin-login-btn');
    if (loginBtn) {
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const username = document.querySelector('#admin-username')?.value;
            const password = document.querySelector('#admin-password')?.value;
            
            if (username === 'admin' && password === 'admin123') {
                window.location.href = 'dashboard.html';
            } else {
                alert(t('msg.loginError'));
            }
        });
    }

    // ===== Deposit =====
    const depositBtn = document.querySelector('#deposit-btn');
    if (depositBtn) {
        depositBtn.addEventListener('click', function() {
            const amount = document.querySelector('#deposit-amount')?.value;
            if (amount && parseFloat(amount) >= 10) {
                alert(t('msg.depositSuccess', { amount }));
            } else {
                alert(t('msg.depositMin'));
            }
        });
    }

    // ===== Withdraw =====
    const withdrawBtn = document.querySelector('#withdraw-btn');
    if (withdrawBtn) {
        withdrawBtn.addEventListener('click', function() {
            const amount = document.querySelector('#withdraw-amount')?.value;
            if (amount && parseFloat(amount) >= 20 && parseFloat(amount) <= 888) {
                alert(t('msg.withdrawSuccess', { amount }));
            } else {
                alert(t('msg.withdrawRange'));
            }
        });
    }

    // ===== Lucky Draw =====
    const luckyBtn = document.querySelector('#lucky-draw-btn');
    if (luckyBtn) {
        luckyBtn.addEventListener('click', function() {
            const numbers = Math.floor(1000 + Math.random() * 9000);
            alert(t('msg.luckyNumber', { number: numbers }));
            const box = document.querySelector('#lucky-number');
            if (box) {
                box.textContent = numbers.toString().split('').join(' ');
            }
        });
    }

    // ===== Admin Logout =====
    const logoutBtn = document.querySelector('#admin-logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (confirm(t('msg.logoutConfirm'))) {
                window.location.href = 'login.html';
            }
        });
    }

    // ===== Update dashboard lucky number =====
    const dashLucky = document.querySelector('#dash-lucky');
    if (dashLucky && !luckyBtn) {
        const numbers = Math.floor(1000 + Math.random() * 9000);
        dashLucky.textContent = numbers.toString().split('').join(' ');
    }

    console.log(`✅ DoktorJudi Platform Loaded (${i18n.currentLang})`);
    console.log(`📄 Current Page: ${currentPage}`);
});

// ===== Carousel 轮播图 =====
(function initCarousel() {
    const track = document.getElementById('carouselTrack');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');
    
    if (!track) return;
    
    let currentIndex = 0;
    const totalSlides = document.querySelectorAll('.carousel-slide').length;
    let autoPlayInterval = null;
    const AUTO_PLAY_DELAY = 4000; // 4秒切换

    function goToSlide(index) {
        if (index < 0) index = totalSlides - 1;
        if (index >= totalSlides) index = 0;
        currentIndex = index;
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // 更新圆点
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }

    function nextSlide() {
        goToSlide(currentIndex + 1);
    }

    function prevSlide() {
        goToSlide(currentIndex - 1);
    }

    // 点击圆点跳转
    dots.forEach((dot) => {
        dot.addEventListener('click', function() {
            const index = parseInt(this.dataset.index);
            goToSlide(index);
            resetAutoPlay();
        });
    });

    // 左右按钮
    if (prevBtn) {
        prevBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            prevSlide();
            resetAutoPlay();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            nextSlide();
            resetAutoPlay();
        });
    }

    // 自动播放
    function startAutoPlay() {
        if (autoPlayInterval) clearInterval(autoPlayInterval);
        autoPlayInterval = setInterval(nextSlide, AUTO_PLAY_DELAY);
    }

    function resetAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            autoPlayInterval = null;
        }
        startAutoPlay();
    }

    // 触摸/滑动支持 (手机)
    let touchStartX = 0;
    let touchEndX = 0;
    const container = document.querySelector('.carousel-container');

    if (container) {
        container.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        container.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            const diff = touchStartX - touchEndX;
            if (Math.abs(diff) > 30) {
                if (diff > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
                resetAutoPlay();
            }
        }, { passive: true });
    }

    // 鼠标悬停暂停自动播放
    if (container) {
        container.addEventListener('mouseenter', function() {
            if (autoPlayInterval) {
                clearInterval(autoPlayInterval);
                autoPlayInterval = null;
            }
        });

        container.addEventListener('mouseleave', function() {
            startAutoPlay();
        });
    }

    // 启动自动播放
    startAutoPlay();

    // 暴露方法给控制台调试
    window.carousel = { goToSlide, nextSlide, prevSlide };
})();