console.log("player screen script injected");

document.body.style.margin = "0";
document.body.style.background = "transparent";
document.body.style.overflow = "hidden";
const app = document.getElementById("app");

app.innerHTML = `
<style>
@import url('https://fonts.googleapis.com/css2?family=Crafty+Girls&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Chelsea+Market&display=swap');

html, body {
    margin: 0;
    padding: 0;
    font-family: "Crafty Girls", cursive;
    overflow: hidden;
  } 

#screen {
  position: relative;
  width: 280px;
  background: #A9D3FF;
  overflow: hidden;
}

#search {
  position: absolute;
  top: 18px;
  right: 5px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(17, 17, 17, 0.35);
  color: #fff;
  cursor: pointer;
  transition: background 0.15s linear, color 0.15s linear, transform 0.3s ease-in-out; 
}

#search:hover {
   color: #A9D3FF;
   transform: scale(1.2);
} 



.playerBody {
  background: #A9D3FF;
  padding: 26px 28px 0 28px;
}

#info {
  text-align: center; 
  margin-bottom: 22px;
}

#title {
  margin: 0 0 6px 0;
  padding: 0;
  font-size: 18px;
  line-height: 22px;
  font-weight: 700;
  color: black; /* color is temporary */
}

#artist {
  margin: 0;
  padding: 0; 
  font-size: 16px;
  font-family: 'Chelsea Market', sans-serif;
  line-height: 22px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.65); /* color is temporary */
  text-transform: lowercase;
}


#coverImage {
  position: relative;
  width: 280px;
  height: 200px;
  background: url("https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExdnN4OHJsZWlodWo3Y2o1cGNja2Y0cTA1ZXY4dXg0ZjNlYnl0bXZ4dSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/pdIK8r02H35TZDHDF0/giphy.gif") center/cover no-repeat;
}

.controls{
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 28px;
  margin-bottom: 22px;
}

.controls button {
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  color: #000;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.15s linear, transform 0.15s linear;
}

.controls button:hover {
  color: #57a4f7;
}

#backward svg,
#forward svg {
  width: 26px;
  height: 26px;
}

#play {
  width: 54px;
  height: 54px;
  border-radius: 50%;
  background: #111111;
  color: #A9D3FF;
  border: 3px solid #111111;
  position: relative;
  overflow: hidden;

}

#play .icon {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff6f6;
  transition: .5s;
  z-index: 3;
}

#play:hover .icon {
  color: #57a4f7;
  transform: rotate(360deg);
}

#play:before {
  content: "";
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  height: 100%;
  background: #A9D3FF;
  transition: .5s;
  z-index: 2;
}

#play:hover:before {
  top: 0;
}

#play svg {
  width: 24px;
  height: 24px;
}


#pauseIcon {
  display: none;
}

#play.is-playing #playIcon {
  display: none;
}

#play.is-playing #pauseIcon {
  display: block;
}

</style>

<div id="screen">
  <div id="coverImage"></div>
  <div id="search">
    <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
>
    <circle cx="11" cy="11" r="7" />
    <line x1="16.65" y1="16.65" x2="21" y2="21" />
</svg>
  </div>
  <div class="playerBody">
    <div id="info">
      <p id="title">Sky Full of Stars</p>
      <p id="artist">Coldplay</p>



  </div>
      <div class="controls">
      <button id="backward" class="control-btn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
         width="24"
          height="24"
        >
          <rect x="5" y="5" width="2" height="14" />
          <path d="M18 5L8 12l10 7z" />
        </svg>
      </button>

      <button id="play">
        <span class="icon">
        <svg
          id="playIcon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          width="24"
          height="24"
        >
          <rect x="6" y="5" width="4" height="14" rx="1" />
          <rect x="14" y="5" width="4" height="14" rx="1" />
        </svg>
        <svg
          id="pauseIcon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        width="24"
          height="24"
        >
          <path d="M8 5v14l11-7z" />
        </svg>
        </span>
      </button>

      <button id="forward" class="control-btn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          width="24"
          height="24"
        >
          <rect x="17" y="5" width="2" height="14" />
          <path d="M6 5l10 7-10 7z" />
        </svg>
      </button>
    </div>
    </div>
</div>



`

const playBtn = document.getElementById('play');
const searchBtn = document.getElementById('search');
const backBtn = document.getElementById('backward');
const forwardBtn = document.getElementById('forward');

playBtn.addEventListener('click', () => {
    playBtn.classList.toggle('is-playing');
    chrome.runtime.sendMessage({  type: 'TOGGLE_PLAY'  });
});

backBtn.addEventListener('click', () => {
    console.log('backward clicked - no playlist found');
})

forwardBtn.addEventListener('click', () => {
    console.log('forward clicked - no playlist found')
})
