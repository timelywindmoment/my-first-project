// 登录系统配置
const CONFIG = {
    maxAttempts: 3,
    delayTime: 1500,
    validUsers: {
        'admin': 'password123',
        'user': 'user123'
    }
};

// 登录系统类
class LoginSystem {
    constructor() {
        this.loginAttempts = 0;
        this.form = document.getElementById('loginForm');
        this.loginBtn = document.getElementById('loginBtn');
        this.errorMessage = document.getElementById('errorMessage');
        this.successMessage = document.getElementById('successMessage');
        this.usernameInput = document.getElementById('username');
        this.passwordInput = document.getElementById('password');

        this.initializeEventListeners();
    }

    initializeEventListeners() {
        // 表单提交事件
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // 输入框焦点效果
        [this.usernameInput, this.passwordInput].forEach(input => {
            input.addEventListener('focus', () => this.handleInputFocus(input));
            input.addEventListener('blur', () => this.handleInputBlur(input));
        });
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        const username = this.usernameInput.value;
        const password = this.passwordInput.value;

        await this.processLogin(username, password);
    }

    async processLogin(username, password) {
        this.setLoadingState(true);

        // 模拟网络延迟
        await this.simulateDelay();

        if (this.validateCredentials(username, password)) {
            await this.handleSuccessfulLogin();
        } else {
            this.handleFailedLogin();
        }

        this.setLoadingState(false);
    }

    validateCredentials(username, password) {
        return CONFIG.validUsers[username] && CONFIG.validUsers[username] === password;
    }

    async handleSuccessfulLogin() {
        this.showMessage('success', 'ACCESS GRANTED! WELCOME TO THE SYSTEM');
        this.loginAttempts = 0;
        
        await this.simulateDelay(1000);
        alert('登录成功！欢迎来到系统！');
        // 这里可以添加实际的页面跳转逻辑
    }

    handleFailedLogin() {
        this.loginAttempts++;
        const remainingAttempts = CONFIG.maxAttempts - this.loginAttempts;
        
        this.showMessage('error', `ACCESS DENIED! ${remainingAttempts} ATTEMPTS REMAINING`);

        if (this.loginAttempts >= CONFIG.maxAttempts) {
            this.lockSystem();
        }
    }

    lockSystem() {
        this.form.querySelectorAll('input').forEach(input => input.disabled = true);
        this.loginBtn.disabled = true;
        this.showMessage('error', 'SYSTEM LOCKED! PLEASE CONTACT ADMINISTRATOR');
    }

    showMessage(type, text) {
        const messageElement = type === 'success' ? this.successMessage : this.errorMessage;
        const otherMessageElement = type === 'success' ? this.errorMessage : this.successMessage;
        
        messageElement.textContent = text;
        messageElement.style.display = 'block';
        otherMessageElement.style.display = 'none';
    }

    setLoadingState(isLoading) {
        this.loginBtn.disabled = isLoading;
        if (isLoading) {
            this.loginBtn.classList.add('loading');
            this.loginBtn.textContent = '';
        } else {
            this.loginBtn.classList.remove('loading');
            this.loginBtn.textContent = 'LOGIN';
        }
    }

    handleInputFocus(input) {
        input.style.boxShadow = '0 0 10px #00ff00';
    }

    handleInputBlur(input) {
        input.style.boxShadow = 'none';
    }

    async simulateDelay(ms = CONFIG.delayTime) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// 初始化登录系统
document.addEventListener('DOMContentLoaded', () => {
    new LoginSystem();
}); 