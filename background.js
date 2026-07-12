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
                condition: {
                    initiatorDomains: [chrome.runtime.id],
                    requestDomains: ['www.youtube.com'],
                    resourceTypes: ['sub_frame']
                },
                action: {
                    type: 'modifyHeaders',
                    requestHeaders: [
                        {header: 'referer', operation: 'set', value: chrome.runtime.id}
                    ]
                }
            }
        ]
    });
}

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
    ensureRefererRule();
    ensureOffscreenDocument();
});

chrome.runtime.onStartup.addListener(() => {
    ensureRefererRule();
    ensureOffscreenDocument();
});