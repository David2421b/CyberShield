document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initNavigationState();
  populateCourseOptions(cursos);
  renderCourses(cursos); // 'cursos' proviene de js/data.js
  initCategoryFilters();
});

function populateCourseOptions(coursesList) {
  const courseSelect = document.getElementById('courseSelect');
  if (!courseSelect) return;

  courseSelect.innerHTML = '<option value="">-- Selecciona un curso --</option>';

  coursesList.forEach(course => {
    const option = document.createElement('option');
    option.value = course.id;
    option.textContent = course.titulo;
    courseSelect.appendChild(option);
  });
}

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

function initCategoryFilters() {
    const filterContainer = document.getElementById('filter-container');
    if (!filterContainer) return;

    const filterButtons = filterContainer.querySelectorAll('.filter-btn');

    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        const selectedBtn = e.target;
        selectedBtn.classList.add('active');

        const category = selectedBtn.getAttribute('data-category');

        if (category === 'todos') {
            renderCourses(cursos);
        } else {
            const filteredCourses = cursos.filter(course => course.categoria === category);
            renderCourses(filteredCourses);
        }
        });
    });
}

function bindCourseSelectionEvents() {
  const selectButtons = document.querySelectorAll('.btn-select-course');
  const courseSelect = document.getElementById('courseSelect');

  if (!courseSelect) return;

  selectButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const courseId = e.target.getAttribute('data-id');
      courseSelect.value = courseId;
    });
  });
}

// Parte responsive para celular

function initMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!menuToggle || !navMenu) return;

    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
        }
    });
    });
}

function initNavigationState() {
    const sections = document.querySelectorAll('main section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!sections.length || !navLinks.length) return;

    const setActiveLink = (id) => {
        navLinks.forEach(link => {
            const isActive = link.getAttribute('href') === `#${id}`;
            link.classList.toggle('active', isActive);
        });
    };

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const targetId = link.getAttribute('href')?.replace('#', '');
            if (targetId) {
                setActiveLink(targetId);
            }
        });
    });

    const observer = new IntersectionObserver((entries) => {
        const visibleEntries = entries
            .filter(entry => entry.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleEntries.length > 0) {
            setActiveLink(visibleEntries[0].target.id);
        }
    }, {
        rootMargin: '-20% 0px -45% 0px',
        threshold: [0.3, 0.6, 0.9]
    });

    sections.forEach(section => observer.observe(section));
}


