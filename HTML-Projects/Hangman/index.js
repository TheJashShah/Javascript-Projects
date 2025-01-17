const words = ["DEATH", "POWER", "MONEY", "HATE", "LAW", "GOD", "FAME", "ATTENTION"]
const label = document.getElementById("word")
const LiveLabel = document.getElementById("LiveLabel")
const Input = document.getElementById("input")
const Result = document.getElementById("result")
const Guess = document.getElementById("guess")

let word;
let lives = 7;
let word_arr;

function updateLives(){

    LiveLabel.innerHTML = `Lives: ${lives}`
}

function UpdateLabel(){

    label.innerHTML = word_arr.join(" ")
}

function PlayClicked(){

    word = words[Math.floor(Math.random() * words.length)]
    word_arr = Array(word.length).fill("_")
    Result.innerHTML = ""
    lives = 7

    UpdateLabel()
    updateLives()

    Guess.disabled = false
    Input.value = ""
}

function CheckWin(){

    if(word == word_arr.join("")){
        return true
    }
}

function GuessClicked(){

    if(!Input.value || !word){
        alert("Either Click Play or Enter a Word.")
        return
    }

    if(Input.value.length > 1){
        alert("You can only enter one word at a time.")
        return
    }

    const letter = Input.value

    if(word.includes(letter.toUpperCase())){

        let indices = []

        for(let i = 0; i < word.length; i++){
            if(word[i] == letter.toUpperCase()){
                indices.push(i)
            }
        }

        for(let index of indices){
            word_arr[index] = letter.toUpperCase()
        }

        UpdateLabel()
    }
    else{
        lives--
    }

    if(CheckWin()){
        Result.innerHTML = "You Correctly Guessed the Word!"
        Guess.disabled = true
        return
    }

    if(!CheckWin() && lives == 0){
        Result.innerHTML = `You Lost! The Word was ${word}`
        Guess.disabled = true
        return
    }

    updateLives()

    Result.innerHTML = ""

    Input.value = ""

}