const mainlabel = document.getElementById("label")
const playerLabel = document.getElementById("player-label")
const computerLabel = document.getElementById("computer-label")
const Score = document.getElementById("score")
const Out = document.getElementById("out-label")
const buttons = document.querySelectorAll("#btn")

let playerBatting = true;
let player_score = 0;
let comp_score = 0;

function generateComputerMove(){

    return Math.floor(Math.random() * 6) + 1;
}

function UpdateScore(score){

    Score.innerHTML = `Score: ${score}`
}

function Disable(){
    for(let button of buttons){
        button.disabled = true;
    }
}

function Enable(){
    for(let button of buttons){
        button.disabled = false;
    }
}

function BtnClicked(number){

    let comp_move = generateComputerMove();
    playerLabel.innerHTML = `Player Played: ${number}`
    computerLabel.innerHTML = `Computer Played: ${comp_move}`

    if(playerBatting){

        if(number != comp_move){
            player_score += number;
            UpdateScore(player_score)
        }
        else{
            Out.innerHTML = `Player is Out! Computer requires ${player_score + 1} to win!`;
            playerBatting = false;
            mainlabel.innerHTML = "The Computer Bats Now."
        }
    }
    else{

        if(number != comp_move){
            comp_score += comp_move;
            UpdateScore(comp_score);
        }
        else if(number == comp_move && comp_score < player_score - 1){
            Out.innerHTML = `The Player Wins!`;
            Disable()

        }
    }

    if(comp_score > player_score){
        Out.innerHTML = "The Computer Wins!"
        Disable()
    }
    else if(comp_score == player_score){
        Out.innerHTML = "It's a Tie!"
        Disable()
    }
}

for(let i = 0; i < buttons.length; i++){
    buttons[i].onclick = () => BtnClicked(i + 1);
}

function Reset(){
    playerBatting = true;
    player_score = 0;
    comp_score = 0;

    mainlabel.innerHTML = "The Plater Bats First.";
    UpdateScore(player_score);
    playerLabel.innerHTML = "Player Played: "
    computerLabel.innerHTML = "Computer Played: "
    Out.innerHTML = ""

    Enable()
}