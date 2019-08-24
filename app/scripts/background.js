const blockhash = require('./vendor/blockhash');

let portTwitter;

function loadImage(url) {
    console.log('loadImage');
    let canvas = document.createElement('canvas');
    let context = canvas.getContext('2d');
    let image = document.createElement('img');
    image.onload = () => {
        console.log('loadImage onload');
        context.drawImage(image, 0, 0);
        const imageData = context.getImageData(0, 0, image.width, image.height);
        const hash = blockhash.blockhashData(imageData, 16, 2);
        console.log(hash);
        if (hash === '074e6e1e7c1cfe08ff40fe09ec0cf809fc20fe30fe30f830ff30ff30ff708000') {
            portTwitter.postMessage({url: url});
        }
    };
    image.src = url;
}

browser.runtime.onConnect.addListener(port => {
    console.log('background onConnect');
    portTwitter = port;
    portTwitter.onMessage.addListener(message => {
        console.log('background onMessage');
        loadImage(message.src);
    });
});
