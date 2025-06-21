let expression = "";

function press(val) {
  expression += val;
  document.getElementById("display").value = expression;
}

function clearDisplay() {
  expression = "";
  document.getElementById("display").value = "";
}

function calculate() {
  try {
    // Fix: Use correct regex for exponentiation
    let expr = expression.replace(/(\d+(?:\.\d+)?|\))\s*\^\s*(\d+(?:\.\d+)?|\()/g, 'Math.pow($1,$2)');
    let result = eval(expr);
    document.getElementById("display").value = result;

    // Add to history
    const history = document.getElementById("history");
    const entry = document.createElement("div");
    entry.textContent = `${expression} = ${result}`;
    history.prepend(entry);

    expression = result.toString();
  } catch {
    document.getElementById("display").value = "Error";
    expression = "";
  }
}

function clearHistory() {
  document.getElementById("history").innerHTML = "";
}

document.addEventListener("keydown", (e) => {
  const key = e.key;

  if (!isNaN(key) || "+-*/.^()%".includes(key)) {
    press(key);
  } else if (key === "Enter") {
    e.preventDefault();
    calculate();
  } else if (key === "Backspace") {
    expression = expression.slice(0, -1);
    document.getElementById("display").value = expression;
  } else if (key.toLowerCase() === "c") {
    clearDisplay();
  }
});

// ==== Floating Math Symbols ====
const symbolsContainer = document.querySelector('.symbols');
const mathSymbols = ['+', '-', '×', '÷', '=', '√', 'π', '∑', '∫', '^'];

for (let i = 0; i < 30; i++) {
  const span = document.createElement('span');
  span.className = 'float-symbol';
  span.textContent = mathSymbols[Math.floor(Math.random() * mathSymbols.length)];
  span.style.left = Math.random() * 100 + 'vw';
  span.style.top = Math.random() * 100 + 'vh';
  span.style.animationDuration = 5 + Math.random() * 10 + 's';
  symbolsContainer.appendChild(span);
}

// ==== Particle Background ====
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

function createParticles() {
  for (let i = 0; i < 100; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 1,
      dx: (Math.random() - 0.5),
      dy: (Math.random() - 0.5)
    });
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0,255,255,0.5)';
    ctx.fill();
    p.x += p.dx;
    p.y += p.dy;

    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
  });

  requestAnimationFrame(animateParticles);
}

createParticles();
animateParticles();


  
