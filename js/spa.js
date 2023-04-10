const links = document.querySelectorAll('header nav a');

let url;

document.addEventListener('DOMContentLoaded', () => {
    url = "/pages/inicio.html"
    pedirPage(url)
})


for (let i = 0; i < links.length; i+=1) {
    if (i >= 5) {
        break;
    }
    let link = links[i];
    console.log(link);
    link.addEventListener('click', setURL);
}


function setURL(evt) {
    evt.preventDefault()
    url = "/pages/" + evt.target.dataset.pagina + ".html"
    pedirPage(url)
}

function pedirPage(url) {
    fetch(url)
        .then((res) => {
            return res.text()
        })
        .then((pagina) => {
            document.querySelector('main').innerHTML = pagina
        })
        .catch((err) => {
            console.log("Error:", err);
        })
}