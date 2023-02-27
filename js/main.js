import data from '../data/data.json' assert { type: 'json' };

export const readProducts = data;

function actualYear() {
    const actualYear = new Date().getFullYear();
    document.getElementById("year").innerHTML = actualYear;
};

function cardsDates(valores) {
    let card = document.getElementById("card");
    card.innerHTML += `<div class="col-sm-5 col-md-4 col-lg-4 col-xl-3">
                                <div class="card">
                                    <img src="${valores.image}" class="card-img-top m-4" alt="${valores.name}">
                                    <div class="card-body">
                                        <h5 class="card-title">${valores.name}</h5>
                                        <p class="card-text">${valores.description}</p>
                                    </div>
                                    <div class="card-footer d-inline-flex border-top-0">
                                        <p class="card-price"> Price:<span class="pe-2">${valores.price}</span></p>
                                        <a href="./pages/details.html?id=${valores.id}" class="btn btn-dark w-75 seeMore">See More</a>
                                    </div>  
                                </div>
                            </div>`;
};

function cards(data) {
    for (let valores of data.events) {
        cardsDates(valores);
    }
};

function cardsEvents() {
    actualYear();
    readProducts;
    cards(data);
};

cardsEvents();

export const cardsService = {
    actualYear,
    cardsDates,
};
