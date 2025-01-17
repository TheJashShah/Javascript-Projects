let value = 0;
const number = document.getElementById("number")

function RenderValue(){

    const stringNum = `${value}`
    number.innerHTML = stringNum;
}

function Increment(){
    value++
    RenderValue()
}

function Decrement(){

    if(value > 0){
        value--
    }

    RenderValue()
}

function Reset(){
    value = 0
    RenderValue()
}