document.addEventListener('DOMContentLoaded', () => {

  /**
   * Animação de fade-in e outras animações ao rolar a página
   * --------------------------------------
   */
  // Seleciona todos os elementos que devem ter animação de entrada (fade-in)
  const animatedElements = document.querySelectorAll('.fade-in');

  const observerOptions = {
    root: null, // Observa em relação ao viewport
    rootMargin: '0px',
    threshold: 0.1 // Ativa quando 10% do elemento está visível
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Para de observar depois que a animação acontece
      }
    });
  }, observerOptions);

  animatedElements.forEach(el => observer.observe(el));

  /**
   * Controle do Menu Mobile
   * --------------------------------------
   */
  const menuButton = document.getElementById('menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuLinks = mobileMenu.querySelectorAll('a');

  menuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    // Alterna o ícone do botão
    const icon = menuButton.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
  });

  // Fecha o menu ao clicar em um link
  mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      const icon = menuButton.querySelector('i');
      icon.classList.add('fa-bars');
      icon.classList.remove('fa-times');
    });
  });

  /**
   * Controle das Abas (Tabs) da seção "4 Elementos"
   * --------------------------------------
   */
  const tabLinks = document.querySelectorAll('.tab-link');
  const tabContents = document.querySelectorAll('.tab-content');

  tabLinks.forEach(link => {
    link.addEventListener('click', () => {
      const tabId = link.dataset.tab;

      tabLinks.forEach(l => l.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      link.classList.add('active');
      document.getElementById(tabId).classList.add('active');
    });
  });
});