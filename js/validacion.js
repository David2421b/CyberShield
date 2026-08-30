document.addEventListener('DOMContentLoaded', () => {
  initFormValidation();
});

function initFormValidation() {
    const form = document.getElementById('enrollment-form');
    if (!form) return;

    const fullNameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('email');
    const courseSelect = document.getElementById('courseSelect');
    const messageInput = document.getElementById('message');
    const formStatus = document.getElementById('form-status');

    fullNameInput.addEventListener('input', () => validateFullName());
    emailInput.addEventListener('input', () => validateEmail());
    courseSelect.addEventListener('change', () => validateCourseSelect());
    messageInput.addEventListener('input', () => validateMessage());

    form.addEventListener('submit', (e) => {
    e.preventDefault();

    const isFullNameValid = validateFullName();
    const isEmailValid = validateEmail();
    const isCourseValid = validateCourseSelect();
    const isMessageValid = validateMessage();

    if (isFullNameValid && isEmailValid && isCourseValid && isMessageValid) {
        formStatus.className = 'form-status success';
        formStatus.textContent = '¡Inscripción recibida con éxito! Nos pondremos en contacto contigo pronto.';

        form.reset();

        setTimeout(() => {
            formStatus.className = 'form-status';
            formStatus.textContent = '';
        }, 5000);

    } else {
        formStatus.className = 'form-status error';
        formStatus.textContent = 'Por favor, corrige los errores en el formulario antes de enviar.';
    }
    });
}

function validateFullName() {
    const value = fullNameInput.value.trim();
    if (value === '') {
        setError(fullNameInput, 'error-fullName', 'El nombre completo es obligatorio.');
        return false;
    } else if (value.length < 3) {
        setError(fullNameInput, 'error-fullName', 'El nombre debe tener al menos 3 caracteres.');
        return false;
    } else {
        clearError(fullNameInput, 'error-fullName');
        return true;
    }
}

function  validateEmail(){

}
function validateCourseSelect(){

}

function validateMessage(){

}