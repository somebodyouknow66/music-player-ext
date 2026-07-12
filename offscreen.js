console.log("offscreen document is live");

const TEST_VIDEO_ID = "M7lc1UVf-VE";

const iframe = document.createElement("iframe");
iframe.width = "300";
iframe.height = "200";
iframe.src = `https://www.youtube.com/embed/${TEST_VIDEO_ID}`;
document.getElementById("player").appendChild(iframe);
