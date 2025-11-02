  const canvas = document.getElementById("heroCanvas");
  const ctx = canvas.getContext("2d");

  let particles = [];
  const baseParticleCount = 60;

  function resizeCanvas() {
    const ratio = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * ratio;
    canvas.height = document.querySelector(".home").offsetHeight * ratio;
    ctx.scale(ratio, ratio);

    // Adjust number of particles based on area
    const area = canvas.width * canvas.height;
    const density = Math.max(baseParticleCount, Math.floor(area / 25000));

    if (particles.length < density) {
      for (let i = particles.length; i < density; i++) {
        particles.push(makeParticle());
      }
    } else {
      particles.length = density;
    }
  }

  function makeParticle() {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 1,
      dx: (Math.random() - 0.5) * 0.6,
      dy: (Math.random() - 0.5) * 0.6,
    };
  }

  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      resizeCanvas();
    }, 150);
  });

  resizeCanvas();

  function animate() {
    ctx.fillStyle = "rgba(0,0,0,0.25)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";

    particles.forEach((p) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();

      p.x += p.dx;
      p.y += p.dy;

      if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
    });

    requestAnimationFrame(animate);
  }
  animate();
