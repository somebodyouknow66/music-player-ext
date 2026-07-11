console.log("offscreen document is live");

const TEST_VIDEO_ID = "NyscFyaSwg0";

const iframe = document.createElement("iframe");
iframe.width = "300";
iframe.height = "200";
iframe.src = `https://www.youtube.com/embed/${TEST_VIDEO_ID}`;
document.getElementById("player").appendChild(iframe);
