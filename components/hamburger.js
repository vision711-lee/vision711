// ============================================================
// components/hamburger.js - 手机版 Hamburger 菜单组件
// ============================================================

(function injectHamburger() {
    'use strict';

    if (document.querySelector('.hamburger-wrapper')) {
        console.log('Hamburger already injected');
        return;
    }

    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // 检查登录状态
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true' || false;
const playerName = localStorage.getItem('player_name') || localStorage.getItem('login_username') || 'Player';

    // 根据登录状态生成用户区域 HTML
    let userSectionHTML;
if (isLoggedIn) {
    // 从 localStorage 获取真实用户数据
    const userData = JSON.parse(localStorage.getItem('user_data') || '{}');
    const displayName = userData.full_name || userData.username || playerName;
    const vipLevel = userData.vip_level || 0;
    const userId = userData.id || 'N/A';
    
    userSectionHTML = `
    <div class="hamburger-user">
        <div class="avatar"><i class="fas fa-user"></i></div>
        <div class="info">
            <div class="name">${displayName}</div>
            <div class="role">ID: ${userId}</div>
        </div>
        <span class="vip-badge"><i class="fas fa-gem"></i> VIP ${vipLevel}</span>
    </div>
    `;
} else {
        userSectionHTML = `
<div class="hamburger-auth">
    <a href="/login" class="hamburger-login-btn">
        <i class="fas fa-sign-in-alt"></i> <span data-i18n="btn.login">Login</span>
    </a>
    <a href="/register" class="hamburger-register-btn">
        <i class="fas fa-user-plus"></i> Register
    </a>
</div>
`;
    }

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
        <div class="hamburger-header">
            <a href="/" class="logo-metal">
                <canvas id="hamburgerLogoCanvas" width="400" height="200"></canvas>
            </a>
            <span class="hamburger-slogan">Play Safe, Win Safe</span>
        </div>

        ${userSectionHTML}

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

        <div class="hamburger-lang">
            <button class="lang-btn active" data-lang="en">EN</button>
            <button class="lang-btn" data-lang="zh">中文</button>
        </div>

        <div class="hamburger-footer">
            <a href="../admin/login.html">
                <i class="fas fa-shield-alt"></i> <span data-i18n="home.adminLogin">Admin Login</span>
            </a>
        </div>
    </div>
    `;

    const header = document.querySelector('.mobile-header');
    
    if (!header) {
        console.warn('Hamburger: .mobile-header not found, creating one...');
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
            const newHeader = document.createElement('div');
            newHeader.className = 'mobile-header';
            newHeader.innerHTML = `
                <div id="hamburgerPlaceholder"></div>
                <div class="mobile-header-right" id="mobileHeaderRight">
                    <div class="header-auth-buttons" id="headerAuthButtons">
                        <div class="register-wrapper" id="registerWrapper">
                            <a href="/register" class="register-btn">Register</a>
                        </div>
                        <a href="/login" class="login-btn">Login</a>
                    </div>
                    <span class="mobile-header-slogan" id="headerSlogan" style="display:none;">Play Safe, Win Safe</span>
                    <a href="/" class="logo-metal">
                        <canvas id="headerLogoCanvas" width="400" height="200"></canvas>
                    </a>
                </div>
            `;
            mainContent.insertBefore(newHeader, mainContent.firstChild);
            
            const updatedHeader = document.querySelector('.mobile-header');
            const placeholder = updatedHeader.querySelector('#hamburgerPlaceholder');
            if (placeholder) {
                placeholder.outerHTML = template;
            }
        }
    } else {
        const existingWrapper = header.querySelector('.hamburger-wrapper');
        if (!existingWrapper) {
            const oldBadges = header.querySelectorAll('.badge-vip, .lang-switcher, .user-avatar-metal');
            oldBadges.forEach(el => el.remove());
            
            let rightContainer = header.querySelector('.mobile-header-right');
            if (!rightContainer) {
                rightContainer = document.createElement('div');
                rightContainer.className = 'mobile-header-right';
                rightContainer.id = 'mobileHeaderRight';
                
                rightContainer.innerHTML = `
                    <div class="header-auth-buttons" id="headerAuthButtons">
                        <div class="register-wrapper" id="registerWrapper">
                            <a href="/register" class="register-btn">Register</a>
                        </div>
                        <a href="/login" class="login-btn">Login</a>
                    </div>
                    <span class="mobile-header-slogan" id="headerSlogan" style="display:none;">Play Safe, Win Safe</span>
                    <a href="/" class="logo-metal">
                        <canvas id="headerLogoCanvas" width="400" height="200"></canvas>
                    </a>
                `;
                
                header.appendChild(rightContainer);
            }
            
            header.insertAdjacentHTML('afterbegin', template);
        }
    }

    const toggleBtn = document.getElementById('hamburgerToggle');
    const menu = document.getElementById('hamburgerMenu');
    const overlay = document.getElementById('hamburgerOverlay');

    if (!toggleBtn || !menu || !overlay) {
        console.warn('Hamburger: required elements not found');
        return;
    }

    function openMenu() {
    menu.classList.add('open');
    overlay.classList.add('open');
    toggleBtn.classList.add('menu-open');
    document.body.style.overflow = 'hidden';
    document.body.style.overflowX = 'hidden';
    document.documentElement.style.overflowX = 'hidden';
}

function closeMenu() {
    menu.classList.remove('open');
    overlay.classList.remove('open');
    toggleBtn.classList.remove('menu-open');
    document.body.style.overflow = '';
    document.body.style.overflowX = '';
    document.documentElement.style.overflowX = '';
}

    function toggleMenu() {
        if (menu.classList.contains('open')) {
            closeMenu();
        } else {
            openMenu();
        }
    }

    toggleBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMenu();
    });

    overlay.addEventListener('click', closeMenu);

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && menu.classList.contains('open')) {
            closeMenu();
        }
    });

    document.querySelectorAll('.hamburger-nav a').forEach(link => {
        link.addEventListener('click', function() {
            document.querySelectorAll('.hamburger-nav a').forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            setTimeout(closeMenu, 200);
        });
    });

    document.querySelectorAll('.hamburger-nav a').forEach(link => {
        const href = link.getAttribute('href');
        if (href) {
            const linkPage = href.split('/').pop();
            if (currentPage === linkPage || (currentPage === '' && linkPage === 'index.html')) {
                link.classList.add('active');
            }
        }
    });

    document.querySelectorAll('.hamburger-lang .lang-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const lang = this.dataset.lang;
            
            if (typeof setLanguage === 'function') {
                setLanguage(lang);
            } else {
                localStorage.setItem('preferred_language', lang);
                location.reload();
            }
            
            document.querySelectorAll('.hamburger-lang .lang-btn').forEach(b => {
                b.classList.toggle('active', b.dataset.lang === lang);
            });
        });
    });

    function syncLangButtons() {
        const savedLang = localStorage.getItem('preferred_language') || 'en';
        document.querySelectorAll('.hamburger-lang .lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === savedLang);
        });
    }
    syncLangButtons();

    console.log('✅ Hamburger Menu injected successfully');
})();

// ===== 初始化 Hamburger Logo 流光 =====
(function initLogoFlow() {
    const canvas = document.getElementById('hamburgerLogoCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = 'https://jkbpbjhrgbnzexvjvxgt.supabase.co/storage/v1/object/public/hero-background/logo.png';

    let logoData = null;
    let logoWidth = 0;
    let logoHeight = 0;
    let startTime = performance.now();

    img.onload = function() {
        logoWidth = img.width;
        logoHeight = img.height;
        canvas.width = logoWidth;
        canvas.height = logoHeight;

        ctx.drawImage(img, 0, 0);
        logoData = ctx.getImageData(0, 0, logoWidth, logoHeight);
        ctx.clearRect(0, 0, logoWidth, logoHeight);

        requestAnimationFrame(drawFrame);
    };

    function drawFrame(timestamp) {
        if (!logoData) return;

        const elapsed = (timestamp - startTime) / 1000;
        const waitTime = 1.0;
        const scanDuration = 1.2;
        const totalTime = waitTime + scanDuration;

        let timeInCycle = elapsed % totalTime;
        let progress;

        if (timeInCycle < waitTime) {
            progress = -1;
        } else {
            let scanProgress = (timeInCycle - waitTime) / scanDuration;
            progress = 1 - scanProgress;
        }

        ctx.clearRect(0, 0, logoWidth, logoHeight);

        ctx.globalAlpha = 0.9;
        ctx.drawImage(img, 0, 0);
        ctx.globalAlpha = 1.0;

        const imageData = ctx.getImageData(0, 0, logoWidth, logoHeight);
        const data = imageData.data;

        const barWidth = Math.max(20, logoWidth * 0.25);
        const centerX = progress * (logoWidth + barWidth) - barWidth / 2;

        for (let y = 0; y < logoHeight; y++) {
            for (let x = 0; x < logoWidth; x++) {
                const idx = (y * logoWidth + x) * 4;
                const originalAlpha = logoData.data[idx + 3];
                if (originalAlpha < 128) continue;

                const dist = Math.abs(x - centerX);
                if (dist > barWidth / 2) continue;

                const strength = 1 - (dist / (barWidth / 2));
                const alpha = strength * 0.55;

                data[idx]     = Math.min(255, data[idx]     + 180 * alpha);
                data[idx + 1] = Math.min(255, data[idx + 1] + 180 * alpha);
                data[idx + 2] = Math.min(255, data[idx + 2] + 150 * alpha);
            }
        }

        ctx.putImageData(imageData, 0, 0);
        requestAnimationFrame(drawFrame);
    }
})();

// ===== 统一 Logo 流光效果（所有页面右上角） =====
(function initHeaderLogoFlow() {
    const canvas = document.getElementById('headerLogoCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = 'https://jkbpbjhrgbnzexvjvxgt.supabase.co/storage/v1/object/public/hero-background/logo.png';

    let logoData = null;
    let logoWidth = 0;
    let logoHeight = 0;
    let startTime = performance.now();

    img.onload = function() {
        logoWidth = img.width;
        logoHeight = img.height;
        canvas.width = logoWidth;
        canvas.height = logoHeight;

        ctx.drawImage(img, 0, 0);
        logoData = ctx.getImageData(0, 0, logoWidth, logoHeight);
        ctx.clearRect(0, 0, logoWidth, logoHeight);

        requestAnimationFrame(drawHeaderFrame);
    };

    function drawHeaderFrame(timestamp) {
        if (!logoData) return;

        const elapsed = (timestamp - startTime) / 1000;
        const waitTime = 1.0;
        const scanDuration = 1.2;
        const totalTime = waitTime + scanDuration;

        let timeInCycle = elapsed % totalTime;
        let progress;

        if (timeInCycle < waitTime) {
            progress = -1;
        } else {
            let scanProgress = (timeInCycle - waitTime) / scanDuration;
            progress = 1 - scanProgress;
        }

        ctx.clearRect(0, 0, logoWidth, logoHeight);

        ctx.globalAlpha = 0.9;
        ctx.drawImage(img, 0, 0);
        ctx.globalAlpha = 1.0;

        const imageData = ctx.getImageData(0, 0, logoWidth, logoHeight);
        const data = imageData.data;

        const barWidth = Math.max(20, logoWidth * 0.25);
        const centerX = progress * (logoWidth + barWidth) - barWidth / 2;

        for (let y = 0; y < logoHeight; y++) {
            for (let x = 0; x < logoWidth; x++) {
                const idx = (y * logoWidth + x) * 4;
                const originalAlpha = logoData.data[idx + 3];
                if (originalAlpha < 128) continue;

                const dist = Math.abs(x - centerX);
                if (dist > barWidth / 2) continue;

                const strength = 1 - (dist / (barWidth / 2));
                const alpha = strength * 0.55;

                data[idx]     = Math.min(255, data[idx]     + 180 * alpha);
                data[idx + 1] = Math.min(255, data[idx + 1] + 180 * alpha);
                data[idx + 2] = Math.min(255, data[idx + 2] + 150 * alpha);
            }
        }

        ctx.putImageData(imageData, 0, 0);
        requestAnimationFrame(drawHeaderFrame);
    }
})();

// ===== 电脑版 Sidebar Logo 流光效果 =====
(function initSidebarLogoFlow() {
    const canvas = document.getElementById('sidebarLogoCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = 'https://jkbpbjhrgbnzexvjvxgt.supabase.co/storage/v1/object/public/hero-background/logo.png';

    let logoData = null;
    let logoWidth = 0;
    let logoHeight = 0;
    let startTime = performance.now();

    img.onload = function() {
        logoWidth = img.width;
        logoHeight = img.height;
        canvas.width = logoWidth;
        canvas.height = logoHeight;

        ctx.drawImage(img, 0, 0);
        logoData = ctx.getImageData(0, 0, logoWidth, logoHeight);
        ctx.clearRect(0, 0, logoWidth, logoHeight);

        requestAnimationFrame(drawSidebarFrame);
    };

    function drawSidebarFrame(timestamp) {
        if (!logoData) return;

        const elapsed = (timestamp - startTime) / 1000;
        const waitTime = 1.0;
        const scanDuration = 1.2;
        const totalTime = waitTime + scanDuration;

        let timeInCycle = elapsed % totalTime;
        let progress;

        if (timeInCycle < waitTime) {
            progress = -1;
        } else {
            let scanProgress = (timeInCycle - waitTime) / scanDuration;
            progress = 1 - scanProgress;
        }

        ctx.clearRect(0, 0, logoWidth, logoHeight);

        ctx.globalAlpha = 0.9;
        ctx.drawImage(img, 0, 0);
        ctx.globalAlpha = 1.0;

        const imageData = ctx.getImageData(0, 0, logoWidth, logoHeight);
        const data = imageData.data;

        const barWidth = Math.max(20, logoWidth * 0.25);
        const centerX = progress * (logoWidth + barWidth) - barWidth / 2;

        for (let y = 0; y < logoHeight; y++) {
            for (let x = 0; x < logoWidth; x++) {
                const idx = (y * logoWidth + x) * 4;
                const originalAlpha = logoData.data[idx + 3];
                if (originalAlpha < 128) continue;

                const dist = Math.abs(x - centerX);
                if (dist > barWidth / 2) continue;

                const strength = 1 - (dist / (barWidth / 2));
                const alpha = strength * 0.55;

                data[idx]     = Math.min(255, data[idx]     + 180 * alpha);
                data[idx + 1] = Math.min(255, data[idx + 1] + 180 * alpha);
                data[idx + 2] = Math.min(255, data[idx + 2] + 150 * alpha);
            }
        }

        ctx.putImageData(imageData, 0, 0);
        requestAnimationFrame(drawSidebarFrame);
    }
})();

// ===== 手机顶部登录状态控制 =====
(function initHeaderAuth() {
    // 延迟执行，确保元素已加载
    setTimeout(function() {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true' || false;
        
        const authButtons = document.querySelector('.header-auth-buttons');
        const slogan = document.querySelector('.mobile-header-slogan');
        
        console.log('🔍 查找元素:', {
            authButtons: authButtons,
            slogan: slogan,
            isLoggedIn: isLoggedIn
        });
        
        if (authButtons && slogan) {
            if (isLoggedIn) {
                // 隐藏按钮
                authButtons.style.cssText = 'display: none !important';
                
                // 显示 slogan，应用冰川蓝渐变+流光样式
                slogan.style.cssText = `
                    display: inline-block !important;
                    font-family: 'Montserrat', sans-serif !important;
                    font-weight: 800 !important;
                    font-style: italic !important;
                    font-size: 1.0rem !important;
                    letter-spacing: 3px !important;
                    white-space: nowrap !important;
                    background: linear-gradient(120deg, #a0e9ff 0%, #4db8ff 20%, #ffffff 45%, #6fcbff 70%, #a0e9ff 100%) !important;
                    background-size: 300% auto !important;
                    -webkit-background-clip: text !important;
                    -webkit-text-fill-color: transparent !important;
                    background-clip: text !important;
                    animation: shimmerGlacier 5s linear infinite !important;
                    text-shadow: none !important;
                `;
                slogan.textContent = 'Play Safe, Win Safe';
                console.log('✅ 已切换到登录状态（带样式）');
            } else {
                authButtons.style.cssText = 'display: flex !important';
                slogan.style.cssText = 'display: none !important';
                console.log('✅ 已切换到未登录状态');
            }
        } else {
            console.warn('⚠️ 找不到元素');
        }
    }, 200);
})();

// ===== 页面切换时重新检测登录状态 =====
document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
        setTimeout(function() {
            const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
            const authButtons = document.querySelector('.header-auth-buttons');
            const slogan = document.querySelector('.mobile-header-slogan');

            if (authButtons && slogan) {
                if (isLoggedIn) {
                    authButtons.style.cssText = 'display: none !important';
                    slogan.style.cssText = `
                        display: inline-block !important;
                        font-family: 'Montserrat', sans-serif !important;
                        font-weight: 800 !important;
                        font-style: italic !important;
                        font-size: 1.0rem !important;
                        letter-spacing: 3px !important;
                        white-space: nowrap !important;
                        background: linear-gradient(120deg, #a0e9ff 0%, #4db8ff 20%, #ffffff 45%, #6fcbff 70%, #a0e9ff 100%) !important;
                        background-size: 300% auto !important;
                        -webkit-background-clip: text !important;
                        -webkit-text-fill-color: transparent !important;
                        background-clip: text !important;
                        animation: shimmerGlacier 5s linear infinite !important;
                        text-shadow: none !important;
                    `;
                    slogan.textContent = 'Play Safe, Win Safe';
                } else {
                    authButtons.style.cssText = 'display: flex !important';
                    slogan.style.cssText = 'display: none !important';
                }
            }
        }, 100);
    }
});