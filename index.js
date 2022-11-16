
async function getSrc(link) {
    const response = await fetch(link);
    const text = await response.text();
    const html = new DOMParser().parseFromString(text, 'text/html');
    console.log('func called')
    return html.querySelector('.write_div').querySelector('img')?.src;
}

const lists = document.querySelectorAll('.gall_tit');
lists.forEach(list => {
    list.addEventListener('mouseover', async () => {
        const link = list.querySelector('a').href;
        if (list.querySelector('.icon_pic')) {
            const src = await getSrc(link);
            if (src) {
                const img = document.createElement('img');
                img.id = 'loadedImg';
                img.src = src;
                img.style.position = 'absolute';
                img.style.width = `${150}px`;
                img.style.height = `${150}px`;
                img.style.zIndex = 10;
                list.after(img);
            }
        }
    });
    list.addEventListener('mouseout', () => {
        const loadedImg = document.querySelectorAll('#loadedImg');
        loadedImg.forEach(img => img.remove());
    });
})



