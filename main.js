const url = "http://localhost:8000/api.php";
const container = document.querySelector('#container');

let dischi = [];

axios.get(url)
    .then(
        (result) => {
            if (result.status >= 400) {
                throw Error("Status non valido");
            }

            dischi = result.data;

            dischi.forEach((s) => {

                const div = document.createElement('div');
                div.classList.add('card');
                container.appendChild(div);

                div.style = 'border-style: solid';

                let html = `<img src="${s.poster}"><h1>${s.title}</h1><h2>author: ${s.author}</h2><p>year: ${s.year} - genre: ${s.genre}</p><button id="elimina-${s.id}">elimina disco</button>`;

                div.innerHTML = html;

            });
        })
    .catch(
        (error) => {
            if (error.status != '') {
                console.log(error.status)
            } else {
                console.log(error)
            }
        });


document.getElementById('add').addEventListener('click', function () {

    let maxId = 0;
    dischi.forEach((d) => {
        if (d.id > maxId) {
            maxId = d.id;
        }
    });

    const newDisco = {
        "poster": "https:\/\/upload.wikimedia.org\/wikipedia\/en\/0\/03\/Iron_Maiden_-_Brave_New_World.jpg",
        "title": "New Jersey",
        "author": "Bon Jovi",
        "genre": "Rock",
        "year": "1988",
        "id": parseInt(maxId) + 1
    };

    const requestData = { payload: newDisco };
    const requestConfig = {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    };

    axios.post(url, requestData, requestConfig).then(response => {
        window.location.href = "index.html"

    });
});

container.addEventListener('click', function (event) {

    if (!event.target.id.startsWith('elimina-')) {
        return;
    }

    let idDisco = event.target.id.replace('elimina-', '');

    const requestData = { id_elimina: idDisco };
    const requestConfig = {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    };

     axios.post(url, requestData, requestConfig).then(response => {
        window.location.href = "index.html"

    });

});