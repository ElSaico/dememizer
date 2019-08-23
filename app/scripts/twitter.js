const bg = browser.runtime.connect({name: 'twitter'});

const cage = 'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto/gigs2/76703971/original/1b096acf250da0eb35060f90e11098fa82bdcdcf/face-swap-you-with-nicolas-cage.jpg';

const observer = new MutationObserver(mutations => {
    for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
            for (const el of node.querySelectorAll('.media-img')) {
                // send src to bg
                el.setAttribute('src', cage);
            }
            for (const el of node.querySelectorAll('a[rel="mediaPreview"]')) {
                // send src to bg
                el.style.backgroundImage = `url(${cage})`;
            }
        }
    }
});

observer.observe(document.body, {childList: true, subtree: true});
// test hash: '074e6e1e7c1cfe08ff40fe09ec0cf809fc20fe30fe30f830ff30ff30ff708000'
