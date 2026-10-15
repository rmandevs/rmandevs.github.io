// Decorative pointer movement; no content or controls depend on it.
(() => {
  const art = document.querySelector('.hero-art');
  const cube = document.querySelector('.hero-cube');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!art || !cube) return;
  art.addEventListener('pointermove', event => {
    if (reduced.matches || event.pointerType !== 'mouse') return;
    const bounds = art.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - .5;
    const y = (event.clientY - bounds.top) / bounds.height - .5;
    cube.style.transform = `translate(${x * 9}px, ${y * 9}px) rotate(${x * 5}deg)`;
  });
  art.addEventListener('pointerleave', () => { cube.style.transform = ''; });
})();
