const board = document.querySelector('.board');
const timeDisplay = document.querySelector('.infos .info:nth-child(3) h3');
const scoreDisplay = document.querySelector('.infos .info:nth-child(2) h3');

const blockheight = 40;
const blockwidth = 40;

const rows = Math.floor(board.clientHeight / blockheight);
const cols = Math.floor(board.clientWidth / blockwidth);

let blocks = {};

let snake = [{x:5,y:8},{x:5,y:9},{x:5,y:10}];
let direction = 'right';

let foodPos = {};

let seconds = 0;
let timerInterval;

let score = 0;


// CREATE BOARD
for(let row = 0; row < rows; row++){
    for(let col = 0; col < cols; col++){
        const block = document.createElement('div');
        block.classList.add('block');
        board.appendChild(block);
        blocks[`${row}-${col}`] = block;
    }
}


// TIMER
function startTimer(){
    clearInterval(timerInterval);

    timerInterval = setInterval(()=>{
        seconds++;

        let min = Math.floor(seconds / 60);
        let sec = seconds % 60;

        let formattedTime =
            String(min).padStart(2,'0') + "-" +
            String(sec).padStart(2,'0');

        timeDisplay.textContent = "Time : " + formattedTime;

    },1000);
}

function resetTimer(){
    seconds = 0;
    timeDisplay.textContent = "Time : 00-00";
    startTimer();
}


// SCORE
function updateScore(){
    scoreDisplay.textContent = "Score : " + score;
}

function resetScore(){
    score = 0;
    updateScore();
}


// FOOD
function food(){

    let x, y;

    do{
        x = Math.floor(Math.random()*rows);
        y = Math.floor(Math.random()*cols);
    }while(snake.some(s => s.x === x && s.y === y));

    foodPos = {x,y};
}


// CLEAR BOARD
function clearBoard(){
    Object.values(blocks).forEach(block=>{
        block.classList.remove('fill');
        block.classList.remove('food');
    });
}


// RENDER
function render(){

    clearBoard();

    snake.forEach(segment=>{
        blocks[`${segment.x}-${segment.y}`].classList.add('fill');
    });

    blocks[`${foodPos.x}-${foodPos.y}`].classList.add('food');
}


// RESET GAME
function resetGame(){
    snake = [{x:5,y:8},{x:5,y:9},{x:5,y:10}];
    direction = 'right';
    food();
    resetTimer();
    resetScore();
}


// MOVE SNAKE
function snakeMove(){

    let head = {...snake[snake.length-1]};

    if(direction === 'up') head.x -= 1;
    if(direction === 'down') head.x += 1;
    if(direction === 'right') head.y += 1;
    if(direction === 'left') head.y -= 1;

    // WALL COLLISION
    if(head.x < 0 || head.x >= rows || head.y < 0 || head.y >= cols){
        alert("Game Over 💀");
        resetGame();
        return;
    }

    snake.push(head);

    // FOOD EATEN
    if(head.x === foodPos.x && head.y === foodPos.y){
        score += 1;   // ⭐ score increases by 1
        updateScore();
        food();
    }else{
        snake.shift();
    }
}


// CONTROLS
document.addEventListener('keydown',(e)=>{

    if(e.key === 'ArrowUp' && direction !== 'down') direction = 'up';
    if(e.key === 'ArrowDown' && direction !== 'up') direction = 'down';
    if(e.key === 'ArrowRight' && direction !== 'left') direction = 'right';
    if(e.key === 'ArrowLeft' && direction !== 'right') direction = 'left';

});


// GAME LOOP
setInterval(()=>{
    snakeMove();
    render();
},300);


// START GAME
food();
startTimer();
updateScore();
render();