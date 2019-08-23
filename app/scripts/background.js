const blockhash = require('./vendor/blockhash');

function loadImage(url) {
    let canvas = document.createElement('canvas');
    let context = canvas.getContext('2d');
    let image = document.createElement('img');
    image.onload = function () {
        context.drawImage(image, 0, 0);
        const imageData = context.getImageData(0, 0, image.width, image.height);
        const hash = blockhash.blockhashData(imageData, 16, 2);
        // send hash back
    };
    image.src = url;
}
