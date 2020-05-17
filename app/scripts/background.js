const blockhash = require('./vendor/blockhash');

let replacement;

function requestImage(request) {
    let filter = browser.webRequest.filterResponseData(request.requestId);
    let data = [];

    filter.ondata = event => {
        data.push(event.data);
    };

    // we leverage some DOM wizardry in order to get a raw bitmap from the image file
    let canvas = document.createElement('canvas');
    let context = canvas.getContext('2d');
    let image = document.createElement('img');

    filter.onstop = event => {
        const blob = new Blob(data);
        image.src = URL.createObjectURL(blob);
        image.onload = async () => {
            canvas.width = image.width;
            canvas.height = image.height;
            context.drawImage(image, 0, 0);	
            const imageData = context.getImageData(0, 0, image.width, image.height);	
            const hash = blockhash.blockhashData(imageData, 16, 2);
            if (hash === 'e03fc01fc01fe03fe17ff03ff701e000c4b0bee81ecc0767023352b7dfff8003') {
                // TODO does reading a single chunk suffice?
                filter.write((await replacement.read()).value);
            } else {
                filter.write(await blob.arrayBuffer());
            }

            // cleanup, their roles are finished
            filter.disconnect();
            image.remove();
            canvas.remove();
        }
    }
}

fetch(browser.runtime.getURL('images/cage.jpg')).then(async response => {
    replacement = response.body.getReader();
    browser.webRequest.onBeforeRequest.addListener(
        requestImage,
        {urls: ['https://pbs.twimg.com/media/*'], types: ["image"]},
        ["blocking"]
    );
});
