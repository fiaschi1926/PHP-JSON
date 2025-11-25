
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

            console.log(dischi);

            dischi.forEach((s) => {

                const div = document.createElement('div');
                div.classList.add('card');

                container.appendChild(div);

                div.style = 'border-style: solid';

                const img = document.createElement('img');
                const h1 = document.createElement('h1');
                const h2 = document.createElement('h2');
                const p = document.createElement('p');

                img.src = s.poster;

                h1.innerText = `${s.title}`;
                h2.innerText = `author: ${s.author}`;
                p.innerText = `year: ${s.year} - genre: ${s.genre}`;

                div.appendChild(img);
                div.appendChild(h1);
                div.appendChild(h2);
                div.appendChild(p);

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

    const newDisco = {
        "poster": "https:\/\/upload.wikimedia.org\/wikipedia\/en\/0\/03\/Iron_Maiden_-_Brave_New_World.jpg",
        "title": "New Jersey",
        "author": "Bon Jovi",
        "genre": "Rock",
        "year": "1988"
    };

    const requestData = { payload: newDisco };
    const requestConfig = {
        headers: {
            // "Content-Type": "multipart/form-data"
            "Content-Type": "application/json"
        }
    };

    axios.post(url, requestData, requestConfig).then(response => {

        console.log(response.data);
        window.location.href = "index.html"
    });

});


