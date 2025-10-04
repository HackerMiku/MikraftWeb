// 自定义光标
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

if (cursorDot && cursorOutline) {
    document.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;
        
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;
        
        cursorOutline.style.left = `${posX}px`;
        cursorOutline.style.top = `${posY}px`;
    });

    // 光标悬停效果
    document.querySelectorAll('button, a, .showcase-item, .notice-card, .nav-link, .theme-toggle').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorDot.style.transform = 'translate(-50%, -50%) scale(2)';
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorOutline.style.borderColor = 'rgba(74, 222, 128, 0.8)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorOutline.style.borderColor = 'rgba(74, 222, 128, 0.3)';
        });
    });

    // 鼠标离开页面时隐藏光标
    document.addEventListener('mouseleave', () => {
        cursorDot.style.opacity = '0';
        cursorOutline.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
        cursorDot.style.opacity = '1';
        cursorOutline.style.opacity = '1';
    });
}

// 导航栏滚动效果
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.8)';
        navbar.style.boxShadow = 'none';
    }
});

// 主题切换
const themeToggle = document.querySelector('.theme-toggle');
const toggleBall = document.querySelector('.toggle-ball');
let isDark = true; // 默认为暗色主题

themeToggle.addEventListener('click', () => {
    isDark = !isDark;
    
    if (isDark) {
        toggleBall.style.transform = 'translateX(0)';
        document.body.style.background = 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)';
        document.documentElement.style.setProperty('--bg-primary', '#0f172a');
        document.documentElement.style.setProperty('--text-primary', '#e2e8f0');
    } else {
        toggleBall.style.transform = 'translateX(30px)';
        document.body.style.background = 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)';
        document.documentElement.style.setProperty('--bg-primary', '#ffffff');
        document.documentElement.style.setProperty('--text-primary', '#1a1a2e');
    }
});

// 平滑滚动到指定区域
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// 按钮点击波纹效果
document.querySelectorAll('.btn-primary, .btn-secondary, .join-button').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// 添加波纹样式
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .btn-primary, .btn-secondary, .join-button {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// 展示项目点击效果
document.querySelectorAll('.showcase-item').forEach(item => {
    item.addEventListener('click', () => {
        // 添加点击动画
        item.style.transform = 'scale(0.95)';
        setTimeout(() => {
            item.style.transform = 'translateY(-10px)';
        }, 150);
        
        // 这里可以添加打开详情页面的逻辑
        console.log('查看项目:', item.dataset.category);
    });
});

// 公告卡片悬停效果
document.querySelectorAll('.notice-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.borderColor = 'rgba(74, 222, 128, 0.5)';
    });
    
    card.addEventListener('mouseleave', () => {
        if (card.classList.contains('important')) {
            card.style.borderColor = 'rgba(251, 191, 36, 0.5)';
        } else {
            card.style.borderColor = 'rgba(74, 222, 128, 0.2)';
        }
    });
});

// 视差滚动效果
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    // 背景球体视差
    const parallaxOrbs = document.querySelectorAll('.gradient-orb, .join-orb');
    parallaxOrbs.forEach((orb, index) => {
        const rate = scrolled * (index + 1) * 0.05;
        orb.style.transform = `translateY(${rate}px)`;
    });
    
    // Minecraft方块动画视差
    const blockAnimation = document.querySelector('.block-animation');
    if (blockAnimation) {
        const rate = scrolled * 0.1;
        blockAnimation.style.transform = `translateY(${rate}px) rotate(${scrolled * 0.1}deg)`;
    }
});

// 页面加载动画
window.addEventListener('load', () => {
    // 淡入动画
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 1s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // 英雄区域动画
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.transform = 'translateY(50px)';
        heroContent.style.opacity = '0';
        heroContent.style.transition = 'all 1s ease';
        
        setTimeout(() => {
            heroContent.style.transform = 'translateY(0)';
            heroContent.style.opacity = '1';
        }, 500);
    }
    
    // 悬浮卡片动画
    const floatingCards = document.querySelectorAll('.floating-card');
    floatingCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(100px)';
        card.style.transition = 'all 1s ease';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 800 + index * 200);
    });
});

// 键盘快捷键
document.addEventListener('keydown', (e) => {
    // 按 T 键切换主题
    if (e.key === 't' || e.key === 'T') {
        themeToggle.click();
    }
    
    // 按空格键触发特殊效果
    if (e.code === 'Space') {
        e.preventDefault();
        createMinecraftExplosion();
    }
    
    // 按数字键快速导航
    if (e.key >= '1' && e.key <= '5') {
        const sections = ['hero', 'about', 'gallery', 'notices', 'join'];
        const sectionIndex = parseInt(e.key) - 1;
        if (sections[sectionIndex]) {
            scrollToSection(sections[sectionIndex]);
        }
    }
});

