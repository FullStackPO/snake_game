const board = document.querySelector('.board');

const blockheight = 40;
const blockwidth = 40;

const rows = Math.floor(board.clientHeight / blockheight);
const cols = Math.floor(board.clientWidth / blockwidth);

let blocks = {};

let snake = [{x:5,y:5},{x:5,y:6},{x:5,y:7}];

for(let row = 0; row < rows; row++){
    for(let col = 0; col < cols; col++){
        const block = document.createElement('div');
        block.classList.add('block');
        block.innerText = `${row}-${col}`
        board.appendChild(block);
        blocks[`${row}-${col}`] = block;
    }
}

function render(){
    snake.forEach(segment=>{
        blocks[ `${segment.x}-${segment.y}` ].classList.add('fill');
    })
}
render();