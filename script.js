let expression = "";

// Sound effect setup
const clickSound = new Audio("click.mp3");
clickSound.volume = 0.3;

function press(val) {
  clickSound.currentTime = 0;
  clickSound.play();
  expression += val;
  document.getElementById("display").value = expression;
}

function calculate() {
    clickSound.currentTime = 0;
    clickSound.play();
    try {
      let expr = expression;
  
      // Replace ^ with Math.pow
      expr = expr.replace(/(\d+(?:\\.\\d+)?|\\))\\s*\\^\\s*(\\d+(?:\\.\\d+)?|\\()/g, 'Math.pow($1,$2)');
  
      // Evaluate safely
      const result = eval(expr);
      
      const historyDiv = document.getElementById("history");
      historyDiv.innerHTML += `<div>${expression} = ${result}</div>`;
      
      expression = result.toString();
      document.getElementById("display").value = expression;
    } catch (e) {
      document.getElementById("display").value = "Error";
      expression = "";
    }
  }
  

function clearDisplay() {
  clickSound.currentTime = 0;
  clickSound.play();
  expression = "";
  document.getElementById("display").value = "";
}

// 🎇 Particle background
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
let w = (canvas.width = window.innerWidth);
let h = (canvas.height = window.innerHeight);
let particles = [];

for (let i = 0; i < 100; i++) {
  particles.push({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 2 + 1,
    dx: (Math.random() - 0.5) * 0.3,
    dy: (Math.random() - 0.5) * 0.3,
  });
}

function drawParticles() {
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = `hsla(${Math.floor(Math.random() * 360)}, 100%, 70%, 0.6)`;
  for (let p of particles) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
    p.x += p.dx;
    p.y += p.dy;
    if (p.x < 0 || p.x > w) p.dx *= -1;
    if (p.y < 0 || p.y > h) p.dy *= -1;
  }
  requestAnimationFrame(drawParticles);
}

drawParticles();
window.addEventListener("resize", () => {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
});

// ✨ Floating math symbols
const symbols = ["π", "∑", "∞", "∫", "√", "±", "×", "÷", "∆", "≠"];
const colors = ["cyan", "magenta", "yellow", "lime", "white", "deepskyblue"];
const container = document.querySelector(".symbols");

for (let i = 0; i < 40; i++) {
  const span = document.createElement("span");
  const color = colors[Math.floor(Math.random() * colors.length)];
  span.classList.add("symbol");
  span.innerText = symbols[Math.floor(Math.random() * symbols.length)];
  span.style.color = color;
  span.style.textShadow = `0 0 8px ${color}`;
  span.style.top = `${Math.random() * 100}%`;
  span.style.left = `${Math.random() * 100}%`;
  span.style.fontSize = `${Math.random() * 30 + 20}px`;
  span.style.animationDuration = `${10 + Math.random() * 20}s`;
  container.appendChild(span);
}
// ✅ Keyboard support
document.addEventListener("keydown", (e) => {
    const key = e.key;
  
    if (!isNaN(key) || "+-*/.".includes(key)) {
      press(key);
    } else if (key === "Enter") {
      e.preventDefault(); // Prevent form submission
      calculate();
    } else if (key === "Backspace") {
      expression = expression.slice(0, -1);
      document.getElementById("display").value = expression;
    } else if (key.toLowerCase() === "c") {
      clearDisplay();
    }
  });
  
