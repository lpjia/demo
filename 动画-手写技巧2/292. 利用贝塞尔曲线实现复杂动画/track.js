const ball = document.querySelector('.ball');
const debug = document.querySelector('.debug');
debug.addEventListener('animationend', (e) => {
  e.target.remove();
});
function draw() {
  requestAnimationFrame(draw);
  const rect = ball.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;
  debug.insertAdjacentHTML(
    'beforeend',
    `<div class="dot" style="left: ${x}px; top: ${y}px"></div>`
  );
}

draw();
