document.addEventListener('contextmenu', event => event.preventDefault());

let board_number = 0;
let rotation = 0;
let selected_color = 'R';
let displayed_board = board_1;
let displayed_board_patterns = board_1_solve;
let displayed_header_boards = boards;

reloadBoards();

function reset() {
    rotation = 0;
    selected_color = 'R';
    const data = getDefaultBoardData(board_number);
    displayed_board = data.board;
    displayed_board_patterns = data.board_patterns;
    displayed_header_boards = boards;
    reloadBoards();
}

function resetBoard() {
    const data = getDefaultBoardData(board_number);
    displayed_board = rotateCount(rotation, data.board);
    displayed_board_patterns = data.board_patterns.map(x=>rotateCount(rotation, x));
    reloadBoards();
}

function rotateCW() {
    rotation = rotation + 1 > 3 ? 0 : rotation + 1;
    displayed_board = rotateBoard(displayed_board);
    displayed_board_patterns = displayed_board_patterns.map(x => rotateBoard(x));
    displayed_header_boards = displayed_header_boards.map(x => rotateBoard(x));
    reloadBoards();
}

function rotateCCW() {
    rotation = rotation - 1 < 0 ? 3 : rotation - 1;
    displayed_board = rotateCount(3, displayed_board);
    displayed_board_patterns = displayed_board_patterns.map(x => rotateCount(3, x));
    displayed_header_boards = displayed_header_boards.map(x => rotateCount(3, x));
    reloadBoards();
}

function changeSelectedColor(c) {
    selected_color = c;
}

function markField(idx) {

    let c = selected_color;
    if(displayed_board[idx] === c)
        c = 'W'

    displayed_board = displayed_board.substring(0, idx) + c + displayed_board.substring(idx + 1)

    displayed_board_patterns = findMatches(board_number);
    document.getElementById('matchCount').innerHTML = displayed_board_patterns.length;

    reloadBoards()
}

function recommendOverlap() {
    let rec = [];
    for (let i = 0; i < 36; i++) {
        let res = [];
        for (let board of findMatches(board_number)) {
            if (board[i] == 'W') continue;
            res.push(board[i]);
        }
        res = new Set(res);
        res = Array.from(res).sort();
        //rec += res.length.toString();
        rec.push(res.join(''))
    }

    displayBoard(displayed_board, rec);
}