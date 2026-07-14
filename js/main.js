// ===== i18n 多语言翻译系统 =====
const i18n = {
    currentLang: 'en',
    translations: {
        en: {
            // ===== 通用 =====
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

            // ===== 首页 =====
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

            // ===== 仪表板 =====
            'dashboard.title': 'My Dashboard',
            'dashboard.totalDeposit': 'Total Deposit',
            'dashboard.totalBet': 'Total Bet',
            'dashboard.totalWithdraw': 'Total Withdraw',
            'dashboard.todayTurnover': "Today's Turnover",
            'dashboard.weeklyCommission': 'Weekly Commission',
            'dashboard.availableBalance': 'Available Balance',
            'dashboard.todayLucky': "Today's Lucky Number",
            'dashboard.recentGames': 'Recent Games',
            'dashboard.noData': 'No Data',

            // ===== 充值 =====
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

            // ===== 提现 =====
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

            // ===== 个人中心 =====
            'profile.title': 'Profile',
            'profile.personalInfo': 'Personal Information',
            'profile.settings': 'Settings',
            'profile.notifications': 'Notifications',
            'profile.language': 'Language',
            'profile.security': 'Security',
            'profile.verified': 'Verified',
            'profile.enabled': 'Enabled',

            // ===== 登录 =====
            'login.welcome': 'Welcome Back',
            'login.subtitle': 'Sign in to continue',
            'login.username': 'Username',
            'login.password': 'Password',
            'login.remember': 'Remember Me',
            'login.forgot': 'Forgot Password?',
            'login.noAccount': "Don't have an account?",
            'login.register': 'Register',
            'login.error': 'Invalid username or password!',
            'login.success': 'Login successful! Redirecting...',

            // ===== 注册 =====
            'register.title': 'Create Account',
            'register.subtitle': 'Join us and start winning',
            'register.fullName': 'Full Name',
            'register.email': 'Email Address',
            'register.phone': 'Phone Number',
            'register.username': 'Choose Username',
            'register.password': 'Create Password',
            'register.confirm': 'Confirm Password',
            'register.agree': 'I agree to the',
            'register.terms': 'Terms & Conditions',
            'register.haveAccount': 'Already have an account?',
            'register.login': 'Login',
            'register.error.match': 'Passwords do not match!',
            'register.error.min': 'Password must be at least 6 characters!',
            'register.error.required': 'Please fill in all fields!',
            'register.success': 'Registration successful! Redirecting to login...',
            'register.usernameTaken': 'Username already taken!',

            // ===== 管理员登录 =====
            'admin.login.title': 'Administrator Login',
            'admin.login.subtitle': 'Admin Management System',
            'admin.login.secure': 'Secure Login',
            'admin.login.demo': 'Demo Account: admin / admin123',
            'admin.login.back': 'Back to Home',

            // ===== 管理员仪表板 =====
            'admin.dashboard.title': 'Admin Panel',
            'admin.dashboard.welcome': 'Welcome back',
            'admin.dashboard.administrator': 'Administrator',
            'admin.dashboard.totalUsers': 'Total Users',
            'admin.dashboard.todayDeposit': "Today's Deposit",
            'admin.dashboard.todayWithdraw': "Today's Withdraw",
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

            // ===== 提示消息 =====
            'msg.depositSuccess': 'Deposit RM{amount} successful! Please wait for processing.',
            'msg.depositMin': 'Minimum deposit amount is RM10',
            'msg.withdrawSuccess': 'Withdraw RM{amount} submitted! Estimated 5-10 minutes.',
            'msg.withdrawRange': 'Withdraw amount must be between RM20 - RM888',
            'msg.luckyNumber': 'Your lucky number: {number}\nGood luck!',
            'msg.loginError': 'Invalid username or password!\nHint: admin / admin123',
            'msg.logoutConfirm': 'Are you sure you want to logout?',
        },
        zh: {
            // ===== 通用 =====
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

            // ===== 首页 =====
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

            // ===== 仪表板 =====
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

            // ===== 充值 =====
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

            // ===== 提现 =====
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

            // ===== 个人中心 =====
            'profile.title': '个人中心',
            'profile.personalInfo': '个人信息',
            'profile.settings': '设置',
            'profile.notifications': '通知',
            'profile.language': '语言',
            'profile.security': '安全',
            'profile.verified': '已认证',
            'profile.enabled': '已开启',

            // ===== 登录 =====
            'login.welcome': '欢迎回来',
            'login.subtitle': '登录以继续',
            'login.username': '用户名',
            'login.password': '密码',
            'login.remember': '记住我',
            'login.forgot': '忘记密码？',
            'login.noAccount': '还没有账号？',
            'login.register': '立即注册',
            'login.error': '用户名或密码错误！',
            'login.success': '登录成功！正在跳转...',

            // ===== 注册 =====
            'register.title': '创建账号',
            'register.subtitle': '加入我们，开始赢取奖励',
            'register.fullName': '全名',
            'register.email': '电子邮箱',
            'register.phone': '手机号码',
            'register.username': '选择用户名',
            'register.password': '创建密码',
            'register.confirm': '确认密码',
            'register.agree': '我同意',
            'register.terms': '服务条款',
            'register.haveAccount': '已有账号？',
            'register.login': '去登录',
            'register.error.match': '两次输入的密码不一致！',
            'register.error.min': '密码至少需要6个字符！',
            'register.error.required': '请填写所有字段！',
            'register.success': '注册成功！正在跳转至登录...',
            'register.usernameTaken': '用户名已被占用！',

            // ===== 管理员登录 =====
            'admin.login.title': '管理员登录',
            'admin.login.subtitle': '后台管理系统',
            'admin.login.secure': '安全登录',
            'admin.login.demo': '演示账号: admin / admin123',
            'admin.login.back': '返回首页',

            // ===== 管理员仪表板 =====
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

            // ===== 提示消息 =====
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

// ===== i18n 核心函数 =====
function t(key, params = {}) {
    const lang = i18n.currentLang;
    let text = i18n.translations[lang]?.[key] || i18n.translations['en'][key] || key;

    // 替换参数 {param}
    Object.keys(params).forEach(param => {
        text = text.replace(new RegExp(`\\{${param}\\}`, 'g'), params[param]);
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
    // 更新文本内容
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const params = el.dataset.i18nParams ? JSON.parse(el.dataset.i18nParams) : {};
        el.textContent = t(key, params);
    });

    // 更新 placeholder
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        el.placeholder = t(key);
    });

    // 更新 HTML 内容
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
        const key = el.getAttribute('data-i18n-html');
        const params = el.dataset.i18nParams ? JSON.parse(el.dataset.i18nParams) : {};
        el.innerHTML = t(key, params);
    });

    // 更新标题
    const titleEl = document.querySelector('title');
    if (titleEl) {
        const key = titleEl.getAttribute('data-i18n-title');
        if (key) {
            titleEl.textContent = t(key);
        }
    }
}

