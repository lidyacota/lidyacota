/* lidyacota.com — movimiento suave al leer y menú activo */
(function () {
  var reducir = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var elementos = document.querySelectorAll('.revelar, .banda, .retrato');

  // Retraso escalonado entre hermanos para que los bloques entren uno tras otro
  document.querySelectorAll('[data-escalonar]').forEach(function (grupo) {
    var hijos = grupo.querySelectorAll(':scope > .revelar');
    hijos.forEach(function (el, i) { el.style.setProperty('--retraso', Math.min(i * 90, 450) + 'ms'); });
  });

  if (reducir || !('IntersectionObserver' in window)) {
    elementos.forEach(function (el) { el.classList.add('visible'); });
  } else {
    var observador = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('visible'); observador.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    elementos.forEach(function (el) { observador.observe(el); });
  }

  // Borde del encabezado al bajar
  var encabezado = document.querySelector('.encabezado');
  var alBajar = function () { encabezado.classList.toggle('con-borde', window.scrollY > 8); };
  window.addEventListener('scroll', alBajar, { passive: true });
  alBajar();

  // Marca en el menú el rubro que se está leyendo
  var enlaces = Array.prototype.slice.call(document.querySelectorAll('.menu a[href^="#"]'));
  var rubros = enlaces.map(function (a) { return document.querySelector(a.getAttribute('href')); }).filter(Boolean);
  var portada = document.querySelector('.portada');
  if (portada) { rubros.unshift(portada); }
  if ('IntersectionObserver' in window && rubros.length) {
    var espia = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        if (!e.isIntersecting) return;
        enlaces.forEach(function (a) {
          var activo = a.getAttribute('href') === '#' + e.target.id;
          a.classList.toggle('activo', activo);
          if (activo) { a.setAttribute('aria-current', 'location'); } else { a.removeAttribute('aria-current'); }
        });
      });
    }, { rootMargin: '-35% 0px -60% 0px' });
    rubros.forEach(function (r) { espia.observe(r); });
  }
})();
