console.log("player screen script injected");

document.body.style.margin = "0";
document.body.style.background = "transparent";

const app = document.getElementById("app");

app.innerHTML = `

<style>
  * {
    box-sizing: border-box;
    font-family: sans-serif;
    margin: 0;
    padding: 0;
  }

  .panel {
    width: 100vw;
    height: 100vh;
    border-radius: 0;
    background: linear-gradient(180deg, #06120c 0%, #030a06 100%);
    border: 1px solid rgba(120, 255, 190, 0.25); 
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.55), 0 0 40px rgba(20, 255, 140, 0.12);
    color: #d8ffe9;
    position: relative; 
    overflow: hidden; 
    display: flex;
    flex-direction: column; 
    align-items: center;
    padding: 16px;
    }

    canvas {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
    }

    .title {
        position: relative;
        z-index: 1;
        font-size: 14px;
        font-weight: 600;
        margin-top: 4px;
    }

    .artwork { 
        position: relative;
        z-index: 1; 
        width: 100px;
        height: 100px;
        border-radius: 50%;
        background: #0a1c12;
        border: 3px solid rgba(124, 255, 196, 0.35);
        box-shadow: 0 0 24px rgba(20, 255, 140, 0.35);
        margin: 14px 0;
    }

    .timeline {
        position: relative;
        z-index: 1;
        width: 100%;
        height: 4px;
        border-radius: 4px;
        background: rgba(124, 255, 196, 0.18);
        margin-top: 6px;
    }

    .controls{
        position: relative;
        z-index: 1;
        display: flex;
        gap: 20px;
        margin-top: 14px;
    }
    
    .play-btn {
        width: 40px;
        height: 40px;
        border-radius: 50px;
        background: radial-gradient(circle at 35% 30%, #7CFFC4, #14C87A 60%, #0A6B42 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        color: #04140c;
        font-size: 16px;
    }
</style>

<div class="panel">
    <canvas id="particles"></canvas>
    <div class="title">Nothing playing</div>
    <div class="artwork"></div>
    <div class="timeline"></div>
    <div class="controls">
        <div class="play-btn">▶</div>
    </div>
</div>

`

// particles backdrop (i am gonna make it react to the music, stop me if you can)

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
canvas.width = 320;
canvas.height= 260;

const floorY = 254;
const gravity = 0.1;
const baseR = 1.3; 

const particles = Array.from({ length: 70 }, () => ({
 x: 10 + Math.random() * 300,
  y: floorY,
  vy: 0,
  phase: Math.random() * Math.PI * 2,
  freq: 0.01 + Math.random() * 0.02,
  sway: 0.25 + Math.random() * 0.6,
  grounded: true,
  hue: Math.random(),
  nextIdle: Math.random() * 200,
  twinklePhase: Math.random() * Math.PI * 2
}))

let ripples = [];
let flashes = [];
let t = [];

function pulse() {
    particles.forEach((p) => {
        if (p.grounded && Math.random() < 0.4) {
            p.vy - (1.5 + Math.random() * 3.2);
            p.grounded = false
        }
    });
    setTimeout(pulse, 450 + Math.random() * 500);

}

setTimeout(pulse, 300);

function drawParticles() {
  t++;
  ctx.fillStyle = "rgba(3,10,6,0.35)";
  ctx.fillRect(0, 0, 320, 260);

  for (const p of particles) {
    if (p.grounded) {
      p.nextIdle--;
      if (p.nextIdle <= 0 && Math.random() < 0.02) {
        p.vy = -(0.6 + Math.random() * 1.4);
        p.grounded = false;
        p.nextIdle = 100 + Math.random() * 200;
      }
    }
    const wasGrounded = p.grounded;
    p.vy += gravity;
    p.vy *= 0.99;
    p.y += p.vy;
    const floaty = Math.max(0, 1 - Math.abs(p.vy) / 3);
    p.x += Math.sin(t * p.freq + p.phase) * p.sway * (0.4 + floaty * 0.7);
    if (p.x < 6) p.x = 6;
    if (p.x > 314) p.x = 314;
    if (p.y >= floorY) {
      if (!wasGrounded && p.vy > 1.2) {
        const speed = Math.min(1, p.vy / 6);
        ripples.push({ x: p.x, r: 0.5, alpha: 0.28 + speed * 0.2, maxR: 6 + speed * 14, speed: 0.15 + speed * 0.1 });
        flashes.push({ x: p.x, alpha: 0.6 + speed * 0.3 });
      }
      p.y = floorY;
      p.vy = 0;
      p.grounded = true;
    }
    const heightFrac = Math.max(0, (floorY - p.y) / floorY);
    const twinkle = 0.75 + 0.25 * Math.sin(t * 0.05 + p.twinklePhase);
    const r = (baseR + heightFrac * 4.2) * twinkle;
    const alpha = (0.3 + heightFrac * 0.6) * twinkle;
    const stretch = Math.min(0.5, Math.abs(p.vy) / 8);
    const rx = r * (1 - stretch * 0.5);
    const ry = r * (1 + stretch);
    const coreColor = p.hue < 0.5 ? "150,255,220" : "120,255,200";
    const midColor = p.hue < 0.5 ? "0,255,163" : "40,255,180";
    const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 3.5);
    grad.addColorStop(0, "rgba(" + coreColor + "," + alpha + ")");
    grad.addColorStop(0.5, "rgba(" + midColor + "," + alpha * 0.5 + ")");
    grad.addColorStop(1, "rgba(0,179,122,0)");
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.scale(rx / r, ry / r);
    ctx.beginPath();
    ctx.arc(0, 0, r * 3.5, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.beginPath();
    ctx.arc(0, 0, r * 0.55, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(210,255,236," + Math.min(1, 0.5 + alpha * 0.6) + ")";
    ctx.fill();
    ctx.restore();
  }

  flashes = flashes.filter((f) => f.alpha > 0.02);
  for (const f of flashes) {
    f.alpha *= 0.8;
    ctx.beginPath();
    ctx.ellipse(f.x, floorY, 2.5, 0.9, 0, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(220,255,240," + f.alpha + ")";
    ctx.fill();
  }

  ripples = ripples.filter((rp) => rp.alpha > 0.015 && rp.r < rp.maxR + 4);
  for (const rp of ripples) {
    rp.r += (rp.maxR - rp.r) * rp.speed + 0.15;
    rp.alpha *= 0.955;
    const lw = Math.max(0.3, 1 - rp.r / rp.maxR);
    ctx.beginPath();
    ctx.ellipse(rp.x, floorY, rp.r, rp.r * 0.22, 0, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(120,255,210," + rp.alpha + ")";
    ctx.lineWidth = lw;
    ctx.stroke();
  }

  requestAnimationFrame(drawParticles);
}
drawParticles();