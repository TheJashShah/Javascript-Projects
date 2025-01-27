const Label = document.getElementById("label")
const Color = document.getElementById("color")
const Body = document.body


function Update(){

    let color = Color.value;

    Label.innerHTML = `Color: ${color}`
    Body.style.backgroundColor = color;
}