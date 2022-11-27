
const getSrc = async (link) => {
    const response = await fetch(link);
    const text = await response.text();
    const html = new DOMParser().parseFromString(text, 'text/html');
    return html.querySelector('.write_div')?.querySelector('img')?.src;
}

const timer = {
    async callTimer(callback,link,list) {
        this.timerID =  setTimeout(async () => {
            const src = await callback(link);
            if (src) {
                const img = document.createElement('img');
                img.id = link;
                img.className = 'loadedImg';
                img.src = src;
                img.style.position = 'absolute';
                img.style.width = '30%';
                img.style.zIndex = 10;
                list.after(img);
            }
        }, 200);
    },

    resetTimer () {
        clearTimeout(this.timerID);
    }
}


const lists = document.querySelectorAll('.gall_tit a');
lists.forEach(list => {
    list.addEventListener('mouseover', async () => {
        const link = list.href;
        const loadedImgs = Array.from(document.querySelectorAll('.loadedImg'));
        const filteredImg = loadedImgs?.filter(i => i.id === link);
        if (filteredImg[0]) {
            filteredImg[0].style.visibility = 'visible';
        } else if (!list.querySelector('.icon_txt')) {
             timer.callTimer(getSrc,link,list);
        }
    });

    list.addEventListener('mouseout', () => {
        const loadedImgs = document.querySelectorAll('.loadedImg');
        loadedImgs?.forEach(i => i.style.visibility = 'hidden');
        timer.resetTimer();
    });
})

clear() 