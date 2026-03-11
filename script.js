const board = document.querySelector('.board');

const blockheight = 30;
const blockwidth = 30;

const rows = Math.floor(board.clientHeight / blockheight);
const cols = Math.floor(board.clientWidth / blockwidth);

let blocks = [];

let snake = [
    {x:5,y:5},
    {x:5,y:6},
    {x:5,y:7}
];

for(let row = 0; row < rows; row++){
    for(let col = 0; col < cols; col++){
        const block = document.createElement('div');
        block.classList.add('block');
        board.appendChild(block);

        blocks.push(block);
    }
}

function render(){
    snake.forEach(segment =>{
        const index = segment.x * cols + segment.y;
        blocks[index].classList.add('fill');
    })
}
render();