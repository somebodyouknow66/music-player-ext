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

