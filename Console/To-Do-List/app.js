const prompt = require("prompt-sync")()
const fs = require("fs")

function PrintInfo(){

    console.log()
    console.log("1. Add a Task.")
    console.log("2. Update a Task.")
    console.log("3. Delete a Task.")
    console.log("4. View List.")
    console.log("5. Exit.")
    console.log()
}

function LoadList(){

    try{
        const data = fs.readFileSync("database.json", "utf8")
        const List = JSON.parse(data).List
        return List
    }
    catch (e) {
        return []
    }
    
}

const List = LoadList()
let loop = true

function AddTask(){

    const taskContent = prompt("Enter Task: ")
    let Priority = parseInt(prompt("Enter Priority[1 is the highest]: "))

    if(isNaN(Priority) || Priority < 1){
        Priority = 100
    }

    const Task = {
        content : taskContent,
        Priority: Priority,
        status: false
    }

    List.push(Task)
    console.log("Task Added.")
}

function UpdateTask(){

    console.log("Task with Indices: ")

    for(let i = 0; i < List.length; i++){
        const task = List[i]
        console.log(`${i + 1}. ${task.content}`)
    }

    const num = parseInt(prompt("Enter index of Task to be changed: "))

    if(isNaN(num) || num < 1 || num > List.length){
        console.log("Invalid.")
        return
    }
    else{

        const choice = prompt("Enter [C]ontent / [P]riority / [S]tatus: ").toLowerCase()

        switch(choice){

            case "c":
                const newContent = prompt("Enter New Content: ")
                List[num - 1].content = newContent;
                break;

            case "p":
                let newPriority = parseInt(prompt("Enter New Priority: "))

                if(isNaN(newPriority) || newPriority < 1){
                    newPriority = 100;
                }

                List[num - 1].Priority = newPriority;
                break;

            case "s":

                const newStatus = prompt("Enter New Status[T/F]: ")

                if(newStatus === "T"){
                    List[num - 1].status = true;
                }

                break;

            default:
                console.log("Invalid Input.")
                break;
        }
    }
}

function DeleteTask(){

    console.log("Task with Indices: ")

    for(let i = 0; i < List.length; i++){
        const task = List[i]

        console.log(`${i + 1}. ${task.content}`)
    }

    const number = parseInt(prompt("Enter Index: "))

    if(isNaN(number) || number < 1 || number > List.length){
        console.log("Invalid.")
        return;
    }

    List.splice((number - 1), 1);

}

function ViewList(){

    console.log(List)

}


function SaveList(){

    const Database = {
        List: List
    }

    fs.writeFile("database.json", JSON.stringify(Database) , (error) => {
        if (error) throw error;
    })
}

console.log("        To-Do-List.        ")
console.log("--------------------------")

while(loop){

    PrintInfo()

    const choice = prompt("Enter your choice: ")

    switch(choice){

        case "1":
            AddTask()
            break;
        
        case "2":
            UpdateTask()
            break;

        case "3":
            DeleteTask()
            break;

        case "4":

            List.sort((a, b) => {
                return a.Priority - b.Priority;
            })

            ViewList()
            break;

        case "5":
            SaveList();
            loop = false;
            break;
    }
}