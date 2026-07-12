console.log("offscreen document is live");

const TEST_VIDEO_ID = "M7lc1UVf-VE";

const iframe = document.createElement("iframe");
iframe.width = "300";
iframe.height = "166";
iframe.src = "https://w.soundcloud.com/player/?url=" + encodeURIComponent("https://soundcloud.com/forss/flickermood");
document.getElementById("player").appendChild(iframe);

