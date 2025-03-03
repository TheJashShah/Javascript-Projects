const MainDiv = document.getElementById("notes")

const notes = [];

function AddNote(){

    const date = new Date();

    notes.push({
        title: "Title",
        content: "Content",
        timestamp: `${date.getDay()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
    });

    RenderNotes();
}

function DeleteNote(idx){

    notes.splice(idx, 1);
    RenderNotes();
}

function RenderNotes(){

    MainDiv.innerHTML = "";

    if(notes.length === 0) {
        MainDiv.innerHTML = "Add Some Notes!";
    }

    else {

        for(let i = 0; i < notes.length; i++) {

            let note = notes[i];

            const Note = document.createElement("div");
            Note.id = "note";

            const Title = document.createElement("h2");
            Title.innerHTML = note.title;
            Title.contentEditable = true;
            Title.addEventListener("input", () => {
                note.title = Title.innerHTML;
            })

            const Content = document.createElement("p");
            Content.innerHTML = note.content;
            Content.contentEditable = true;
            Content.addEventListener("input", () => {
                note.Content = Content.innerHTML;
            })

            const Date = document.createElement("h4");
            Date.innerHTML = `Created on ${note.timestamp}`;

            const Delete = document.createElement("button");
            Delete.innerHTML = "Delete";
            Delete.addEventListener("click", () => {
                DeleteNote(i);
            })

            Note.appendChild(Title);
            Note.appendChild(Content);
            Note.appendChild(Date);
            Note.appendChild(Delete);

            MainDiv.appendChild(Note);
        }
    }
}