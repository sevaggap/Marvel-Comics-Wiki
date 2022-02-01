let bodyEl = document.getElementById('test');
let testinputEl = document.getElementById('test-input');
let testbuttonEl = document.getElementById('test-button');

let characterimgEl= document.createElement("img");

bodyEl.appendChild(characterimgEl);

console.log("hi");

function getcharacter(){
    let input = testinputEl.value;
    let url = "https://gateway.marvel.com/v1/public/characters?name=" + input + "&ts=1&apikey=ce7dc3068a067b90ca1a1447d548210b&hash=1125c2f57d6d048e87c706fdffbe8ae6";

    fetch(url)
    .then (function (response){
        if (!response.ok) {
            throw response.json();
        }
        return response.json();
    })
    .then (function (data) {
        console.log(data);
        let characterid = data.data.results[0].id;
        let img = data.data.results[0].thumbnail.path
        characterimgEl.setAttribute("src", img + ".jpg");

        console.log(characterid);
        searchwiki(input);
        getcomics(characterid);
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
    })
}

function searchwiki() {
    let input = testinputEl.value;
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
        let p1 = document.createElement('p');
        h1.textContent= data.query.search[i].title;
        p1.textContent= data.query.search[i].snippet
        bodyEl.appendChild(h1);
        bodyEl.appendChild(p1);
    }
}

testbuttonEl.addEventListener("click",getcharacter);