function updateLanguageButtons(lang) {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
}

// ===== DOM 就绪后执行 =====
document.addEventListener('DOMContentLoaded', function() {
    // 加载保存的语言
    const savedLang = localStorage.getItem('preferred_language') || 'en';
    setLanguage(savedLang);

    // 语言切换按钮事件
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            setLanguage(this.dataset.lang);
        });
    });

    // ===== 高亮导航（侧边栏 + 底部导航） =====
const currentPage = window.location.pathname.split('/').pop() || 'index.html';

document.querySelectorAll('.nav-item').forEach(item => {
    const href = item.getAttribute('href');
    if (href) {
        // 提取文件名
        let linkPage = href.replace('./', '').replace('/', '').split('?')[0];
        if (!linkPage) linkPage = 'index.html';
        
        // 匹配当前页面
        if (linkPage === currentPage) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    }
});

// 特殊处理：如果是根路径 / 或 /index.html
if (currentPage === 'index.html' || currentPage === '') {
    document.querySelectorAll('.nav-item[href="/"], .nav-item[href="index.html"]').forEach(el => {
        el.classList.add('active');
    });
}

    // ============================================================
    //  管理员登录
    // ============================================================
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

    // ============================================================
    //  充值功能
    // ============================================================
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

    // ============================================================
    //  提现功能
    // ============================================================
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

    // ============================================================
    //  幸运抽奖
    // ============================================================
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

    // ============================================================
    //  管理员登出
    // ============================================================
    const logoutBtn = document.querySelector('#admin-logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (confirm(t('msg.logoutConfirm'))) {
                window.location.href = 'login.html';
            }
        });
    }

    // ============================================================
    //  仪表板幸运数字
    // ============================================================
    const dashLucky = document.querySelector('#dash-lucky');
    if (dashLucky && !luckyBtn) {
        const numbers = Math.floor(1000 + Math.random() * 9000);
        dashLucky.textContent = numbers.toString().split('').join(' ');
    }

    console.log(`✅ DoktorJudi 平台已加载 (${i18n.currentLang})`);
    console.log(`📄 当前页面: ${currentPage}`);
});