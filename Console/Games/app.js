const prompt = require("prompt-sync")()

function getInput(str, min, max){

    while(true){
        const input = parseInt(prompt(str))

        if(isNaN(input) || input < min || input > max){
            console.log("Invalid Input.")
        }
        else{
            return input;
        }
    }   
}

function getBoardInput(board, marker){

    while(true){
        const pos = getInput("Enter a position[1 - 9]: ", 1, 9)

        if(board[pos] != " "){
            console.log("There is already a marker placed there.")
        }
        else{
            board[pos] = marker;
            DisplayGrid(board)
            break;
        }
    }
   
}

function DisplayGrid(grid){

    console.log(`${grid[1]} | ${grid[2]} | ${grid[3]}`)
    console.log("-----------")
    console.log(`${grid[4]} | ${grid[5]} | ${grid[6]}`)
    console.log("-----------")
    console.log(`${grid[7]} | ${grid[8]} | ${grid[9]}`)
    console.log("-----------")
}

function CheckWinner(board, marker){

    const winning_pos = [[1 ,2, 3], [4, 5, 6], [7, 8, 9], [1 ,4, 7], [2, 5, 8], [3, 6, 9], [1 ,5, 9], [3, 5, 7]]

    for(let state of winning_pos){

        if(board[state[0]] == board[state[1]] && board[state[1]] == board[state[2]] && board[state[0]] == marker){
            return true;
            break;
        }
    }
    return false;
}

function CheckDraw(board){

    const map = {}

    board.forEach(item => {
        map[item] = (map[item] || 0) + 1
    })

    const Empty = map[" "];

    if(!CheckWinner(board, "X") && !CheckWinner(board, "O") && Empty <= 1){
        return true;
    }

    return false
}

function Tic_Tac_Toe(){
    
    const board = Array(10).fill(" ")

    let gameOver = false;

    console.log("The Starting Board is: ")
    console.log()
    DisplayGrid(board)
    console.log()

    do{

        console.log("Player with X Plays: ")
        getBoardInput(board, "X");

        if(CheckWinner(board, "X")){
            console.log("Player with X wins!")
            gameOver = true;
            break;
        }

        if(CheckDraw(board)){
            console.log("It's a Draw!")
            gameOver = true;
            break;
        }

        console.log("Now Player with O Plays: ")
        getBoardInput(board, "O")

        if(CheckWinner(board, "O")){
            console.log("Player with O wins!")
            gameOver = true;
            break;
        }

        if(CheckDraw(board)){
            console.log("It's a Draw!")
            gameOver = true;
            break;
        }
    }
    while(!gameOver)
}

function DisplayBoard(grid){

    for(let row of grid){
        console.log(`${row[0]} | ${row[1]} | ${row[2]} | ${row[3]} | ${row[4]} | ${row[5]} | ${row[6]} | ${row[7]} | ${row[8]}`)
        console.log("-----------------------------------")
    }
}

function GetEmptySpaces(grid){

    let num = 0

    for(let i = 0; i < 9; i++){
        for(let j = 0; j < 9; j++){
            if(grid[i][j] === 0){
                num++;
            }
        }
    }

    return num
}

function VerifyInput(grid, row, col, num){

    //ROW
    for(let i = 0; i < 9; i++){
        if(grid[row - 1][i] == num){
            return false;
        }
    }

    //COL
    for(let i = 0; i < 9; i++){
        if(grid[i][col - 1] == num){
            return false;
        }
    }

    //BOX
    let startRow = (row - 1) - ((row - 1) % 3)
    let startCol = (col - 1) - ((col - 1) % 3)

    for(let i = startRow; i < startRow + 3; i++){
        for(let j = startCol; j < startCol + 3; j++){
            if(grid[i][j] == num){
                return false;
            }
        }
    }

    return true;
}

function CheckifOriginal(row, col, orig_rows, orig_cols){

    for(let i = 0; i < orig_cols.length; i++){

        if(orig_rows[i] == (row - 1) && orig_cols[i] == (col - 1)){
            return true;
        }
    }

    return false;
}

