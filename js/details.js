import data from '../data/data.json' assert { type: 'json' };

export const readProduct = (id) => data.events[id-1];

const url = new URL(window.location);
const id = url.searchParams.get('id');

const getProduct = (id)=>{
        readProduct(id);
        const productsById =  readProduct(id);
        createCard(productsById);
};
const createCard = (productsById) => {
    let card = document.getElementById("card");
    card.innerHTML = '';
    card.innerHTML = ` <div class="row g-0 gap-3 ">
                            <div class="img-details">
                                <img src="${productsById.image}" class="img-fluid" alt="${productsById.name}">
                            </div>
                            <div class="description">
                                <div class="card-body">
                                    <h5 class="card-title">${productsById.name}</h5>
                                    <p class="card-text">${productsById.description}</p>
                                </div>
                            </div>
                        </div>`;
};

getProduct(id);