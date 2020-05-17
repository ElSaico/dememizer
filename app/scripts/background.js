const blockhash = require('./vendor/blockhash');

function requestImage(request) {
    return {redirectUrl: browser.runtime.getURL('images/cage.jpg')};
    let filter = browser.webRequest.filterResponseData(request.requestId);
    const hash = blockhash.blockhashData(imageData, 16, 2);
    console.log(hash);
    if (hash === '074e6e1e7c1cfe08ff40fe09ec0cf809fc20fe30fe30f830ff30ff30ff708000') {
        return {redirectUrl: browser.runtime.getURL('images/cage.jpg')};
    }
}

browser.webRequest.onBeforeRequest.addListener(
    requestImage,
    {urls: ['https://pbs.twimg.com/media/*'], types: ["image"]},
    ["blocking"]
);
