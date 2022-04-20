'use strict';

let fitlerPopup = document.querySelector('.filterPopup');
let fitlerLabel = document.querySelector('.filterLabel');
let filterIcon = document.querySelector('.filterIcon');

fitlerLabel.addEventListener('click', function() {
    fitlerPopup.classList.toggle('hidden');
    fitlerLabel.classList.toggle('filterLabelPink');
    filterIcon.classList.toggle('filterIconPink');

    if (filterIcon.getAttribute('src') === 'images/filter.svg') {
        filterIcon.setAttribute('src', 'images/filterHover.svg')
    } else {
        filterIcon.setAttribute('src', 'images/filter.svg')
    }
});

let filterHeaders = document.querySelectorAll('.filterCategoryHeader');
filterHeaders.forEach(function(header) {
    header.addEventListener('click', function(event) {
        event.target.nextElementSibling.classList.toggle('hidden');
    })
});

let filterSizes = document.querySelector('.filterSizes');
let filterSizeWrap = document.querySelector('.filterSizeWrap');
filterSizeWrap.addEventListener('click', function() {
    filterSizes.classList.toggle('hidden');
});


class Item{
  constructor(name, price){
  this.name = name;
  this.price = price
  this.count = 1;
  }
}

class Basket{
  constructor(){
    this.basketItems = new Array();
    this.price = 0;
  }
}
//let basketItems = new Array();

let MyBasket = new Basket();

const basketIcone = document.querySelector(".numb");

const basket = document.querySelector(".cartIconWrap")

let table = document.querySelector(".basketHeader")

function getDataElement(button){
  return button.parentElement.parentElement.nextElementSibling;
}

function addPressedItem(dataElement){
  const name = dataElement.querySelector(".featuredName").textContent.trim();
  const price = +dataElement
    .querySelector(".featuredPrice")
    .textContent
    .replace(/[^0-9.]/g, '');
  MyBasket.price += price;
  for (let index = 0; index < MyBasket.basketItems.length; index++) {
    if (MyBasket.basketItems[index].name === name) {
      MyBasket.basketItems[index].count++;
      return;
    }          
  }    
  MyBasket.basketItems.push(new Item(name, price));   
}

function redrawTable(){
    table.innerHTML = `<div>Товар</div>
    <div>Количество</div>
    <div>Цена за шт.</div>
    <div>Итого:</div> 
    <hr class="line"> ` 
    MyBasket.basketItems.forEach(el => {  
    table.innerHTML +=`<div>${el.name}</div>`
    table.innerHTML +=`<div>${el.count}</div>`
    table.innerHTML +=`<div>$${el.price}</div>`
    table.innerHTML +=`<div>$${el.price*el.count}</div>`
    table.innerHTML +=`<hr class="line">`   
  })
  table.innerHTML +=`<div class = "summ">$${MyBasket.price}</div>`
  
}

basket.addEventListener("click", () =>{
table.classList.toggle("hidden");
});


const element = document.querySelector(".featuredItems");
element.addEventListener("click", event => {
    if (event.target.tagName === "BUTTON") {
        const dataElement = getDataElement(event.target);        
        addPressedItem(dataElement);
        basketIcone.textContent = MyBasket.basketItems.length;
        redrawTable();
    }
    
});

