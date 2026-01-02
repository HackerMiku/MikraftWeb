document.addEventListener('DOMContentLoaded', () => {
    // === 导航栏逻辑 ===
    const header = document.querySelector('.site-header');
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // 移动端菜单切换
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // 简单的菜单图标动画
        const spans = menuToggle.querySelectorAll('span');
        if (menuToggle.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
            spans[1].style.opacity = '0';
            // spans[2] was removed in HTML, checking if we need it back or adjust CSS
            // Current CSS uses 2 spans for menu toggle
            // Wait, let's check CSS. CSS uses 2 spans? 
            // In my CSS write:
            // .menu-toggle span { ... } 
            // The HTML has 2 spans.
            // Let's adjust JS to match 2 spans animation (X shape)
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
        }
    });
    
    // 修正移动端菜单动画逻辑
    // 如果是两个span，怎么变成X？
    // Span 1: rotate 45 deg
    // Span 2: rotate -45 deg
    // 需要调整一下 CSS 或 JS。
    // 简单起见，我会在 CSS 里处理动画，JS 只管 toggle class。

    // 点击链接关闭移动端菜单
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // 点击菜单外部关闭菜单
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !menuToggle.contains(e.target) && navMenu.classList.contains('active')) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // === 主题切换 ===
    const themeToggle = document.getElementById('themeToggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // 初始化主题
    const savedTheme = localStorage.getItem('mikraft-theme');
    if (savedTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
    } else if (!savedTheme && prefersDarkScheme.matches) {
        document.body.setAttribute('data-theme', 'dark');
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.body.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            document.body.removeAttribute('data-theme');
            localStorage.setItem('mikraft-theme', 'light');
        } else {
            document.body.setAttribute('data-theme', 'dark');
            localStorage.setItem('mikraft-theme', 'dark');
        }
    });

    // === 音乐播放器 (简化版) ===
    const musicPlayer = {
        audio: new Audio('BGM/bgm.mp3'),
        playBtn: document.getElementById('playBtn'),
        iconPlay: document.querySelector('.icon-play'),
        iconPause: document.querySelector('.icon-pause'),
        visualizer: document.querySelector('.music-visualizer'),
        isPlaying: false,

        init() {
            this.audio.loop = true;
            this.audio.volume = 0.5;

            this.playBtn.addEventListener('click', () => this.toggle());
            
            // 默认视觉效果暂停
            this.visualizer.style.opacity = '0.5';
            Array.from(this.visualizer.children).forEach(span => span.style.animationPlayState = 'paused');
        },

        toggle() {
            if (this.isPlaying) {
                this.pause();
            } else {
                this.play();
            }
        },

        play() {
            this.audio.play().then(() => {
                this.isPlaying = true;
                this.iconPlay.style.display = 'none';
                this.iconPause.style.display = 'block';
                this.visualizer.style.opacity = '1';
                Array.from(this.visualizer.children).forEach(span => span.style.animationPlayState = 'running');
            }).catch(e => console.error("Playback failed:", e));
        },

        pause() {
            this.audio.pause();
            this.isPlaying = false;
            this.iconPlay.style.display = 'block';
            this.iconPause.style.display = 'none';
            this.visualizer.style.opacity = '0.5';
            Array.from(this.visualizer.children).forEach(span => span.style.animationPlayState = 'paused');
        }
    };

    musicPlayer.init();

    // === 简单的滚动显现动画 ===
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.bento-item, .clean-card, .section-header').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // 添加 visible 类的样式逻辑 (通过 JS 注入，避免修改 CSS)
    const style = document.createElement('style');
    style.textContent = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        .menu-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        .menu-toggle.active span:nth-child(2) {
            transform: rotate(-45deg) translate(5px, -5px);
        }
    `;
    document.head.appendChild(style);

    console.log('Mikraft Minimalist Style Loaded ✨');
});
