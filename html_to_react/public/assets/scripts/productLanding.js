
const fetchDetails = async()=> {
    await fetch("http://127.0.0.1:5000/api/product")
        .then(res => res.json())
        .then(function (data) {
            console.log(data);
            data.forEach(element => {
                const div_card = document.createElement('div');
                div_card.setAttribute('class', 'card');
                const main = document.querySelector(".divProduct");

                // const div_row = document.createElement('div');
                // div_row.setAttribute('class', 'row');

                // const div_column = document.createElement('div');
                // div_column.setAttribute('class', 'column');

                const div_card_title = document.createElement('h5');
                div_card_title.setAttribute('class','card-title');

                const div_card_body = document.createElement('div');
                div_card_body.setAttribute('class','card-body');

                const image = document.createElement('img');
                // image.setAttribute('class', 'thumbnail');
                image.setAttribute('id', 'image');
                image.setAttribute('height','200px');
                image.setAttribute('width','200px');

                // const title = document.createElement('h3');
                // title.setAttribute('id', 'title');

                // const div_center = document.createElement('div');

                div_card_title.innerHTML = `${element.title}`;
                titl = div_card_title.innerHTML;
                console.log(titl);
                image.src = `${element.images[0]}`;
                source = image.src;
                console.log(source);
                // div_center.appendChild(image);
                div_card_body.appendChild(image);
                // div_card_title.appendChild(title);
                div_card_body.appendChild(div_card_title);
                // div_column.appendChild(div_card);
                // div_row.appendChild(div_column);
                div_card.appendChild(div_card_body);
                main.appendChild(div_card);
                
            });
        });
}
window.onload=fetchDetails;