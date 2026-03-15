const board = document.querySelector('.board');

const blockheight = 40;
const blockwidth = 40;

const rows = Math.floor(board.clientHeight / blockheight);
const cols = Math.floor(board.clientWidth / blockwidth);

let blocks = {};

let snake = [{x:5,y:8},{x:5,y:9},{x:5,y:10}];

let direction = 'right';

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

  blocks[ `${x}-${y}` ].classList.add('food')

}
food();


function clearBoard(){
    Object.values(blocks).forEach(block=>{
        block.classList.remove('fill');
    })
}

function render(){

    clearBoard();

    snake.forEach(segment => {
        blocks[`${segment.x}-${segment.y}`].classList.add('fill')
    })
}


function snakeMove(){

    let head = {...snake[snake.length-1]}

    if(direction === 'up') head.x -= 1;
    if(direction === 'down') head.x += 1;
    if(direction === 'right') head.y += 1;
    if(direction === 'left') head.y -= 1;

    snake.push(head);
    snake.shift();
    
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