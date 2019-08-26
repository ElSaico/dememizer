const port = browser.runtime.connect();

const cage = 'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto/gigs2/76703971/original/1b096acf250da0eb35060f90e11098fa82bdcdcf/face-swap-you-with-nicolas-cage.jpg';

port.onMessage.addListener(message => {
    let el;
    switch (message.source) {
        case "a":
            el = document.querySelector(`.a[data-media-entity-id=${message.entityId}]`);
            el.style.backgroundImage = `url(${cage})`;
            break;
        case "img":
            el = document.querySelector(`.a[data-media-entity-id=${message.entityId}] img`);
            el.setAttribute('src', cage);
            break;
    }
    console.log(el);
});

const observer = new MutationObserver(mutations => {
    for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
            if (node.nodeType !== Node.ELEMENT_NODE) {
                continue;
            }
            for (const el of node.querySelectorAll('.media-img')) {
                port.postMessage({source: 'img', attr: el.getAttribute('src'), entityId: el.parentNode.getAttribute('data-media-entity-id')});
            }
            for (const el of node.querySelectorAll('a[rel="mediaPreview"]')) {
                port.postMessage({source: 'a', attr: el.style.backgroundImage, entityId: el.getAttribute('data-media-entity-id')});
            }
        }
    }
});

observer.observe(document.body, {childList: true, subtree: true});
