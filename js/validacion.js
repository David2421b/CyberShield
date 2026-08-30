document.addEventListener('DOMContentLoaded', () => {
    initFormValidation();
});

// Configuración centralizada de N8N
const N8N_CONFIG = {
    // URL del Webhook de N8N:
    // - Para modo prueba (Listen for test event): http://localhost:5678/webhook-test/783d7217-4d70-457b-9e60-04d5b3180f6c
    // - Para modo producción (Workflow Active): http://localhost:5678/webhook/783d7217-4d70-457b-9e60-04d5b3180f6c
    webhookUrl: 'http://localhost:5678/webhook-test/783d7217-4d70-457b-9e60-04d5b3180f6c',
    timeoutMs: 12000 // 12 segundos de tiempo límite
};

function getResolvedWebhookUrl() {
    let url = N8N_CONFIG.webhookUrl;
    // Si la página se está ejecutando desde 127.0.0.1, alinear localhost a 127.0.0.1 para evitar discrepancias de origen
    if (window.location.hostname === '127.0.0.1' && url.includes('localhost')) {
        url = url.replace('localhost', '127.0.0.1');
    }
    return url;
}

function initFormValidation() {
    const form = document.getElementById('enrollment-form');
    if (!form) return;

    const fullNameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('email');
    const courseSelect = document.getElementById('courseSelect');
    const messageInput = document.getElementById('message');
    const formStatus = document.getElementById('form-status');
    const submitBtn = form.querySelector('.btn-submit') || form.querySelector('button[type="submit"]');

    const validateFullName = () => {
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
    };

    const validateEmail = () => {
        const value = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (value === '') {
            setError(emailInput, 'error-email', 'El correo electrónico es obligatorio.');
            return false;
        } else if (!emailRegex.test(value)) {
            setError(emailInput, 'error-email', 'Ingresa un correo electrónico válido (ej. usuario@dominio.com).');
            return false;
        } else {
            clearError(emailInput, 'error-email');
            return true;
        }
    };

    const validateCourseSelect = () => {
        const value = courseSelect.value;
        if (value === '') {
            setError(courseSelect, 'error-courseSelect', 'Debes seleccionar un curso de interés.');
            return false;
        } else {
            clearError(courseSelect, 'error-courseSelect');
            return true;
        }
    };

    const validateMessage = () => {
        const value = messageInput.value.trim();
        if (value !== '' && value.length < 10) {
            setError(messageInput, 'error-message', 'El mensaje debe tener al menos 10 caracteres.');
            return false;
        } else {
            clearError(messageInput, 'error-message');
            return true;
        }
    };

    // Validación interactiva en tiempo real
    fullNameInput.addEventListener('input', () => {
        validateFullName();
        clearFormStatus(formStatus);
    });

    emailInput.addEventListener('input', () => {
        validateEmail();
        clearFormStatus(formStatus);
    });

    courseSelect.addEventListener('change', () => {
        validateCourseSelect();
        clearFormStatus(formStatus);
    });

    messageInput.addEventListener('input', () => {
        validateMessage();
        clearFormStatus(formStatus);
    });

    // Manejo de envío del formulario
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const isFullNameValid = validateFullName();
        const isEmailValid = validateEmail();
        const isCourseValid = validateCourseSelect();
        const isMessageValid = validateMessage();

        if (!(isFullNameValid && isEmailValid && isCourseValid && isMessageValid)) {
            formStatus.className = 'form-status error';
            formStatus.textContent = '⚠️ Por favor, corrige los campos marcados en rojo antes de enviar.';
            return;
        }

        const selectedOption = courseSelect.options[courseSelect.selectedIndex];
        const payload = {
            fullName: fullNameInput.value.trim(),
            email: emailInput.value.trim(),
            courseId: courseSelect.value,
            courseTitle: selectedOption ? selectedOption.text : courseSelect.value,
            message: messageInput.value.trim() || 'Sin mensaje adicional',
            submittedAt: new Date().toISOString(),
            source: 'CyberShield Web Platform'
        };

        // Estado de carga visual
        setLoadingState(true, submitBtn, formStatus);

        // Control de Timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), N8N_CONFIG.timeoutMs);

        const targetUrl = getResolvedWebhookUrl();

        try {
            const response = await fetch(targetUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(payload),
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (response.ok) {
                formStatus.className = 'form-status success';
                formStatus.textContent = '✅ ¡Inscripción recibida con éxito! Revisa tu correo electrónico para los detalles del curso.';
                form.reset();

                // Quitar clases de error residuales
                [fullNameInput, emailInput, courseSelect, messageInput].forEach(input => {
                    const group = input.closest('.form-group');
                    if (group) group.classList.remove('error');
                });

                setTimeout(() => {
                    formStatus.className = 'form-status';
                    formStatus.textContent = '';
                }, 7000);
            } else {
                let errorDetails = `Error HTTP ${response.status}`;
                if (response.status === 404) {
                    errorDetails = 'El webhook de N8N devolvió 404. Verifica que el workflow esté guardado y con el switch "Active" encendido en N8N.';
                }
                throw new Error(errorDetails);
            }

        } catch (error) {
            clearTimeout(timeoutId);
            console.error('Error al enviar la inscripción al webhook de N8N:', error);

            formStatus.className = 'form-status error';
            if (error.name === 'AbortError') {
                formStatus.textContent = '⏳ La solicitud tardó demasiado tiempo. Verifica si tu servidor de N8N está encendido y respondiendo.';
            } else if (error.message.includes('Failed to fetch') || error.name === 'TypeError') {
                formStatus.textContent = '❌ No se pudo conectar con N8N en ' + N8N_CONFIG.webhookUrl + '. Asegúrate de que N8N esté iniciado en tu equipo.';
            } else {
                formStatus.textContent = `❌ ${error.message}`;
            }
        } finally {
            setLoadingState(false, submitBtn, formStatus);
        }
    });
}

function setLoadingState(isLoading, submitBtn, formStatus) {
    if (isLoading) {
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.dataset.originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span class="spinner-icon"></span> Enviando...';
        }
        if (formStatus) {
            formStatus.className = 'form-status loading';
            formStatus.innerHTML = '<span class="spinner-icon"></span> Conectando con N8N y registrando inscripción...';
        }
    } else {
        if (submitBtn) {
            submitBtn.disabled = false;
            if (submitBtn.dataset.originalText) {
                submitBtn.innerHTML = submitBtn.dataset.originalText;
            }
        }
    }
}

function clearFormStatus(formStatus) {
    if (formStatus && formStatus.classList.contains('error')) {
        formStatus.className = 'form-status';
        formStatus.textContent = '';
    }
}

function setError(inputElement, errorSpanId, message) {
    const formGroup = inputElement.closest('.form-group');
    const errorSpan = document.getElementById(errorSpanId);

    if (formGroup) {
        formGroup.classList.add('error');
    }
    if (errorSpan) {
        errorSpan.textContent = message;
    }
}

function clearError(inputElement, errorSpanId) {
    const formGroup = inputElement.closest('.form-group');
    const errorSpan = document.getElementById(errorSpanId);

    if (formGroup) {
        formGroup.classList.remove('error');
    }
    if (errorSpan) {
        errorSpan.textContent = '';
    }
}
