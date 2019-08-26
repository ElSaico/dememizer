const blockhash = require('./vendor/blockhash');

let portTwitter;

function loadImage(message) {
    let canvas = document.createElement('canvas');
    let context = canvas.getContext('2d');
    let image = document.createElement('img');
    document.root.appendChild(image);
    image.crossOrigin = 'anonymous';
    image.onload = () => {
        canvas.width = image.width;
        canvas.height = image.height;
        context.drawImage(image, 0, 0);
        const imageData = context.getImageData(0, 0, image.width, image.height);
        const hash = blockhash.blockhashData(imageData, 16, 2);
        console.log(hash);
        if (hash === '074e6e1e7c1cfe08ff40fe09ec0cf809fc20fe30fe30f830ff30ff30ff708000') {
            portTwitter.postMessage(message);
        }
        image.remove();
    };
    switch (message.source) {
        case "a":
            image.src = message.attr.substring(5, message.attr.length - 2);
            break;
        case "img":
            image.src = message.attr;
            break;
    }
}

browser.runtime.onConnect.addListener(port => {
    portTwitter = port;
    portTwitter.onMessage.addListener(message => {
        loadImage(message);
    });
});
