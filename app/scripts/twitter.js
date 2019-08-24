const bg = browser.runtime.connect();

const cage = 'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto/gigs2/76703971/original/1b096acf250da0eb35060f90e11098fa82bdcdcf/face-swap-you-with-nicolas-cage.jpg';

bg.onMessage.addListener(message => {
    const el = document.querySelector(`.media-img[src=${message.url}]`);
    el.setAttribute('src', cage);
});

const observer = new MutationObserver(mutations => {
    for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
            for (const el of node.querySelectorAll('.media-img')) {
                console.log('media-img');
                bg.postMessage({src: el.getAttribute('src')});
            }
            for (const el of node.querySelectorAll('a[rel="mediaPreview"]')) {
                // send src to bg
                el.style.backgroundImage = `url(${cage})`;
            }
        }
    }
});

observer.observe(document.body, {childList: true, subtree: true});
