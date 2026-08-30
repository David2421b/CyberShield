document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  renderCourses(cursos); // 'cursos' proviene de js/data.js
  initCategoryFilters();
});

function renderCourses(coursesList) {
    const coursesGrid = document.getElementById('courses-grid');
    if (!coursesGrid) return;

    coursesGrid.innerHTML = '';

    if (coursesList.length === 0) {
    coursesGrid.innerHTML = `
        <p style="grid-column: 1 / -1; text-align: center; color: var(--text-secondary); padding: 2rem;">
        No se encontraron cursos disponibles en esta categoría.
        </p>
    `;
    return;
    }

    coursesList.forEach(course => {
    const card = document.createElement('article');
    card.classList.add('course-card');

    card.innerHTML = `
        <img src="${course.imagen}" alt="${course.titulo}" class="course-image">
        <div class="course-content">
            <span class="course-category">${course.categoria}</span>
            <h3 class="course-title">${course.titulo}</h3>
            <p class="course-description">${course.descripcion}</p>
            <div class="course-details">
                <span>Nivel: <strong>${course.nivel}</strong></span>
                <span>Duración: <strong>${course.duracion}</strong></span>
            </div>
            <div class="course-details" style="border-top: none; padding-top: 0;">
                <span class="course-price">$${course.precio.toFixed(2)} USD</span>
                <a href="#contacto" class="btn btn-primary btn-select-course" data-id="${course.id}">Inscribirse</a>
            </div>
        </div>
    `;

    coursesGrid.appendChild(card);
    });

    bindCourseSelectionEvents();
}