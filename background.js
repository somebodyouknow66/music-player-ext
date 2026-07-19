console.log('player is running');


// youtube embed player has started to reject requests that have no refferer so the below rule is for that


let creatingOffscreenDocument;


async function ensureOffscreenDocument() {
    const existingContexts = await chrome.runtime.getContexts({
        contextTypes: ['OFFSCREEN_DOCUMENT']
    });

    if (existingContexts.length > 0) return;

    if (creatingOffscreenDocument) {
        await creatingOffscreenDocument;
        return;
    }


creatingOffscreenDocument = chrome.offscreen.createDocument({
    url: 'offscreen.html',
    reasons: ['AUDIO_PLAYBACK'], 
    justification: 'so, the audio could play in the background'
});

try {
    await creatingOffscreenDocument;
} finally {
    creatingOffscreenDocument = null;
}

}

chrome.runtime.onInstalled.addListener(() => {
    ensureOffscreenDocument();
});

chrome.runtime.onStartup.addListener(() => {
    ensureOffscreenDocument();
});


let playerWindowId = null;

let currentState = {trackUrl: null, isPlaying: false, title: "Nothing is playing"}

chrome.action.onClicked.addListener(async () => {
    if (playerWindowId !== null) {
        try {
            await chrome.windows.remove(playerWindowId);
        } catch (e) {
            // window has been closed by the user
        }
        
        playerWindowId = null;
        return;
    }
    
    const win = await chrome.windows.create({
        url: chrome.runtime.getURL("player.html"), 
        type: "popup",
        width: 290,
        height: 410
        
        
    });
    
    playerWindowId = win.id;
    
    await ensureOffscreenDocument();
    currentState = {  trackUrl: "https://soundcloud.com/forss/flickermood", title:"Flickermood", isPlaying: true };
    chrome.runtime.sendMessage({  target: "offscreen", type: "LOAD_AND_PLAY", trackUrl: currentState.trackUrl }) 
   
    chrome.windows.onRemoved.addListener(function handler(closedId){
        if (closedId === playerWindowId) {
            playerWindowId = null;
            chrome.windows.onRemoved.removeListener(handler);
        }
    });
});

chrome.runtime.onMessage.addListener((msg) => {
    if (!msg || msg.target === "offscreen") return;

    if (msg.type === "TOGGLE_PLAY") {
        currentState.isPlaying = !currentState.isPlaying;
        chrome.runtime.sendMessage({ target: "offscreen", type: currentState.isPlaying ? "PLAY" : "PAUSE" });
        chrome.runtime.sendMessage({type: "STATE_UPDATE", state: currentState});

    }

    if (msg.type === "GET_STATE") {
        sendResponse(currentState);
    }
});