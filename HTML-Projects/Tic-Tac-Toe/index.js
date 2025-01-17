let board = Array(10).fill(" ")
const cells = document.querySelectorAll("#cell")
const Label = document.getElementById("label")
const Result = document.getElementById("result")

let clicks = 0;

function ChangeLabel(){

    if(clicks % 2 == 0){
        Label.innerHTML = "Player With X Plays:"
    }
    else{
        Label.innerHTML = "Player With O Plays:"
    }
}

function CheckWin(mark){

    const pos_array = [[1, 2, 3],
                       [4, 5, 6],
                       [7, 8, 9],
                       [1, 4, 7],
                       [2, 5, 8],
                       [3, 6, 9],
                       [1, 5, 9],
                       [3, 5, 7]]

    for(let array of pos_array){
        if(board[array[0]] === board[array[1]] && board[array[1]] === board[array[2]] && board[array[0]] === mark){
            return true;
        }
    }

    return false
}

function Disable(){

    for(let i = 0; i < cells.length; i++){
        cells[i].disabled = true;
    }
}

function CheckDraw(){

    const map = {}

    for(let element of board){
        map[element] = (map[element] || 0) + 1;
    }

    if(!CheckWin("X") && !CheckWin("O") && map[" "] <= 1){
        return true;
    }

    return false;
}

function CellClicked(num){

    
    if(cells[num - 1].innerHTML == ""){

        if(clicks % 2 == 0){
            cells[num - 1].innerHTML = "X"
            board[num] = "X"
        }
        else{
            cells[num - 1].innerHTML = "O"
            board[num] = "O"
        }

        clicks++
    }

    if(CheckWin("X")){
        Result.innerHTML = "Player with X Wins!"
        Disable()
        return;
    }

    if(CheckWin("O")){
        Result.innerHTML = "Player with O Wins!"
        Disable()
        return;
    }

    if(CheckDraw()){
        Result.innerHTML = "It's a Draw!"
        Disable()
        return;
    }

    Result.innerHTML = "Result:"

    ChangeLabel()
}

function Reset(){

    for(let i = 0; i < cells.length; i++){
        cells[i].innerHTML = ""
        cells[i].disabled = false;
    }
    clicks = 0;

    ChangeLabel()

    board = Array(10).fill(" ")

    Result.innerHTML = "Result:"
}