function SolveSudoku(grid, row, col){

    if(col == 9 && row == 8){
        return true;
    }

    if(col == 9){
        row++;
        col = 0;
    }

    if(grid[row][col] != 0){
        return SolveSudoku(grid, row, col + 1)
    }

    for(let i = 1; i < 10; i++){
        
        if(VerifyInput(grid, (row + 1), (col + 1), i)){
            grid[row][col] = i;

            DisplayBoard(grid)
            console.log()

            if(SolveSudoku(grid, row, col + 1)){
                return true;
            }
        }

        grid[row][col] = 0;
    }

    return false;
}

function Sudoku(){

    const grid = [[ 3, 0, 6, 5, 0, 8, 4, 0, 0 ],
             [ 5, 2, 0, 0, 0, 0, 0, 0, 0 ],
             [ 0, 8, 7, 0, 0, 0, 0, 3, 1 ],
             [ 0, 0, 3, 0, 1, 0, 0, 8, 0 ],
             [ 9, 0, 0, 8, 6, 3, 0, 0, 5 ],
             [ 0, 5, 0, 0, 9, 0, 6, 0, 0 ],
             [ 1, 3, 0, 0, 0, 0, 2, 5, 0 ],
             [ 0, 0, 0, 0, 0, 0, 0, 7, 4 ],
             [ 0, 0, 5, 2, 0, 6, 3, 0, 0 ]]

    let orig_grid = [[ 3, 0, 6, 5, 0, 8, 4, 0, 0 ],
    [ 5, 2, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 8, 7, 0, 0, 0, 0, 3, 1 ],
    [ 0, 0, 3, 0, 1, 0, 0, 8, 0 ],
    [ 9, 0, 0, 8, 6, 3, 0, 0, 5 ],
    [ 0, 5, 0, 0, 9, 0, 6, 0, 0 ],
    [ 1, 3, 0, 0, 0, 0, 2, 5, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 7, 4 ],
    [ 0, 0, 5, 2, 0, 6, 3, 0, 0 ]]

    const orig_rows = [];
    const orig_cols = [];

    for(let i = 0; i < grid.length; i++){
        for(let j = 0; j < grid[i].length; j++){
            if(grid[i][j] !== 0){
                orig_rows.push(i);
                orig_cols.push(j);
            }
        }
    }

    console.log("Initial Board is: ")
    DisplayBoard(grid)

    let gameOver = false;

    while(!gameOver){
        const row = getInput("Enter row number[1-9], Enter 10 for the CPU to solve: ", 1, 10)
        const col = getInput("Enter col number[1-9]: ", 1, 9)
        const num = getInput("Enter number[1-9]: ", 1, 9)

        if(!(row === undefined || col === undefined || num === undefined)){

            if(row <= 9){

                if(CheckifOriginal(row, col, orig_rows, orig_cols)){
                    console.log("An Original Number is already present there.")
                }
                else{
                    if(VerifyInput(grid, row, col, num)){
                        grid[row - 1][col - 1] = num;
                        DisplayBoard(grid)
        
                        if(GetEmptySpaces(grid) == 0){
                            console.log("You completed this Sudoku!");
                            gameOver = true;
                        }
                    }
                    else{
                        console.log("Incorrect input.")
                    }
                }                
            }
            else if(row == 10){

                if(SolveSudoku(orig_grid, 0, 0)){
                    console.log("The Board is Solved.")
                    DisplayBoard(orig_grid);
                }
                else{
                    console.log("This board has no solution.")
                }

                gameOver = true;
            }
        }
    }
}

let loop = true

while(loop){
    console.log()
    console.log("1. Sudoku.")
    console.log("2. Tic-Tac-Toe.")
    console.log("3. Exit.")
    console.log()

    const choice = prompt("Enter your choice: ")

    switch(choice){
        case "1":
            Sudoku()
            break;

        case "2":
            Tic_Tac_Toe()
            break;

        case "3":
            loop = false;
            break;    

        default:
            console.log("Enter an appropriate choice.")
            break;
    }
}