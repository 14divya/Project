const main = document.getElementById("section");
async function fetchDetails() {
    await fetch("http://127.0.0.1:5000/api/product")
        .then(res => res.json())
        .then(function (data) {
            console.log(data);
            data.forEach(element => {
                const div_card = document.createElement('div');
                div_card.setAttribute('class', 'card');

                const div_row = document.createElement('div');
                div_row.setAttribute('class', 'row');

                const div_column = document.createElement('div');
                div_column.setAttribute('class', 'column');

                const image = document.createElement('img');
                image.setAttribute('class', 'thumbnail');
                image.setAttribute('id', 'image');

                const title = document.createElement('h3');
                title.setAttribute('id', 'title');

                const div_center = document.createElement('div');

                title.innerHTML = `${element.title}`;
                image.src = element.images[0];

                div_center.appendChild(image);
                div_card.appendChild(div_center);
                div_card.appendChild(title);
                div_column.appendChild(div_card);
                div_row.appendChild(div_column);

                main.appendChild(div_row);
            });
        });
}
fetchDetails();
