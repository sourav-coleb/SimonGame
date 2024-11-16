let gameSeq = [];
let userSeq = [];

let btnColors = ["red", "blue", "yellow", "purple"];

let start = false;
let level = 0;
let highestScore = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function(){
    if(start == false)
    {
        start = true;
        levelUp();
    }
});

function btnFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    }, 250);
}

function levelUp(){
    userSeq = [];
    level += 1;
    
    if(highestScore < level){
        highestScore = level;
    }
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 3);
    let randCol = btnColors[randIdx];
    let randBtn = document.querySelector(`.${randCol}`);

    gameSeq.push(randCol);
    // console.log(gameSeq);

    btnFlash(randBtn); 
}

function chackAns(idx){
    if(gameSeq[idx] === userSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp, 1000);
        }
    }else{
        h2.innerHTML = `GAME OVER! Your score was <b>${level-1}</b> <br> Highest Score <b>${highestScore - 1}</b> <br> Press any key to start again`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(() => {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        resetGame();
    }
}

function btnPress(){
    // console.log(this);
    let btn = this; 
    btnFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    chackAns(userSeq.length - 1);
}

let btns = document.querySelectorAll(".btn");
for(btn of btns){
    btn.addEventListener("click", btnPress);
}

function resetGame(){
    gameSeq = [];
    userSeq = [];
    start = false;
    level = 0;
}
