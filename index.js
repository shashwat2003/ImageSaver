if (!("images_url" in localStorage)) {
    console.log(true)
    localStorage.setItem("images_url", "[]")
}

imagesLoader()

let navBarSearch = false;

function imagesLoader() {
    let data = JSON.parse(localStorage.getItem('images_url'))
    let gallery = document.getElementById('gallery')
    gallery.innerHTML = '';
    for (let i = 0; i < data.length; i++) {
        gallery.innerHTML += `<img src="${data[i]}" alt="Image at ${i}">`
    }
}

function scroll() {
    let search = document.getElementsByClassName('search')[0];
    let nav_search = document.getElementsByClassName('search_nav')[0];
    if (window.pageYOffset >= search.offsetTop) {
        if (!navBarSearch) {
            navBarSearch = true;
            nav_search.style = 'trasnform: scale(1,1)';
        }
    }
    else {
        if (navBarSearch) {
            navBarSearch = false;
            nav_search.style = 'transform: scale(0,0)';

        }

    }
}


function addImage() {
    fetch(document.getElementById('input').value, { method: 'head' }).then((res) => {
        console.log(res.headers.get('content-type').split('/'))
        if (res.headers.get('content-type').split('/')[0] != 'image') {
            alert('The requested URL is not an Image!')
        }
        else {
            let data = JSON.parse(localStorage.getItem('images_url'))
            console.log(data)
            data.push(document.getElementById('input').value)
            localStorage.setItem('images_url', JSON.stringify(data))
            document.getElementById('input').value = ''
            imagesLoader()
        }
    }).catch((err) => {
        alert('The requested URL is not an Image!')
    });


}

function alert(msg) {
    let overlay = document.getElementsByClassName('overlay')[0];
    overlay.innerHTML = msg;
    overlay.classList.add('visible');
    setTimeout(() => {
        overlay.classList.remove('visible')
    }, 1500)
}