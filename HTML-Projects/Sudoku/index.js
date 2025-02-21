const TableDiv = document.getElementById("table");
const PlayBtn = document.getElementById("play");
const Result = document.getElementById("res");

function GenerateRandomSudoku(){

    let grid = new Array(9);

    for(let i = 0; i < 9; i++){
        grid[i] = (new Array(9));
    }

    for(let i = 0; i < 9; i++){
        for(let j = 0; j < 9; j++){
            grid[i][j] = 0;
        }
    }

    let _ = ReturnSolvedGrid(grid, 0, 0);

    for(let i = 0; i < 75; i++){
        let row = Math.floor(Math.random() * 9);
        let col = Math.floor(Math.random() * 9);

        if(grid[row][col] !== 0){
            grid[row][col] = 0;
        }
    }

    return grid;
}

function MakeGrid(){

    const Table = document.createElement("table");
    Table.appendChild(document.createElement("tbody"));

    for(let i = 0; i < 9; i++){
        const Row = document.createElement("tr")

        for(let j = 0; j < 9; j++){

            const Cell = document.createElement("td");

            const Input = document.createElement("input");
            Input.maxLength = "1";
            Input.type = "text";
            Input.className = "input";

            Cell.appendChild(Input);

            Row.appendChild(Cell);
        }
    
        Table.appendChild(Row);
    }

    TableDiv.appendChild(Table);
}

function isValidNum(cell_list, idx){

    let row;
    let col;
    let num = Number(cell_list[idx].value);

    if(idx < 9){
        row = 0;
        col = idx;
    }
    else{
        row = Math.floor(idx / 9);
        col = idx % 9;
    }

    //ROW
    for(let i = 0; i < 9; i++){
        if(i !== col && Number(cell_list[row * 9 + i].value) === num){
            return false;
        }
    }

    //COL
    for(let i = 0; i < 9; i++){
        if(i !== row && Number(cell_list[i * 9 + col].value) === num){
            return false;
        }
    }

    //BOX
    let startRow = row - (row % 3);
    let startCol = col - (col % 3);

    for(let i = startRow; i < startRow + 3; i++){
        for(let j = startCol; j < startCol + 3; j++){
            let index = (i * 9 + j);
            if(index !== idx && Number(cell_list[index].value) === num){
                return false;
            }
        }
    }

    return true;
}

function isValidNumForOnlyAlgo(grid, row, col, num){

    for(let i = 0; i < 9; i++){
        if(grid[row][i] === num){
            return false;
        }
    }

    //COL
    for(let i = 0; i < 9; i++){
        if(grid[i][col] === num){
            return false;
        }
    }

    //BOX
    let startRow = row - (row % 3);
    let startCol = col - (col % 3);

    for(let i = startRow; i < startRow + 3; i++){
        for(let j = startCol; j < startCol + 3; j++){
            if(grid[i][j] === num){
                return false;
            }
        }
    }

    return true;
}

function ReturnSolvedGrid(grid, row, col){

    if(row == 9){
        return true;
    }

    if(col == 9){
        return ReturnSolvedGrid(grid, row + 1, 0);
    }

    if(grid[row][col] !== 0){
        return ReturnSolvedGrid(grid, row, col + 1);
    }

    for(let i = 1; i <= 9; i++){
        if(isValidNumForOnlyAlgo(grid, row, col, i)){
            grid[row][col] = i;

            if(ReturnSolvedGrid(grid, row, col + 1)){
                return true;
            }
        }

        grid[row][col] = 0;
    }

    return false;
}

function Check(cell_list, solved){
    for(let i = 0; i < 81; i++){
        if(Number(cell_list[i].value) !== solved[Math.floor(i / 9)][i % 9]){
            return false;
        }
    }

    return true;
}

function Play(){

    PlayBtn.disabled = "true";

    TableDiv.innerHTML = "";

    // let grid =  [[ 3, 0, 6, 5, 0, 8, 4, 0, 0 ],
    //              [ 5, 2, 0, 0, 0, 0, 0, 0, 0 ],
    //              [ 0, 8, 7, 0, 0, 0, 0, 3, 1 ],
    //              [ 0, 0, 3, 0, 1, 0, 0, 8, 0 ],
    //              [ 9, 0, 0, 8, 6, 3, 0, 0, 5 ],
    //              [ 0, 5, 0, 0, 9, 0, 6, 0, 0 ],
    //              [ 1, 3, 0, 0, 0, 0, 2, 5, 0 ],
    //              [ 0, 0, 0, 0, 0, 0, 0, 7, 4 ],
    //              [ 0, 0, 5, 2, 0, 6, 3, 0, 0 ]];

    let grid = GenerateRandomSudoku();

    let solved = JSON.parse(JSON.stringify(grid));
 
    let _ = ReturnSolvedGrid(solved, 0, 0);

    MakeGrid();

    let cell_list = document.querySelectorAll(".input");

    for(let i = 0; i < 9; i++){
        for(let j = 0; j < 9; j++){

            if(grid[i][j] !== 0){
                cell_list[(i * 9) + j].value = grid[i][j];
                cell_list[(i * 9)+ j].disabled = "true";
            }           
        }
    }

    const CheckBtn = document.createElement("button");
    CheckBtn.innerHTML = "Check";

    CheckBtn.addEventListener("click", () => {

        if(Check(cell_list, solved)){
            Result.innerHTML = "Correct!";
        }
        else{
            Result.innerHTML = "Incorrect!";
        }
    })

    TableDiv.appendChild(CheckBtn);

    const SolveBtn = document.createElement("button");
    SolveBtn.innerHTML = "Solve";

    SolveBtn.addEventListener("click", () => {

        for(let i = 0; i < cell_list.length; i++){
            cell_list[i].value = solved[Math.floor(i / 9)][i % 9];
            cell_list[i].disabled = "true";
        }
    })

    TableDiv.appendChild(SolveBtn);

    for(let i = 0; i < cell_list.length; i++){
        cell_list[i].addEventListener("change", () => {

            if (cell_list[i].value === "") {
                cell_list[i].style.backgroundColor = "white";
                return;
            }

            if(isValidNum(cell_list, i)){
                cell_list[i].style.backgroundColor = "#98fb98";
            }
            else{
                cell_list[i].style.backgroundColor = "#f08080";
            }
        })
    }
}

function Reset(){

    location.reload();
}