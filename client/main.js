const token = 'prova_token';

const apiBase = "http://localhost:8000/server/";

const apiSpecified = {
    create: "create.php",
    info: "info.php",
    delete: "delete.php",
    update: "update.php",
    general: "api.php"
};

const container = document.querySelector('#container');

let dischi = [];

axios.get(apiBase + apiSpecified.info)
    .then(
        (result) => {
            if (result.status >= 400) {
                throw Error("Status non valido");
            }

            dischi = result.data;

            dischi.forEach((s) => {

                const div = document.createElement('div');

                div.id = "div-card-" + s.id;

                div.classList.add('card');

                if (s.ascoltato == "true") {
                    div.classList.toggle('ascoltato');
                }

                container.appendChild(div);

                div.style = 'border-style: solid';

                let html = `<img src="${s.poster}"><h1>${s.title}</h1><h2>${s.author}</h2><p>year: ${s.year} - genre: ${s.genre}</p><button id="elimina-${s.id}">elimina disco</button><button class="mt-1" id="ascoltato-${s.id}" data-ascoltato="${s.id}">Ascoltato</button>`;

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


document.getElementById('add').addEventListener('click', async function () {

    dischiResult = await axios.get(apiBase + apiSpecified.info);

    dischi = dischiResult.data;

    console.log(dischi);

    let maxId = 0;
    dischi.forEach((d) => {
        let id = parseInt(d.id);
        if (id > maxId) {
            maxId = id;
        }
    });

    let newMaxId = maxId + 1;

    let titolo = document.getElementById('titolo').value;
    let autore = document.getElementById('autore').value;
    let genere = document.getElementById('genere').value;
    let anno = document.getElementById('anno').value;
    let poster = document.getElementById('poster').value;

    const newDisco = {
        "poster": `${poster}`,
        "title": `${titolo}`,
        "author": `${autore}`,
        "genre": `${genere}`,
        "year": `${anno}`,
        "id": `${newMaxId}`
    };

    const requestData = { payload: newDisco, token:token  };
    const requestConfig = {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    };

    axios.post(apiBase + apiSpecified.create, requestData, requestConfig).then(response => {
        window.location.href = "index.html"

    });
});


container.addEventListener('click', function (event) {

    if (!event.target.id.startsWith('ascoltato-')) {
        return;
    }
    let idDisco = event.target.id.replace('ascoltato-', '');
    
    // document.getElementById("div-card-" + idDisco).classList.toggle("ascoltato");

    const requestData = { id: idDisco };
    const requestConfig = {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    };

    axios.post(apiBase + apiSpecified.update, requestData, requestConfig).then(response => {
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

    axios.post(apiBase + apiSpecified.delete, requestData, requestConfig).then(response => {
        window.location.href = "index.html"
    });

});