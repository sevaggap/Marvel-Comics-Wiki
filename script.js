let inputEl = document.querySelector('.form-input');
let buttonEl = document.getElementById('searchBtn');
let comicsEl = document.getElementById('comicinfo');
let historyEl = document.getElementById('searchhistory');

let imageEl1 = document.getElementById('item-1');
let imageEl2 = document.getElementById('item-2');
let imageEl3 = document.getElementById('item-3');
let imageEl4 = document.getElementById('item-4');
let imageEl5 = document.getElementById('item-5');
let imageEl6 = document.getElementById('item-6');
let imageEl7 = document.getElementById('item-7');
let imageEl8 = document.getElementById('item-8');
let imageEl9 = document.getElementById('item-9');
let imageEl10 = document.getElementById('item-10');

let link1El = document.getElementById('link1');
let link2El = document.getElementById('link2');
let link3El = document.getElementById('link3');
let link4El = document.getElementById('link4');
let link5El = document.getElementById('link5');
let link6El = document.getElementById('link6');
let link7El = document.getElementById('link7');
let link8El = document.getElementById('link8');
let link9El = document.getElementById('link9');
let link10El = document.getElementById('link10');

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

imageEl1.appendChild(comicimageEl1);
imageEl2.appendChild(comicimageEl2);
imageEl3.appendChild(comicimageEl3);
imageEl4.appendChild(comicimageEl4);
imageEl5.appendChild(comicimageEl5);
imageEl6.appendChild(comicimageEl6);
imageEl7.appendChild(comicimageEl7);
imageEl8.appendChild(comicimageEl8);
imageEl9.appendChild(comicimageEl9);
imageEl10.appendChild(comicimageEl10);


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
        comicimageEl1.setAttribute("class", "img-responsive center-block");
        comicimageEl2.setAttribute("src", data.data.results[1].thumbnail.path + ".jpg");
        comicimageEl2.setAttribute("class", "img-responsive center-block");
        comicimageEl3.setAttribute("src", data.data.results[2].thumbnail.path + ".jpg");
        comicimageEl3.setAttribute("class", "img-responsive center-block");
        comicimageEl4.setAttribute("src", data.data.results[3].thumbnail.path + ".jpg");
        comicimageEl4.setAttribute("class", "img-responsive center-block");
        comicimageEl5.setAttribute("src", data.data.results[4].thumbnail.path + ".jpg");
        comicimageEl5.setAttribute("class", "img-responsive center-block");
        comicimageEl6.setAttribute("src", data.data.results[5].thumbnail.path + ".jpg");
        comicimageEl6.setAttribute("class", "img-responsive center-block");
        comicimageEl7.setAttribute("src", data.data.results[6].thumbnail.path + ".jpg");
        comicimageEl7.setAttribute("class", "img-responsive center-block");
        comicimageEl8.setAttribute("src", data.data.results[7].thumbnail.path + ".jpg");
        comicimageEl8.setAttribute("class", "img-responsive center-block");
        comicimageEl9.setAttribute("src", data.data.results[8].thumbnail.path + ".jpg");
        comicimageEl9.setAttribute("class", "img-responsive center-block");
        comicimageEl10.setAttribute("src", data.data.results[9].thumbnail.path + ".jpg");
        comicimageEl10.setAttribute("class", "img-responsive center-block");

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
    let url = [];
    let title = [];

    for(i=0;i<length;i++) {
       url[i] = "https://www.wikipedia.org/wiki/"+data.query.search[i].title.replace(/\s/g, '_')+"";
       title[i] = data.query.search[i].title;
    }

    console.log (url);
    console.log(title);
    
    link1El.textContent= title[0];
    link2El.textContent= title[1];
    link3El.textContent= title[2];
    link4El.textContent= title[3];
    link5El.textContent= title[4];
    link6El.textContent= title[5];
    link7El.textContent= title[6];
    link8El.textContent= title[7];
    link9El.textContent= title[8];
    link10El.textContent= title[9];

    link1El.setAttribute("href", url[0]);
    link2El.setAttribute("href", url[1]);
    link3El.setAttribute("href", url[2]);
    link4El.setAttribute("href", url[3]);
    link5El.setAttribute("href", url[4]);
    link6El.setAttribute("href", url[5]);
    link7El.setAttribute("href", url[6]);
    link8El.setAttribute("href", url[7]);
    link9El.setAttribute("href", url[8]);
    link10El.setAttribute("href", url[9]);

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