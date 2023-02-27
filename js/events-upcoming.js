import data from '../data/data.json' assert { type: 'json' };
import { cardsService } from "./main.js";
import { readProducts } from "./main.js";

function productsUpcoming() {
    readProducts;
    cardsEventsUpcoming(data);
};

function cardsEventsUpcoming(data) {
    card.innerHTML = '';
    for (let valores of data.events) {
        let currentDate = new Date(data.currentDate);
        let eventDate = new Date(valores.date);
        if (eventDate < currentDate) {
            cardsService.cardsDates(valores);
        }
    }
};

productsUpcoming();
