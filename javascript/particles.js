const canvas = document.getElementById("heroCanvas");
const ctx = canvas.getContext("2d");

let particles = [];
const baseParticleCount = 60;

// --- Helper ---
function makeParticle(width, height) {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    r: Math.random() * 2 + 1,
    dx: (Math.random() - 0.5) * 0.6,
    dy: (Math.random() - 0.5) * 0.6,
  };
}

// --- Resize handling ---
function resizeCanvas() {
  const ratio = window.devicePixelRatio || 1;

  // Use logical (CSS) dimensions
  const displayWidth = window.innerWidth;
  const displayHeight = document.querySelector(".home").offsetHeight;

  // Set internal resolution based on ratio
  canvas.width = displayWidth * ratio;
  canvas.height = displayHeight * ratio;

  // Set CSS size to match layout
  canvas.style.width = displayWidth + "px";
  canvas.style.height = displayHeight + "px";

  // Always reset transform before scaling
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.scale(ratio, ratio);

  // Regenerate particles for the new size
  const area = displayWidth * displayHeight;
  const density = Math.max(baseParticleCount, Math.floor(area / 25000));

  particles = [];
  for (let i = 0; i < density; i++) {
    particles.push(makeParticle(displayWidth, displayHeight));
  }
}

let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(resizeCanvas, 150);
});

resizeCanvas();

// --- Animation loop ---
function animate() {
  const width = window.innerWidth;
  const height = document.querySelector(".home").offsetHeight;

  ctx.fillStyle = "rgba(0,0,0,0.25)";
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = "white";
  for (const p of particles) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();

    p.x += p.dx;
    p.y += p.dy;

    if (p.x < 0 || p.x > width) p.dx *= -1;
    if (p.y < 0 || p.y > height) p.dy *= -1;
  }

  requestAnimationFrame(animate);
}
animate();
