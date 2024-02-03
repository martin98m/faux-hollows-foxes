
function reloadBoards() {
    displayBoard(displayed_board);
    displayHeader(displayed_header_boards);
    displaySolvedBoards(displayed_board_patterns);
}

function rotateCount(count, board) {
    let result = board;
    for (let i = 0; i < count; i++) {
        result = rotateBoard(result);
    }
    return result;
}

function rotateBoard(start) {
    const rotate = Array(36);

    for (let i = 0; i < start.length; i++) {
        const row = Math.floor(i / 6);
        const col = i % 6;
        const new_row = col;
        const new_col = 5 - row;
        const new_pos = new_row * 6 + new_col;
        rotate[new_pos] = start[i]
    }

    return rotate.join('');
}


function displayBoard(board, x) {

    document.getElementById('box').innerHTML = '';
    for (let i = 0; i < board.length; i++) {
        const newDiv = document.createElement("div");

        // and give it some content
        if (x) {
            const newContent = document.createTextNode(x[i]);
            // add the text node to the newly created div
            newDiv.appendChild(newContent);
        }
        if (board[i] !== 'G') {
            newDiv.onclick = function () { markField(i) };
            //newDiv.oncontextmenu = function () { markField(i) }
        }
        switch (board[i]){
            case 'X':
                newDiv.appendChild(document.createTextNode('X'));
                //newDiv.className = 'W';
                //break;
            default:
                newDiv.className = board[i] == 'X' ? 'W' : board[i];
        }

        document.getElementById('box').appendChild(newDiv);
    }
}

function getBoardChildren(board) {
    const res = [];
    for (let i = 0; i < board.length; i++) {
        const newDiv = document.createElement("div");
        newDiv.className = board[i]

        res.push(newDiv);
    }
    return res;
}

function getBoard(board) {
    const boardDiv = document.createElement('div');
    boardDiv.className = 'grid-board-container';

    getBoardChildren(board).map(x => boardDiv.appendChild(x));

    return boardDiv;
}

function displayHeader(boards) {
    const header1 = document.getElementById('header-table-1')
    header1.innerHTML = '';
    header1.onclick = function () { selectBoard(0) }
    getBoardChildren(boards[0]).map(x => header1.appendChild(x));

    const header2 = document.getElementById('header-table-2');
    header2.innerHTML = '';
    header2.onclick = function () { selectBoard(1) }
    getBoardChildren(boards[1]).map(x => header2.appendChild(x));

    const header3 = document.getElementById('header-table-3');
    header3.innerHTML = '';
    header3.onclick = function () { selectBoard(2) }
    getBoardChildren(boards[2]).map(x => header3.appendChild(x));

    const header4 = document.getElementById('header-table-4');
    header4.innerHTML = '';
    header4.onclick = function () { selectBoard(3) }
    getBoardChildren(boards[3]).map(x => header4.appendChild(x));
}

function displaySolvedBoards(boards) {
    const patterns = document.getElementById('item-board-patterns');
    patterns.innerHTML = '';
    boards.map(x => patterns.appendChild(getBoard(x)))
}

function selectBoard(id) {
    board_number = id
    displayed_board = displayed_header_boards[id];
    displayed_board_patterns = rotateCount(rotation, solved_boards[id]);
    reloadBoards()
}



function boardMatches(a, b) {
    for (let i = 0; i < 36; i++) {
        //if (a[i] == 'R' || a[i] == 'B' || a[i] == 'G' || a[i] == 'P')
        //console.log(a[i], b[i])
        if (['R', 'B', 'G', 'P'].includes(a[i]))
            if (a[i] !== b[i])
                return false
        if (a[i] == 'X' && (b[i] != 'W' && b[i] != 'P'))
            return false;
    }
    return true
}

function findMatches(id) {
    let match = solved_boards[id].map(x=>rotateCount(rotation, x)).filter(x => boardMatches(displayed_board, x))
    return match;
}

function getDefaultBoardData(id) {
    return {
        board: boards[id],
        board_patterns: solved_boards[id]
    };
}
