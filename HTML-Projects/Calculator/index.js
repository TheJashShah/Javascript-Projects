const Input = document.getElementById("input")
const Buttons = document.querySelectorAll("#btn")

let str = "";

function UpdateInput(){

    Input.value = str;
}

for(let button of Buttons){
    button.addEventListener("click", () => {

        if(button.innerHTML == "="){
            try{
                let val = eval(str);
                str = val.toString();
            }
            catch (e) {
                str = "Incorrect evaluation entered."
            }
        }
        else if(button.innerHTML == "C"){
            str = ""
        }
        else if(button.innerHTML == "BC"){
            str = str.substring(0, str.length - 1)
        }
        else{
            str += button.innerHTML;
        }

        UpdateInput()
    })
}