const form = document.getElementById('registerForm');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm_password');
const submitBtn = document.getElementById('submitBtn');
const errorMessages = document.getElementById('errorMessages');

function checkFormValidity() {
    errorMessages.innerHTML = '';

    const errors = [];
    let allFieldsValid = true;

    if (username.value.length < 3) {
        errors.push("Username must be at least 3 characters long.");
        allFieldsValid = false;
    }

    const emailRegex = /^[^@]+@[^@]+\.[a-z]{2,}$/;
    if (!emailRegex.test(email.value)) {
        errors.push("Email must contain a '.' after '@' (e.g., example@domain.com).");
        allFieldsValid = false;
    }

    const emailValid = email.checkValidity();
    if (!emailValid) {
        allFieldsValid = false;
    }

    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (!passwordRegex.test(password.value)) {
        errors.push("Password must be alphanumeric and at least 8 characters long.");
        allFieldsValid = false;
    }

    if (password.value !== confirmPassword.value) {
        errors.push("Passwords do not match.");
        allFieldsValid = false;
    }

    if (errors.length > 0) {
        errorMessages.innerHTML = errors.join('<br>');
    }

    submitBtn.disabled = !allFieldsValid;
}

function validateForm(event) {
    if (submitBtn.disabled) {
        event.preventDefault();
        alert("Please fix the highlighted errors before submitting.");
    }
    event.preventDefault();
    window.location.href = 'game.html';
}

form.addEventListener('input', checkFormValidity);
form.addEventListener('submit', validateForm);