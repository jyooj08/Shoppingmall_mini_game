'use strict'

// Fetch the dresses from the JSON file
function loadDresses(){
    return fetch('data/data.json')
    .then(response => response.json())
    .then(json => json.dresses);
}

function displayDresses(dresses){
    /*
    --Yujin's solution!--

    const dress_list = document.querySelector(".dresses");
    dresses.forEach(element => {
        console.log(element);
        let dress = document.createElement("li");
        dress.setAttribute("class","dress");
        
        let img = document.createElement("img");
        img.setAttribute("src",element["image"]);
        img.setAttribute("class", "dress__img");
        img.setAttribute("alt",element["type"]);
        
        let span = document.createElement("span");
        span.innerHTML= element["gender"] + ", " + element["size"];

        dress.appendChild(img);
        dress.appendChild(span);
        dress_list.appendChild(dress);
    });
    */

    const container = document.querySelector('.dresses');
    container.innerHTML = dresses.map(dress => createHTMLString(dress)).join('');
}

function createHTMLString(dress){
    return `
    <li class="dress">
        <img src="${dress.image}" alt="${dress.type}" class="dress__img">
        <span class="dress__description">${dress.gender}, ${dress.size}</span>
    </li>
    `;
}

function onButtonClick(event, dresses){
    //console.log(event.target);
    const key = event.target.dataset.key? event.target.dataset.key : event.target.parentNode.dataset.key;
    const value = event.target.dataset.value? event.target.dataset.value : event.target.parentNode.dataset.value;
    
    console.log(key, value);
    if(key == null || value == null) return;

    displayDresses(dresses.filter(dress=>dress[key] === value));
}

function setEventListerers(dresses){
    const logo = document.querySelector('.logo__img');
    const buttons = document.querySelector('.btn__container');

    logo.addEventListener('click', ()=> displayDresses(dresses));
    buttons.addEventListener('click', event => onButtonClick(event, dresses));
}

// main
loadDresses()
.then(dresses => {
    displayDresses(dresses);
    setEventListerers(dresses);
})
.catch(console.log);