
async function getSrc(link) {
    const response = await fetch(link);
    const text = await response.text();
    const html = new DOMParser().parseFromString(text, 'text/html');
    return html.querySelector('.write_div')?.querySelector('img')?.src;
}


const lists = document.querySelectorAll('.gall_tit a');
lists.forEach(list => {
    list.addEventListener('mouseover', async () => {
        const link = list.href;
        if (!list.querySelector('.icon_txt')) {
            const src = await getSrc(link);
            const img = document.createElement('img');
            if (src) {
                img.id = 'loadedImg';
                img.src = src;
                img.style.position = 'absolute';
                img.style.width = '30%';
                img.style.zIndex = 10;
                list.after(img);
            }
        }
    });
    
    list.addEventListener('mouseout', () => {
        const loadedImg = document.querySelector('#loadedImg');
        loadedImg?.remove();
    });
})
