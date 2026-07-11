// ============================================================
// components/hamburger.js - 手机版 Hamburger 菜单组件
// 使用方式: 在页面底部引入 <script src="components/hamburger.js"></script>
// ============================================================

(function injectHamburger() {
    'use strict';

    // ===== 防止重复注入 =====
    if (document.querySelector('.hamburger-wrapper')) {
        console.log('Hamburger already injected');
        return;
    }

    // ===== 获取当前页面名称 =====
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    // ===== Hamburger HTML 模板 =====
    const template = `
    <!-- Hamburger 按钮 -->
    <div class="hamburger-wrapper">
        <button class="hamburger-btn" id="hamburgerToggle" aria-label="Toggle Menu">
            <span></span>
            <span></span>
            <span></span>
        </button>
    </div>

    <!-- 遮罩层 -->
    <div class="hamburger-overlay" id="hamburgerOverlay"></div>

    <!-- 抽屉菜单 -->
    <div class="hamburger-menu" id="hamburgerMenu">
        <!-- 菜单头部 - Logo 在右侧 -->
        <div class="hamburger-header">
            <a href="/" class="logo-metal">
                <img src="https://jkbpbjhrgbnzexvjvxgt.supabase.co/storage/v1/object/public/hero-background/logo.png" 
                     alt="VISION711" 
                     style="height:36px; width:auto; display:block;">
            </a>
        </div>

        <!-- 用户信息 -->
        <div class="hamburger-user">
            <div class="avatar"><i class="fas fa-user"></i></div>
            <div class="info">
                <div class="name" data-i18n="home.player">Player</div>
                <div class="role">ID: #PL-2026-001</div>
            </div>
            <span class="vip-badge"><i class="fas fa-gem"></i> VIP 2</span>
        </div>

        <!-- 导航链接 -->
        <nav class="hamburger-nav">
            <a href="/" class="nav-item" data-page="index">
                <i class="fas fa-home"></i> <span data-i18n="nav.home">Home</span>
            </a>
            <a href="/dashboard" class="nav-item" data-page="dashboard">
                <i class="fas fa-tachometer-alt"></i> <span data-i18n="nav.dashboard">Dashboard</span>
            </a>
            <a href="/deposit" class="nav-item" data-page="deposit">
                <i class="fas fa-wallet"></i> <span data-i18n="nav.deposit">Deposit</span>
            </a>
            <a href="/withdraw" class="nav-item" data-page="withdraw">
                <i class="fas fa-arrow-up"></i> <span data-i18n="nav.withdraw">Withdraw</span>
            </a>
            <a href="/profile" class="nav-item" data-page="profile">
                <i class="fas fa-user-cog"></i> <span data-i18n="nav.profile">Profile</span>
            </a>
        </nav>

        <!-- 语言切换 -->
        <div class="hamburger-lang">
            <button class="lang-btn active" data-lang="en">EN</button>
            <button class="lang-btn" data-lang="zh">中文</button>
        </div>

        <!-- 底部 -->
        <div class="hamburger-footer">
            <a href="../admin/login.html">
                <i class="fas fa-shield-alt"></i> <span data-i18n="home.adminLogin">Admin Login</span>
            </a>
        </div>
    </div>
    `;

    // ===== 注入 HTML 到页面 =====

    // 查找 mobile-header
    const header = document.querySelector('.mobile-header');
    
    if (!header) {
        console.warn('Hamburger: .mobile-header not found, creating one...');
        // 如果不存在 mobile-header，创建一个
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
            const newHeader = document.createElement('div');
            newHeader.className = 'mobile-header';
            // 插入 Logo
            newHeader.innerHTML = `
                <div id="hamburgerPlaceholder"></div>
                <a href="/" class="logo-metal">
                    <img src="https://jkbpbjhrgbnzexvjvxgt.supabase.co/storage/v1/object/public/hero-background/logo.png" 
                         alt="VISION711" 
                         style="height:32px; width:auto; display:block;">
                </a>
            `;
            mainContent.insertBefore(newHeader, mainContent.firstChild);
            
            // 重新获取 header
            const updatedHeader = document.querySelector('.mobile-header');
            const placeholder = updatedHeader.querySelector('#hamburgerPlaceholder');
            if (placeholder) {
                placeholder.outerHTML = template;
            }
        }
    } else {
        // 在 header 开头插入 Hamburger
        // 先检查是否有 Hamburger 占位，没有则直接插入
        const existingWrapper = header.querySelector('.hamburger-wrapper');
        if (!existingWrapper) {
            // 移除旧的右上角元素（如果存在）
            const oldBadges = header.querySelectorAll('.badge-vip, .lang-switcher, .user-avatar-metal');
            oldBadges.forEach(el => el.remove());
            
            // 插入 Hamburger 模板
            header.insertAdjacentHTML('afterbegin', template);
            
            // 确保 Logo 在右边 (order: 2)
            const logo = header.querySelector('.logo-metal');
            if (logo) {
                logo.style.order = '2';
            }
        }
    }

    // ===== 初始化菜单逻辑 =====
    const toggleBtn = document.getElementById('hamburgerToggle');
    const menu = document.getElementById('hamburgerMenu');
    const overlay = document.getElementById('hamburgerOverlay');

    if (!toggleBtn || !menu || !overlay) {
        console.warn('Hamburger: required elements not found');
        return;
    }

    // ===== 菜单控制函数 =====
    function openMenu() {
        menu.classList.add('open');
        overlay.classList.add('open');
        toggleBtn.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        menu.classList.remove('open');
        overlay.classList.remove('open');
        toggleBtn.classList.remove('active');
        document.body.style.overflow = '';
    }

    function toggleMenu() {
        if (menu.classList.contains('open')) {
            closeMenu();
        } else {
            openMenu();
        }
    }

    // ===== 绑定事件 =====

    // 点击汉堡按钮
    toggleBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMenu();
    });

    // 点击遮罩关闭
    overlay.addEventListener('click', closeMenu);

    // 按 ESC 关闭
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && menu.classList.contains('open')) {
            closeMenu();
        }
    });

    // 点击菜单内链接自动关闭
    document.querySelectorAll('.hamburger-nav a').forEach(link => {
        link.addEventListener('click', function() {
            // 高亮当前页面
            document.querySelectorAll('.hamburger-nav a').forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            // 延迟关闭，让点击事件先完成
            setTimeout(closeMenu, 200);
        });
    });

    // ===== 高亮当前页面 =====
    document.querySelectorAll('.hamburger-nav a').forEach(link => {
        const href = link.getAttribute('href');
        if (href) {
            // 提取文件名进行比较
            const linkPage = href.split('/').pop();
            if (currentPage === linkPage || (currentPage === '' && linkPage === 'index.html')) {
                link.classList.add('active');
            }
        }
    });

    // ===== 语言切换事件绑定 (与 main.js 的 i18n 联动) =====
    document.querySelectorAll('.hamburger-lang .lang-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const lang = this.dataset.lang;
            
            // 调用全局 setLanguage 函数 (来自 main.js)
            if (typeof setLanguage === 'function') {
                setLanguage(lang);
            } else {
                console.warn('setLanguage function not found, reloading page...');
                // 简单 fallback: 保存语言并刷新
                localStorage.setItem('preferred_language', lang);
                location.reload();
            }
            
            // 更新按钮状态
            document.querySelectorAll('.hamburger-lang .lang-btn').forEach(b => {
                b.classList.toggle('active', b.dataset.lang === lang);
            });
        });
    });

    // ===== 同步语言按钮状态 =====
    function syncLangButtons() {
        const savedLang = localStorage.getItem('preferred_language') || 'en';
        document.querySelectorAll('.hamburger-lang .lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === savedLang);
        });
    }
    syncLangButtons();

    console.log('✅ Hamburger Menu injected successfully');
})();