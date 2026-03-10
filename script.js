let board = document.querySelector('.board');
let blockheight = 30;
let blockwidth = 30;
let cols = Math.floor(board.clientHeight / blockheight);
let rows = Math.floor(board.clientWidth / blockwidth);

for(let row = 0; row < rows; row++){
    for(let col =0; col < cols; col++){
        let block = document.createElement('div');
        block.classList.add('block');
        board.appendChild(block);
    }
}
