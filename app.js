let BASE_URL= "http://deckofcardsapi.com/api/deck/"
let btn1 = document.getElementById("newDeck");
let btn2 = document.getElementById("newCard");
let cardDiv = document.getElementById("cards");

btn1.addEventListener("click", function(e){
    localStorage.removeItem("deck_id");
    let promise1 = axios.get(BASE_URL + "new/shuffle/?deck_count=1");
    promise1
    .then(res => {console.log(res.data.deck_id);
        let deckId = res.data.deck_id;
        localStorage.setItem("deck_id", deckId);
        btn1.style.display = "none";
        btn2.style.display = "inline";
        return axios.get(BASE_URL + deckId + "/draw/?count=1")
    })
    .then(res2 => {
        console.log(res2);
        console.log(`your card is ${res2.data.cards[0].value} of ${res2.data.cards[0].suit}, from deck ${res2.data.deck_id}`);
        let img = document.createElement("img");
        img.setAttribute("src", res2.data.cards[0].image);
        cardDiv.appendChild(img);

    })
    .catch(err => console.log(err))
})

btn2.addEventListener("click", function(e){
    let deckId = localStorage.getItem("deck_id");
    let p = axios.get(BASE_URL + deckId + "/draw/?count=1");
    p
    .then(res2 => {
        console.log(`your card is ${res2.data.cards[0].value} of ${res2.data.cards[0].suit}, from deck ${res2.data.deck_id}`);
        let img = document.createElement("img");
        img.setAttribute("src", res2.data.cards[0].image);
        cardDiv.appendChild(img);
    })
})
