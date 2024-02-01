//const start = "RRWPPWRRGWGWPGWWBBWWWWBBWWGWBBPWWWWG";

let board_1_solve = [
    "RRWPPWRRGWGWPGWWBBWWWWBBWWGWBBPWWWWG",
    "WWWPPWWWGWGWPGRRBBWWRRBBWWGWBBPWWWWG",
    "RRWWWWRRGPGWWGWBBPWWWBBWWWGBBWWWWPPG",
    "WWWWWWWWGPGWWGWBBPRRWBBWRRGBBWWWWPPG",
    "RRWWWPRRGWGWWGWPPWWWPBBWWWGBBWWWWBBG",
    "WWWWWPWWGWGWWGWPPWRRPBBWRRGBBWWWWBBG",
    
    "WWWPPWWWGWGWPGWBBBRRWBBBRRGWWWPWWWWG",
    "WWWPPWWWGWGWPGWBBBWWWBBBWWGRRWPWWRRG",
    "RRWWWPRRGWGWWGWPPWWWPBBBWWGBBBWWWWWG",
    "WWWWWPWWGWGWWGWPPWWWPBBBRRGBBBRRWWWG",
    "RRPWWWRRGWGPWGBBBWWWBBBWWWGWWPWWPWWG",
    "WWPWWWWWGWGPWGBBBWWWBBBWRRGWWPRRPWWG",
    
    "WWPWWWWWGWGPWGWWWWBBWWWWBBGRRPBBPRRG",
    "WWPWWWWWGWGPWGWWRRBBWWRRBBGWWPBBPWWG",
    "WWWWWWWWGPGWWGWWWPBBWWRRBBGWRRBBWPPG",
    "WWWWWWWWGPGWWGRRWPBBRRWWBBGWWWBBWPPG"
]

function rotateA(start){
    const rotate = Array(36);

    for(let i = 0; i < start.length; i++){
        const row = Math.floor(i / 6);
        const col = i % 6;
        const new_row = col;
        const new_col = 5 - row;
        const new_pos = new_row * 6 + new_col;
        rotate[new_pos] = start[i]
    }

    return rotate.join('');
}

const board_1 = 'WWWWWWWWGWGWWGWWWWWWWWWWWWGWWWWWWWWG';
const board_2 = 'WWWGWWWWWWWWWGWWGWWWWGWWWWWWWWWWGWWW';
const board_3 = 'WWWWGWWGWWWWWWWGWWWWWWWWWGWWWWWWWGWW';
const board_4 = 'WWWWWWWGWWWWWWWWGWGWWWWWWWWGWWWWGWWW';
const boards = [board_1,board_2, board_3, board_4]

function displayBoard(board, x){

    document.getElementById('box').innerHTML = '';
    for(let i = 0; i < board.length; i++){
        const newDiv = document.createElement("div");

        // and give it some content
        if(x){
            const newContent = document.createTextNode(x[i]);
            // add the text node to the newly created div
            newDiv.appendChild(newContent);
        }
        
        newDiv.className = board[i]

        document.getElementById('box').appendChild(newDiv);
    }
}

let cur_board = board_1;
displayBoard(board_1);

function rotateCw(){
    const newB = rotateA(cur_board);
    board_1_solve = board_1_solve.map(x=> rotateA(x));
    displayBoard(newB)
    cur_board = newB;
}

function selectBoard(id){
    cur_board = boards[id];
    displayBoard(cur_board);
}

let i = 0;
function testing(){
    displayBoard(board_1_solve[i%16]);
    i++
}

function markField(i, c){
    cur_board = cur_board.substring(0, i) + c + cur_board.substring(i+1)
    console.log(i, c, cur_board);
    displayBoard(cur_board);

    const r = findMatches();
    document.getElementById("matchCount").innerHTML = r.length;
}

function boardMatches(a, b){
    for (let i = 0; i < 36; i++){
        if (a[i] == 'R' || a[i] == 'B' || a[i] == 'G')
            if (a[i] !== b[i])
                return false
    }
    return true
}

function findMatches(){
    let match = board_1_solve.filter(x=>boardMatches(cur_board, x))
    console.log(match);
    return match;
}

function recommendOverlap(){
    let rec = [];
    for(let i = 0; i < 36; i++){
        let res = [];
        for(let board of findMatches()){
            if (board[i] == 'W') continue;
            res.push(board[i]);
        }
        res = new Set(res);
        res = Array.from(res).sort();
        //rec += res.length.toString();
        rec.push(res.join(''))
    }
    

    displayBoard(cur_board, rec);

}