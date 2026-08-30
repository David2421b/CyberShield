document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  renderCourses(cursos); // 'cursos' proviene de js/data.js
  initCategoryFilters();
});
