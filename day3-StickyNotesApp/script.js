let notes = JSON.parse(localStorage.getItem("notes")) || [];

const addButton = document.getElementById("Add-Button");

addButton.addEventListener("click",()=>{
    let noteIput = document.getElementById("note-input").value;
    document.getElementById("note-input").value = "";
    if(noteIput.trim() === ""){
        document.getElementById("notes-here").innerHTML = `<h5>⚠️ Please enter something!</h5>`;
        return;
    }

    const noteObjet = {
        id: Date.now(),
        text:noteIput,
    }
    notes.push(noteObjet);
    localStorage.setItem("notes", JSON.stringify(notes));
    console.log(notes)
    getAllNotes();

})

let getAllNotes = () =>{
    let notesHere = document.getElementById("notes-here")
    notesHere.innerHTML = "";
    const notesLocalStorage = JSON.parse(localStorage.getItem("notes"))
    notesLocalStorage.forEach((element, index) => {
          console.log(element.text)
        document.getElementById("notes-here").innerHTML += `<h5> <span>${element.text}</span>  <button onClick="deleteNote(${index})">❌ Delete</button> </h5>` 
      
    });
}
let deleteNote = (id) =>{
    notes = JSON.parse(localStorage.getItem("notes"));
    notes.splice(id,1);
    localStorage.setItem("notes", JSON.stringify(notes));
    getAllNotes();
}

getAllNotes();