let board = document.querySelector('.board');
let blockheight = 30;
let blockwidth = 30;
let col = Math.floor(board.clientHeight / blockheight);
let row = Math.floor(board.clientWidth / blockwidth);

for(let i = 0; i < row*col; i++){
    const block = document.createElement('div');
    block.classList.add('block');
    board.appendChild(block);
}
