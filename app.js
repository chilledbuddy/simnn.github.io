let gameStatus = false;
let seq = ["red", "blue", "yellow", "green"];
let playerSeq = [];
let gameSeq = [];
let currScore = -1;
let maxScore = 0;

document.addEventListener("keydown", ()=>{
    if(gameStatus === false) {
        gameStatus = true;
        startGame();
    }
});
document.querySelector(".start").addEventListener("click", ()=>{
    if(gameStatus === false) {
        gameStatus = true;
        startGame();
    }
});
document.querySelector(".start-again").addEventListener("click", ()=>{
    
    let startBtn = document.querySelector(".start");
    let mainContainer = document.querySelector(".main-container");
    startBtn.classList.remove("hide");
    document.querySelector(".when-its-over").classList.add("hide");
    mainContainer.classList.remove("hide");

    gameStatus = true;
    seq = ["red", "blue", "yellow", "green"];
    playerSeq = [];
    gameSeq = [];
    currScore = -1;
    startGame();
});


let gameContainer = document.querySelector(".game-container");
for(let ele of gameContainer.children) {
    ele.addEventListener("click", ()=> {
        flashElement(ele);
        playerSeq.push(ele.classList[1]);
        let i = playerSeq.length-1;
        if(playerSeq[i] != gameSeq[i]) {
           // console.log("game over");
            //console.log(playerSeq[i]);
            //console.log(gameSeq[i]);
            gameOver();
        }else if(playerSeq.length == gameSeq.length) {
            increaseScore();
        }
    });
}

function gameOver() {
    let text = document.querySelector("#game-over");
    let startBtn = document.querySelector(".start");
    let mainContainer = document.querySelector(".main-container");
    startBtn.classList.add("hide");
    document.querySelector(".when-its-over").classList.remove("hide");
    mainContainer.classList.add("hide");
    setInterval(()=>{
        text.classList.toggle("blink");
    }, 700);
}




async function startGame() {
    let heading =document.querySelector("h1");
    console.log(heading);
    heading.innerText = "Just follow the Sequence";
    await makeCountDown();
    console.log("ready");

    increaseScore();
}
async function increaseScore() {
    currScore++;
    maxScore = Math.max(maxScore, currScore);
    document.querySelector("#max-score").innerText = maxScore;
    document.querySelector("#curr-score").innerText = currScore;
    playerSeq = [];
    setTimeout(async ()=>{
        await blinkRandom();
    }, 1000);
}

function blinkRandom() {
    return new Promise(async (resolve, reject) => {
        let idx = Math.floor(Math.random()*4);
        let color = seq[idx];
        let ele = document.querySelector(`.${color}`);
        gameSeq.push(color);
        await flashElement(ele);
        
    });
}
async function makeCountDown() {
    let body = document.querySelector("body");
    let count = document.querySelector(".count");
    let gameConainer = document.querySelector(".game-container");
    document.querySelector("button").classList.add("hide");
    count.classList.remove("hide");
    body.classList.add("countdown");
    gameConainer.classList.add("countdown");
    for(let i=0; i<gameConainer.children.length; i++) {
        gameConainer.children[i].classList.add("countdown");
    }
    count.innerText = 3;
    await decrementCount(count, 2, 1000);
    await decrementCount(count, 1, 1000);
    await decrementCount(count, 0, 1000);
    await decrementCount(count, 0, 1000);
    body.classList.remove("countdown");
    gameConainer.classList.remove("countdown");
    for(let i=0; i<gameConainer.children.length; i++) {
        gameConainer.children[i].classList.remove("countdown");
    }
    count.classList.add("hide");
    
    return new Promise((resolve)=>{
        resolve();
    })
}

function decrementCount(ele, val, delay) {
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            ele.innerText = val;
            resolve();
        }, delay);
    });
}



function flashElement(color) {
    return new Promise((resolve, reject) => {
        color.classList.add("flash");
        setTimeout(()=>{
            color.classList.remove("flash");
        }, 200);
    });
}

