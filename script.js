const addNewNote = document.getElementById("btn-new-note");
const container = document.querySelector(".container");
const closeBtn = document.getElementById("close");
const writtenNotes = document.getElementById("written-notes");
const writtenTitle = document.getElementById("written-title");
const addBtn = document.getElementById("btn-add-note");
const notesArea = document.querySelector(".writing-area");
const alertMessage = document.querySelector(".alertMsg");
const ok = document.getElementById("ok");
const previousNotes = document.querySelector(".previous-notes");
const delBtn = document.querySelector(".del");
const charCount = document.getElementById("count");
let count = 0;
writtenNotes.addEventListener("input",() => {
    count = writtenNotes.value.length;
    charCount.innerHTML = count;
})




addNewNote.addEventListener("click",() => {
    container.classList.add("display");
})

closeBtn.addEventListener("click",() => {
    if(writtenNotes.value == "" && writtenTitle.value == ""){
        container.classList.remove("display");
        notesArea.classList.remove("displayAlert");
    }else{
        notesArea.classList.add("displayAlert");
        alertMessage.innerHTML = "Add the notes before closing...";
    }
    
})


ok.addEventListener("click",() => {
    notesArea.classList.remove("displayAlert");

})

showNotes();



function addNotes(){
    
    notesArea.classList.remove("displayAlert");
    
    let notes = localStorage.getItem('notes');
    if(notes === null){
        notes= [];
    }else{
        notes = JSON.parse(notes);
    }

  let currentCount = count;
  let currentDateTime = new Date();
  let currentDate = currentDateTime.toLocaleDateString();
  let currentTime = currentDateTime.toLocaleTimeString();
  
    const noteObj = {
        title:writtenTitle.value,
        note:writtenNotes.value,
        count:currentCount,
        currDate:currentDate,
        currTime:currentTime
    }

   

    if(writtenNotes.value != ""){
        notes.unshift(noteObj)
        localStorage.setItem("notes",JSON.stringify(notes));
    }else{
        notesArea.classList.add("displayAlert");
        alertMessage.innerHTML = "Before adding write a notes...";
    
    }
    
    if(writtenNotes.value != ''){
        container.classList.remove("display");
    }
    

  showNotes();
    writtenTitle.value = "";
    writtenNotes.value = "";
    charCount.innerHTML = 0;

}


function showNotes(){
    let noteStructure = '';
    let notes = localStorage.getItem('notes');
    if(notes === null){
        return;
    }else{
        notes=JSON.parse(notes);
    }
    for(let i=0;i<notes.length;i++){
        noteStructure += `<div class="note">
                            <div class="TitlePDelete">
                                <p class="AddedTitle">${notes[i].title === '' ? 'Note' : notes[i].title}</p>
                                <button class="del" id=${i} onclick="deleteNote(${i})">Delete</button>
                            </div>
                            <div class="AddedNote">
                               <p>${notes[i].note}</p>
                            </div>
                            <div class="c-and-t">
                                <div class="cc-div">
                                Character count : 
                                <span class="cc">${notes[i].count}</span>
                                </div>
                                <div class="t-d">
                                <span class="date">${notes[i].currDate}</span>
                                <span class="time">${notes[i].currTime}</span>
                                </div>
                            </div>
                        </div>
        `

        
    }
    previousNotes.innerHTML = noteStructure
   
}



function deleteNote(index) {
    let notes = localStorage.getItem('notes');

    if(notes === null){
        return;

    }else{
        notes=JSON.parse(notes)
    }
    notes.splice(index,1);
    localStorage.setItem('notes',JSON.stringify(notes));
    showNotes();
}



addBtn.addEventListener("click", addNotes);
