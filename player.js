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
    width: 320px;
    height: 260px;
    border-radius: 20px;
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

const canvas = shadow.getElementById("particles");
const ctx = canvas.getContext("2d");
canvas.width = 320;
canvas.height= 260;

let particles = Array.from({  length: 20  }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.8 + 0.6,
    speed: Math.random() * 0.35 + 0.12
}));

function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const p of particles) {
        p.y -= p.speed;
        if (p.y < -5) p.y = canvas.height + 5;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(124, 255, 196, 0.5)";
        ctx.shadowColor = "rgba(124, 255, 196, 0.9)";
        ctx.shadowBlur = 4;
        ctx.fill();
    }
    requestAnimationFrame(drawParticles);
}

drawParticles();