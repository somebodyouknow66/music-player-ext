console.log("offscreen document is live");

let iframe = null;

function ensurePlayer(trackUrl, autoplay) {
    const src = "https://w.soundcloud.com/player/?url=" + encodeURIComponent(trackUrl) + "&auto_play=" + (autoplay ? "true" : "false");
    if (!iframe) {
        iframe = document.createElement("iframe");
        iframe.width = "300";
        iframe.height = "166";
        iframe.allow = "autoplay";
        iframe.src = src;

        document.getElementById("player").appendChild(iframe);
    } else {
        iframe.src = src;
    }
}

function sendToWidget(method) {
    if (!iframe) return;
    iframe.contentWindow.postMessage(JSON.stringify({ method }), "https://w.soundcloud.com")
}

chrome.runtime.onMessage.addListener((msg) => {
    if (!msg || msg.target !== "offscreen") return;
    switch (msg.type) {
        case "LOAD_AND_PLAY": 
        ensurePlayer(msg.trackUrl, true);
        break;
        case "PLAY": 
        sendToWidget("play");
        break;
        case "PAUSE": 
        sendToWidget("pause");
        break;
    }
});

window.addEventListener("message", (e) => {
    if (e.origin !== "https://w.soundcloud.com") return;
    console.log("from soundcloud:", e.data)
})