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
        width: 340,
        height: 300
    });
    
    playerWindowId = win.id;

    chrome.windows.onRemoved.addListener(function handler(closedId){
        if (closedId === playerWindowId) {
            playerWindowId = null;
            chrome.windows.onRemoved.removeListener(handler);
        }
    });
});