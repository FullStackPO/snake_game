const board = document.querySelector('.board');

const blockheight = 40;
const blockwidth = 40;

const rows = Math.floor(board.clientHeight / blockheight);
const cols = Math.floor(board.clientWidth / blockwidth);

let blocks = {};

let snake = [{x:5,y:8},{x:5,y:9},{x:5,y:10}];

let direction = 'right';

let foodPos = {}; 

for(let row = 0; row < rows; row++){
    for(let col = 0; col < cols; col++){
        const block = document.createElement('div');
        block.classList.add('block');
        board.appendChild(block);
        blocks[`${row}-${col}`] = block;
    }
}

function food(){

  let x = Math.floor(Math.random()*rows)
  let y = Math.floor(Math.random()*cols)

  foodPos = {x,y}

  blocks[ `${x}-${y}` ].classList.add('food')

}

food();


function clearBoard(){
    Object.values(blocks).forEach(block=>{
        block.classList.remove('fill');
        block.classList.remove('food');
    })
}


function render(){

    clearBoard();

    snake.forEach(segment => {
        blocks[`${segment.x}-${segment.y}`].classList.add('fill')
    })

    blocks[`${foodPos.x}-${foodPos.y}`].classList.add('food')
}


function snakeMove(){

    let head = {...snake[snake.length-1]}

    if(direction === 'up') head.x -= 1;
    if(direction === 'down') head.x += 1;
    if(direction === 'right') head.y += 1;
    if(direction === 'left') head.y -= 1;

    snake.push(head);

    if(head.x === foodPos.x && head.y === foodPos.y){
        food(); // spawn new food
    }else{
        snake.shift(); // remove tail normally
    }

}


document.addEventListener('keydown',(e) => {

    if(e.key === 'ArrowUp') direction = 'up';
    if(e.key === 'ArrowDown') direction = 'down';
    if(e.key === 'ArrowRight') direction = 'right';
    if(e.key === 'ArrowLeft') direction = 'left';

})

setInterval(()=>{
    snakeMove()
    render()
},300)