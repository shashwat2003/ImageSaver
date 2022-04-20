if (!("images_url" in localStorage)) {
    console.log(true)
    localStorage.setItem("images_url", "[]")
}

imagesLoader()

let navBarSearch = false;

function imagesLoader() {
    let data = JSON.parse(localStorage.getItem('images_url'))
    console.log(data)
    let gallery = document.getElementById('gallery')
    gallery.innerHTML = '';
    for (let i = 0; i < data.length; i++) {
        gallery.innerHTML += `
        <div class="image flex">
        <img src="${data[i]}" alt="Image at ${i}">
        <div class="hover" onclick="delImage(${i})"><img src="src/del.svg"></div>
        <div class="hover_mob flex" >Image ${i + 1}<img src="src/del.svg" onclick="delImage(${i})"></div>
        </div>
        `
    }
}

function scroll() {
    if (document.documentElement.clientWidth > 800) {
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

}


function addImage() {
    let input = document.getElementById('input').value;
    if (input === '') {
        alert('URL Cannot Be Empty!')

    }
    else {
        fetch(input, { method: 'head' }).then((res) => {
            console.log(res.headers.get('content-type').split('/'))
            if (res.headers.get('content-type').split('/')[0] != 'image') {
                alert('The requested URL is not an Image!')
            }
            else {
                let data = JSON.parse(localStorage.getItem('images_url'))
                if (data.includes(input)) {
                    alert("Same Image Already Exists!");
                }
                else {
                    data.push(input)
                    localStorage.setItem('images_url', JSON.stringify(data))
                    input = ''
                    document.getElementById('input_search').value = ''
                    alert('Image Added!')
                    imagesLoader()
                }

            }
        }).catch((err) => {
            alert('The requested URL is not an Image!')
        });
    }

}

function delImage(index) {
    let data = JSON.parse(localStorage.getItem('images_url'))
    data.splice(index, 1);
    localStorage.setItem('images_url', JSON.stringify(data))
    imagesLoader()
}
function alert(msg) {
    let overlay = document.getElementsByClassName('overlay')[0];
    overlay.innerHTML = msg;
    overlay.classList.add('visible');
    setTimeout(() => {
        overlay.classList.remove('visible')
    }, 1500)
}