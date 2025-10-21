// 다크모드 토글 기능
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // 로컬 스토리지에서 테마 설정 불러오기
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        updateToggleButton(themeToggle, true);
    }

    // 토글 버튼 클릭 이벤트
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            const isDark = body.classList.contains('dark-mode');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            updateToggleButton(themeToggle, isDark);
        });
    }
}

function updateToggleButton(button, isDark) {
    if (button) {
        button.textContent = isDark ? '☀️ 라이트 모드' : '🌙 다크 모드';
    }
}

// 스크롤 애니메이션
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // 카드 요소들에 옵저버 적용
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => observer.observe(card));

    const blogPosts = document.querySelectorAll('.blog-post');
    blogPosts.forEach(post => observer.observe(post));
}

// 부드러운 스크롤
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// 폼 검증
function initFormValidation() {
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            // 간단한 검증
            if (!name || !email || !message) {
                showMessage('모든 필드를 입력해주세요.', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showMessage('올바른 이메일 주소를 입력해주세요.', 'error');
                return;
            }

            // 성공 메시지
            showMessage('메시지가 성공적으로 전송되었습니다!', 'success');
            contactForm.reset();
        });
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showMessage(message, type) {
    // 기존 메시지 제거
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // 새 메시지 생성
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        padding: 1rem;
        margin-top: 1rem;
        border-radius: 8px;
        background-color: ${type === 'success' ? '#d4edda' : '#f8d7da'};
        color: ${type === 'success' ? '#155724' : '#721c24'};
        border: 1px solid ${type === 'success' ? '#c3e6cb' : '#f5c6cb'};
    `;

    const formContainer = document.querySelector('.form-container');
    if (formContainer) {
        formContainer.appendChild(messageDiv);

        // 3초 후 메시지 제거
        setTimeout(() => {
            messageDiv.remove();
        }, 3000);
    }
}

// 네비게이션 활성화 상태
function initActiveNav() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        const linkPath = new URL(link.href).pathname;
        if (currentPath === linkPath ||
            (currentPath.endsWith('/') && linkPath === currentPath.slice(0, -1)) ||
            (linkPath.endsWith('/') && currentPath === linkPath.slice(0, -1))) {
            link.style.backgroundColor = 'var(--primary-color)';
            link.style.color = 'white';
        }
    });
}

// 스크롤 시 네비게이션 그림자 효과
function initNavScrollEffect() {
    const nav = document.querySelector('nav');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            nav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
        } else {
            nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
}

// 카운터 애니메이션 (숫자가 올라가는 효과)
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// 초기화 함수
function init() {
    initThemeToggle();
    initScrollAnimations();
    initSmoothScroll();
    initFormValidation();
    initActiveNav();
    initNavScrollEffect();

    // 카운터가 있는 경우 애니메이션 적용
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        if (target) {
            animateCounter(counter, target);
        }
    });
}

// DOM이 로드되면 초기화
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
