let inputEl = document.getElementById('searchinput');
let buttonEl = document.getElementById('searchBtn');
let comicsEl = document.getElementById('comicinfo');
let historyEl = document.getElementById('searchhistory');


let characterimgEl= document.createElement("img");
let comicimageEl1 = document.createElement("img");
let comicimageEl2 = document.createElement("img");
let comicimageEl3 = document.createElement("img");
let comicimageEl4 = document.createElement("img");
let comicimageEl5 = document.createElement("img");
let comicimageEl6 = document.createElement("img");
let comicimageEl7 = document.createElement("img");
let comicimageEl8 = document.createElement("img");
let comicimageEl9 = document.createElement("img");
let comicimageEl10 = document.createElement("img");

comicsEl.appendChild(comicimageEl1);
comicsEl.appendChild(comicimageEl2);
comicsEl.appendChild(comicimageEl3);
comicsEl.appendChild(comicimageEl4);
comicsEl.appendChild(comicimageEl5);
comicsEl.appendChild(comicimageEl6);
comicsEl.appendChild(comicimageEl7);
comicsEl.appendChild(comicimageEl8);
comicsEl.appendChild(comicimageEl9);
comicsEl.appendChild(comicimageEl10);

let history = [];

console.log("code is working");

function handleSearchFormSubmit (event) {
    event.preventDefault();
    let character = inputEl.value;

    if (!character) {
        window.alert('Please enter a character name!');
        return;
    }

    let url = "https://gateway.marvel.com/v1/public/characters?name=" + character + "&ts=1&apikey=ce7dc3068a067b90ca1a1447d548210b&hash=1125c2f57d6d048e87c706fdffbe8ae6";
    
    fetch(url)
    .then (function (response){
        if (!response.ok) {
            throw response.json();
        }
        return response.json();
    })
    .then (function (data) {
    if (!data.data.results[0]) {
        window.alert("No character found! Please try again.")
    } else {
        createlistelement(character);
        savetostorage(character);
    }
})
}

function handleHistoryFormSubmit(event) {
    event.preventDefault();
  
    let character = event.target.textContent;
    console.log(character);

    getcharacter(character);
}  

function createlistelement (character) {
    let buttoncharacterEl = document.createElement("button");
    buttoncharacterEl.textContent = character;
    historyEl.appendChild(buttoncharacterEl);

    getcharacter(character);
}

function getcharacter(character){
    let url = "https://gateway.marvel.com/v1/public/characters?name=" + character + "&ts=1&apikey=ce7dc3068a067b90ca1a1447d548210b&hash=1125c2f57d6d048e87c706fdffbe8ae6";

    fetch(url)
    .then (function (response){
        if (!response.ok) {
            throw response.json();
        }
        return response.json();
    })
    .then (function (data) {
        console.log(data);
        console.log("getting character");
        if (!data.data.results[0]) {
            window.alert("No character found! Please try again.")
        } else {
        let characterid = data.data.results[0].id;
        let charactername = data.data.results[0].name

        console.log(characterid);
        searchwiki(charactername);
        getcomics(characterid);
        }
    }
    )
}

function getcomics (characterid) {

    let url = "https://gateway.marvel.com/v1/public/characters/" + characterid + "/comics?&ts=1&apikey=ce7dc3068a067b90ca1a1447d548210b&hash=1125c2f57d6d048e87c706fdffbe8ae6";

    fetch(url)
    .then (function (response){
        if (!response.ok) {
            throw response.json();
        }
        return response.json();
    })
    .then (function (data) {
        console.log(data);
        
        comicimageEl1.setAttribute("src", data.data.results[0].thumbnail.path + ".jpg");
        comicimageEl2.setAttribute("src", data.data.results[1].thumbnail.path + ".jpg");
        comicimageEl3.setAttribute("src", data.data.results[2].thumbnail.path + ".jpg");
        comicimageEl4.setAttribute("src", data.data.results[3].thumbnail.path + ".jpg");
        comicimageEl5.setAttribute("src", data.data.results[4].thumbnail.path + ".jpg");
        comicimageEl6.setAttribute("src", data.data.results[5].thumbnail.path + ".jpg");
        comicimageEl7.setAttribute("src", data.data.results[6].thumbnail.path + ".jpg");
        comicimageEl8.setAttribute("src", data.data.results[7].thumbnail.path + ".jpg");
        comicimageEl9.setAttribute("src", data.data.results[8].thumbnail.path + ".jpg");
        comicimageEl10.setAttribute("src", data.data.results[9].thumbnail.path + ".jpg");

        for (i=0; i<10; i++ ) {
            if(data.data.results[i].description) {
                console.log(data.data.results[i].description);
            }
        }
        return data;
    })
}

function searchwiki(charactername) {
    let input = charactername;

    console.log(input);
    
     let url = "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" + input + "&format=json" + "&origin=*";
    
        fetch(url)
        .then (function (response){
            if (!response.ok) {
                throw response.json();
            }
            return response.json();
        })
        .then (function (data) {
            length= data.query.search.length;
            console.log(data);
            console.log(length);
            display(data,length);
        }
        )
}

function display(data,length) {
    console.log('hi');
    for(i=0;i<length;i++) {
        let h1 = document.createElement('h1');
        let a1 = document.createElement('a');
        let p1 = document.createElement('p');
        let url = "https://www.wikipedia.org/wiki/"+data.query.search[i].title.replace(/\s/g, '_')+"";
        h1.textContent= data.query.search[i].title;
        a1.textContent= data.query.search[i].title;
        p1.textContent= data.query.search[i].snippet;
        comicsEl.appendChild(h1);
        comicsEl.appendChild(a1);
        a1.setAttribute("href", url);
        comicsEl.appendChild(p1);
    }
}

function savetostorage (charactername) {
    history.push(charactername);
    localStorage.setItem("searchhistory", JSON.stringify(history));
}

function renderbuttons () {
    for (var i = 0; i < history.length; i++) {
        var historyelement = history[i];
    
        var button = document.createElement("button");
        button.textContent = historyelement;

        historyEl.appendChild(button);
      }
}

function init() {
    var storedhistory = JSON.parse(localStorage.getItem("searchhistory"));
    
    if (storedhistory !== null) {
      history = storedhistory;
    }
   
    renderbuttons();
    
    console.log("history loaded");
  }

  buttonEl.addEventListener("click",handleSearchFormSubmit);
  historyEl.addEventListener("click",handleHistoryFormSubmit);

  init();