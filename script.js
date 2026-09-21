(() => {
  const menosMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Visor 3D ---------- */
  const visor = document.getElementById('visor');
  const escenario = document.getElementById('escenario');
  const carga = document.getElementById('carga');
  const barra = document.getElementById('cargaBarra');
  const estado = document.getElementById('estado');
  const btnGiro = document.getElementById('btnGiro');
  const btnVista = document.getElementById('btnVista');
  const btnCompleta = document.getElementById('btnCompleta');

  let orbitaInicial = '0deg 50deg auto';

  const actualizarGiro = (activo) => {
    visor.autoRotate = activo;
    btnGiro.setAttribute('aria-pressed', String(activo));
    btnGiro.textContent = activo ? 'Pausar giro' : 'Reanudar giro';
  };

  if (menosMovimiento) actualizarGiro(false);

  visor.addEventListener('progress', (e) => {
    const p = e.detail.totalProgress;
    barra.style.width = `${Math.round(p * 100)}%`;
    if (p >= 1) carga.classList.add('oculta');
  });

  visor.addEventListener('load', () => {
    // Acerca la cámara según el tamaño real del modelo (funciona aunque cambie la escala)
    // En pantallas verticales (celular) se deja el encuadre automático para que no se corte
    const acercamiento = visor.clientWidth < visor.clientHeight ? 1 : 0.78;
    const radio = visor.getCameraOrbit().radius * acercamiento;
    orbitaInicial = `0deg 50deg ${radio}m`;
    visor.cameraOrbit = orbitaInicial;
    visor.jumpCameraToGoal();
    estado.textContent = '';
    carga.classList.add('oculta');
  });

  visor.addEventListener('error', () => {
    estado.textContent = 'No se pudo cargar la maqueta. Recarga la página o descárgala abajo.';
  });

  btnGiro.addEventListener('click', () => actualizarGiro(!visor.autoRotate));

  btnVista.addEventListener('click', () => {
    visor.cameraOrbit = orbitaInicial;
    visor.cameraTarget = 'auto auto auto';
    visor.fieldOfView = '30deg';
  });

  /* ---------- Pantalla completa ---------- */
  const pedirCompleta = escenario.requestFullscreen || escenario.webkitRequestFullscreen;
  const salirCompleta = document.exitFullscreen || document.webkitExitFullscreen;
  const enCompleta = () => document.fullscreenElement || document.webkitFullscreenElement;

  if (!pedirCompleta) {
    btnCompleta.hidden = true;
  } else {
    btnCompleta.addEventListener('click', () => {
      if (enCompleta()) salirCompleta.call(document);
      else pedirCompleta.call(escenario);
    });
    const alCambiar = () => {
      btnCompleta.textContent = enCompleta() ? 'Salir de pantalla completa' : 'Pantalla completa';
    };
    document.addEventListener('fullscreenchange', alCambiar);
    document.addEventListener('webkitfullscreenchange', alCambiar);
  }

  /* ---------- Video: se reproduce solo cuando está a la vista ---------- */
  const video = document.getElementById('video');
  if (!menosMovimiento && 'IntersectionObserver' in window) {
    new IntersectionObserver((entradas) => {
      entradas.forEach((en) => {
        if (en.isIntersecting) video.play().catch(() => {});
        else video.pause();
      });
    }, { threshold: 0.4 }).observe(video);
  }

  /* ---------- Render ampliado ---------- */
  const lightbox = document.getElementById('lightbox');
  const imgGrande = document.getElementById('imgGrande');

  document.getElementById('btnAmpliar').addEventListener('click', () => {
    if (!imgGrande.src) imgGrande.src = imgGrande.dataset.src; // carga el PNG solo al abrir
    lightbox.showModal();
  });
  document.getElementById('btnCerrar').addEventListener('click', () => lightbox.close());
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) lightbox.close();
  });
})();
