const player_text = document.getElementById("player")
const comp_text = document.getElementById("comp")
const res_text = document.getElementById("result")

const playerWin_ = document.getElementById("playerWin")
const compWin_ = document.getElementById("compWin")
const draw_ = document.getElementById("draw")

let user_wins = 0;
let draws = 0;
let comp_wins = 0;

function getCompChoice(){

    return ["Rock", "Paper", "Scissors"][Math.floor(Math.random() * 3)]
}


function BtnClicked(str){

    player_text.innerHTML = `Player's Choice: ${str}`
    const comp_choice = getCompChoice()
    comp_text.innerHTML = `Computer's Choice: ${comp_choice}`

    const map = {
        "Rock": "Paper",
        "Paper": "Scissors",
        "Scissors": "Rock"
    }

    if(str === comp_choice){
        res_text.innerHTML = "Result: It's a Draw!"
        draws++
    }
    else if(map[str] === comp_choice){
        res_text.innerHTML = "Result: Computer Wins!"
        comp_wins++
    }
    else{
        res_text.innerHTML = "Result: Player Wins!"
        user_wins++
    }
    
    playerWin_.innerHTML = `Player Wins: ${user_wins}`
    compWin_.innerHTML = `Computer Wins: ${comp_wins}`
    draw_.innerHTML = `Draws: ${draws}`
}