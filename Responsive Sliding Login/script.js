const loginBtn = document.querySelector('.login');
const signupBtn = document.querySelector('.signup');
const loginBox = document.querySelector('.login-box');
const signupBox = document.querySelector('.signup-box');
const slider = document.querySelector('.slider');

loginBtn.addEventListener('click', () => {
    loginBox.style.display = 'block';
    signupBox.style.display = 'none';
    slider.style.transform = 'translateX(0)';
    slider.style.background = 'hsl(194, 100%, 20%)';
});

signupBtn.addEventListener('click', () => {
    loginBox.style.display = 'none';
    signupBox.style.display = 'block';
    slider.style.transform = 'translateX(100%)';
    slider.style.background = 'hsl(194, 100%, 5%)';
});
