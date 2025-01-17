let Tasks = []

const Input = document.getElementById("input")
const MainDiv = document.getElementById("main")

function RenderTask(){

    MainDiv.innerHTML = null;

    for(let i = 0; i < Tasks.length; i++){

        const item = Tasks[i]

        const itemDiv = document.createElement("div")
        itemDiv.style.margin = "10px"

        const text = document.createElement("p")
        text.textContent = item
        text.style.display = "inline"
        
        const deleteBtn = document.createElement("button")
        deleteBtn.textContent = "Delete"
        deleteBtn.onclick = () => Delete(i)

        const tick = document.createElement("input")
        tick.type = "checkbox"

        tick.addEventListener("change", () => {
            if(tick.checked){
                text.style.textDecoration = "line-through"
            }
            else{
                text.style.textDecoration = "none"
            }
        })

        itemDiv.appendChild(deleteBtn)
        itemDiv.appendChild(text)
        itemDiv.appendChild(tick)

        MainDiv.appendChild(itemDiv)

    }
}

function AddTask(){

    const ItemStr = Input.value

    if(ItemStr){
        Tasks.push(ItemStr)
    }
    else{
        alert("Cannot Enter an Empty Task.")
    }

    RenderTask()
    Input.value = ""
}

function Delete(i){

    Tasks.splice(i, 1)
    RenderTask()
}