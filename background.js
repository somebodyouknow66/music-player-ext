console.log('player is running');


// youtube embed player has started to reject requests that have no refferer so the below rule is for that

async function ensureRefererRule(){
    const RULE_ID = 1;
    await chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: [RULE_ID],

        addRules: [
            {
                id: RULE_ID,
                priority: 1,
                action: {
                    type: 'modifyHeaders', 
                    requestHeaders: [
                        {  header: 'Referer', operation: 'set', value: 'https://www.youtube.com/' }
                    ]
                },
                condition: {
                    urlFilter: '||youtube.com',
                    resourceTypes: ['sub_frame']
                }
            }
        ]
    });
}

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
    ensureRefererRule();
    ensureOffscreenDocument();
});

chrome.runtime.onStartup.addListener(() => {
    ensureRefererRule();
    ensureOffscreenDocument();
});