// Minecraft风格爆炸效果
function createMinecraftExplosion() {
    const colors = ['#4ade80', '#22c55e', '#f59e0b', '#d97706', '#3b82f6', '#1d4ed8', '#dc2626', '#991b1b'];
    const blockEmojis = ['🟫', '🟩', '🟦', '🟪', '🟨', '🟧', '🟥'];
    
    for (let i = 0; i < 25; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = '50%';
        particle.style.top = '50%';
        particle.style.width = '20px';
        particle.style.height = '20px';
        particle.style.fontSize = '16px';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '10000';
        particle.textContent = blockEmojis[Math.floor(Math.random() * blockEmojis.length)];
        
        const angle = (Math.PI * 2 * i) / 25;
        const velocity = 150 + Math.random() * 150;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        particle.style.animation = `minecraft-explosion 2s ease-out forwards`;
        
        document.body.appendChild(particle);
        
        // 动画关键帧
        const keyframes = `
            @keyframes minecraft-explosion {
                0% {
                    transform: translate(-50%, -50%) scale(1) rotate(0deg);
                    opacity: 1;
                }
                100% {
                    transform: translate(calc(-50% + ${vx}px), calc(-50% + ${vy}px)) scale(0) rotate(720deg);
                    opacity: 0;
                }
            }
        `;
        
        const style = document.createElement('style');
        style.textContent = keyframes;
        document.head.appendChild(style);
        
        setTimeout(() => {
            particle.remove();
            style.remove();
        }, 2000);
    }
    
    // 添加屏幕震动效果
    document.body.style.animation = 'screen-shake 0.5s ease-in-out';
    setTimeout(() => {
        document.body.style.animation = '';
    }, 500);
}

// 屏幕震动动画
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
    @keyframes screen-shake {
        0%, 100% { transform: translateX(0); }
        10% { transform: translateX(-5px); }
        20% { transform: translateX(5px); }
        30% { transform: translateX(-3px); }
        40% { transform: translateX(3px); }
        50% { transform: translateX(-2px); }
        60% { transform: translateX(2px); }
        70% { transform: translateX(-1px); }
        80% { transform: translateX(1px); }
        90% { transform: translateX(0); }
    }
`;
document.head.appendChild(shakeStyle);

// 移除光标相关事件监听器

// 滚动进度指示器
const createScrollProgress = () => {
    const progressBar = document.createElement('div');
    progressBar.style.position = 'fixed';
    progressBar.style.top = '0';
    progressBar.style.left = '0';
    progressBar.style.width = '0%';
    progressBar.style.height = '3px';
    progressBar.style.background = 'linear-gradient(90deg, #4ade80, #22c55e)';
    progressBar.style.zIndex = '10001';
    progressBar.style.transition = 'width 0.1s ease';
    
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
};

createScrollProgress();

// 导航链接活跃状态
function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// 响应式导航菜单（移动端）
const createMobileMenu = () => {
    if (window.innerWidth <= 768) {
        const navbar = document.querySelector('.navbar');
        const navLinks = document.querySelector('.nav-links');
        
        // 添加汉堡菜单按钮
        if (!document.querySelector('.menu-toggle')) {
            const menuToggle = document.createElement('button');
            menuToggle.className = 'menu-toggle';
            menuToggle.innerHTML = '☰';
            menuToggle.style.cssText = `
                background: none;
                border: none;
                font-size: 20px;
                cursor: pointer;
                color: #e2e8f0;
                display: block;
            `;
            
            navbar.appendChild(menuToggle);
            
            menuToggle.addEventListener('click', () => {
                navLinks.classList.toggle('mobile-open');
                menuToggle.innerHTML = navLinks.classList.contains('mobile-open') ? '✕' : '☰';
            });
        }
    }
};

window.addEventListener('resize', createMobileMenu);
createMobileMenu();

// 添加移动端菜单样式
const mobileMenuStyle = document.createElement('style');
mobileMenuStyle.textContent = `
    @media (max-width: 768px) {
        .nav-links {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: rgba(15, 23, 42, 0.95);
            backdrop-filter: blur(20px);
            flex-direction: column;
            padding: 20px;
            transform: translateY(-100%);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
        
        .nav-links.mobile-open {
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
        }
        
        .menu-toggle {
            display: block !important;
        }
        
        .nav-link.active {
            color: #4ade80;
            background: rgba(74, 222, 128, 0.1);
            padding: 8px 16px;
            border-radius: 8px;
        }
    }
`;
document.head.appendChild(mobileMenuStyle);

// 添加活跃导航样式
const activeNavStyle = document.createElement('style');
activeNavStyle.textContent = `
    .nav-link.active {
        color: #4ade80;
        position: relative;
    }
    
    .nav-link.active::after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 0;
        width: 100%;
        height: 2px;
        background: #4ade80;
        border-radius: 1px;
    }
`;
document.head.appendChild(activeNavStyle);

console.log('🎮 Mikraft - 温馨小窝已加载完成！');
console.log('💡 快捷键：');
console.log('   T - 切换主题');
console.log('   空格 - Minecraft爆炸效果');
console.log('   1-5 - 快速导航到各个区域');
console.log('🏗️ 功能特色：');
console.log('   - Minecraft风格设计');
console.log('   - 服务器公告展示');
console.log('   - 作品画廊');
console.log('   - 加入指南');
console.log('   - 响应式设计');