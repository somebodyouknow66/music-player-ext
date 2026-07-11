console.log('player is running');

async function ensureOffscreenDocument() {
    const existing = await chrome.offscreen.hasDocument();
    if (existing) return;


await chrome.offscreen.createDocument({
    url: 'offscreen.html',
    reasons: ['AUDIO_PLAYBACK'], 
    justification: 'so, the audio could play in the background'
});

}

chrome.runtime.onInstalled.addListener(() => {
    ensureOffscreenDocument();
});

chrome.runtime.onStartup.addListener(() => {
    ensureOffscreenDocument();
});