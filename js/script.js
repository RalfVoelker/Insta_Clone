

let cards = [ 
    {
        "currentUser":"Ralf",
        "memberPic": "./img/member3.jpg",
        "memberName": "Alfred",
        "verified": "./img/svg/verified.svg",
        "time": "- 2Std.",
        "contentPic": "./img/road.jpg",
        "comment": "./img/svg/kommentar.svg",
        "direct": "./img/svg/direct.svg",
        "save_not": "./img/svg/save_not.svg",
        "save": "./img/svg/save.svg",
        "likeCounter": "2021",
        "comments": ['Ein sehr schönes Foto'],
        "isLike": "false",
        "isSave": "false"
    },
    {
        "currentUser":"Ralf",
        "memberPic": "./img/member1.jpg",
        "memberName": "Isabelle",
        "verified": "./img/svg/verified.svg",
        "time": "- 6Std.",
        "contentPic": "./img/sunset.jpg",
        "comment": "./img/svg/kommentar.svg",
        "direct": "./img/svg/direct.svg",
        "save_not": "./img/svg/save_not.svg",
        "save": "./img/svg/save.svg",
        "likeCounter": "25431",
        "comments": ['gefällt mir sehr gut...'],
        "isLike": "false",
        "isSave": "false"
    },
    {
        "currentUser":"Ralf",
        "memberPic": "./img/member2.jpg",
        "memberName": "Nikolaus",
        "verified": "./img/svg/verified.svg",
        "time": "- 11Std.",
        "contentPic": "./img/traffic.jpg",
        "comment": "./img/svg/kommentar.svg",
        "direct": "./img/svg/direct.svg",
        "save_not": "./img/svg/save_not.svg",
        "save": "./img/svg/save.svg",
        "likeCounter": "412",
        "comments": ['tolle Aufnahme'],
        "isLike": "false",
        "isSave": "false"
    }
];

load();


function render(){
    const content = document.getElementById('contentMitte');
    content.innerHTML = '';
    content.innerHTML += /*html*/`<h3 class="h3">Für Dich&nbsp&nbsp <span>Gefolgt</span></h3>`;
    for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        content.innerHTML += `${contentMitteHtml(i,card)}`;
            let commentCard = document.getElementById(`commentCard${i}`);
            for (let j = 0; j < card['comments'].length; j++) {
                const comment = card['comments'][j];
                commentCard.innerHTML +=  /*html*/`
                    <div> <b>${card['currentUser']}</b> : ${comment}</div>`;
            }
    }
}


function contentMitteHtml(i,card){
    return /*html*/ `
            <div class="card">
                <div class="headerCard">
                    <img class="memberPicSmall" src=${card['memberPic']} alt=""> 
                    <p class="name">${card['memberName']}</p>
                    <img class="verifi" src=${card['verified']} alt="">
                    <p class="time">${card['time']}</p>
                </div>
                <img class="contentPic" onclick="openComments(${i})" src=${card['contentPic']} alt="">
                <div class="footerCard">
                    <img onclick="toggleLikeIcon(${i})" id="likeCard${i}" class="icon" src="./img//svg/like${card['isLike']}.svg"> 
                    <img class="icon" onclick="openComments(${i})" src= ${card['comment']} alt="">
                    <img class="icon" src= ${card['direct']} alt=""> 
                    <img onclick="toggleSaveIcon(${i})" id="saveCard${i}" class="icon1" src="./img//svg/save${card['isSave']}.svg">
                </div>
                <div>
                    <div id="like${i}"><h4>Gefällt  ${cards[i]['likeCounter']} Mal</h4></div>
                    <div class="comment" id="commentCard${i}"></div>
                    <input  id="input${i}" class="input" placeholder="Kommentieren..."><button class="btn" onclick="inputComment(${i})">Posten</button>
                </div>
            </div>`;
}


function inputComment(i){
    let input = document.getElementById(`input${i}`);
    if (input.value == "") {
        return;
    }
    else{
        cards[i]['comments'].push(input.value);
        save();
        render();
        input.value = '';
    }
}


function save(){
    let cardsAsText = JSON.stringify(cards);
    localStorage.setItem("cards",cardsAsText);
}


function load() {
    let cardsAsText = localStorage.getItem("cards");
    if (cardsAsText) {
        cards = JSON.parse(cardsAsText);
    }
}


function toggleLikeIcon(i) {
    let icon = document.getElementById(`likeCard${i}`);
    if (icon.src.includes("liketrue.svg")) {
      icon.src = "./img/svg/likefalse.svg";
      cards[i]["isLike"] = false;
      cards[i]["likeCounter"]--;
      document.getElementById(`like${i}`).innerHTML = /*html*/ `<div id="like${i}"><h4>Gefällt ${cards[i]["likeCounter"]} Mal</h4></div>`;
      save();}
    else{
      icon.src = "./img/svg/liketrue.svg";
      cards[i]["isLike"] = true;
      cards[i]["likeCounter"]++;
      document.getElementById(`like${i}`).innerHTML = /*html*/ `<div id="like${i}"><h4>Gefällt ${cards[i]['likeCounter']} Mal</h4></div>`;
      save();}
}


function toggleSaveIcon(i) {
    let icon = document.getElementById(`saveCard${i}`);
    if (icon.src.includes("savetrue.svg")) {
      icon.src = "./img/svg/savefalse.svg";
      cards[i]["isSave"] = false;
      save();
    } else {
      icon.src = "./img/svg/savetrue.svg";
      cards[i]["isSave"] = true;
      save();
    }
}


function openComments(i) {
    let comments = document.getElementById('openComment');
    comments.classList.add('d-block');
    document.getElementById('openComment').innerHTML = openCommentsHtml(i);
    render();
}


function openCommentsHtml(i) {
    return /*html*/ `
        <button class="closeBTN" onclick="closeComments()"><img src="./img/svg/schliessen_white.png" alt="close button"></button>
        <div class="openComment">
            <div class="commentContainer" >
                <img class="contentPic2" src=${cards[i]['contentPic']} alt="">
                <div>
                <div class="headerCard">
                        <img class="memberPicSmall" src=${cards[i]['memberPic']} alt=""> 
                        <p class="name">${cards[i]['memberName']}</p>
                        <img class="verifi" src=${cards[i]['verified']} alt="">
                        <p class="time">${cards[i]['time']}</p>
                    </div>
                    <div>
                        <div class="comment" id="commentCard${i}"></div>
                        <input  id="input${i}" class="input" placeholder="Kommentieren..."><button class="btn" onclick="inputComment(${i})">Posten</button>
                    </div>
                    <div class="footerCard">
                        <div id="like${i}"><h4>Gefällt  ${cards[i]['likeCounter']} Mal</h4></div>
                        <img onclick="toggleLikeIcon(${i})" id="likeCard${i}" class="icon" src="./img//svg/like${cards[i]['isLike']}.svg"> 
                        <img class="icon" src= ${cards[i]['direct']} alt=""> 
                    </div>
                </div>
            </div>
        </div>`;
}


function closeComments() {
    let comments = document.getElementById('openComment');
    document.getElementById('openComment').innerHTML = '';
    render();
    comments.classList.remove('d-block');
}


