const fs = require('fs');

var fetchNotes = () => {
    try{
    
        var notesString = fs.readFileSync('notes-data.json');
        return JSON.parse(notesString);

    }catch(e){
        return [];
    }

}

var saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
} 

var addNote = (title, body)=> {
    var notes = fetchNotes();
    var note = {
        title,
        body
    };
 
    var duplicatedNotes = notes.filter((note) => note.title === title);
    
    if (duplicatedNotes.length === 0){
        notes.push(note);
        saveNotes(notes);
        return note;    
    }
    
}

var getAll = ()=>{
    return fetchNotes();
}

var getNote = (title) => {
    var notes = fetchNotes();
    return notes.find((note) => note.title === title );
}

var removeNote = (title) => {
  var notes= fetchNotes(); 
  // return array that does not have this note title's
  var filteredNotes =  notes.filter((note)=> note.title !== title);

  saveNotes(filteredNotes); 
  
  return notes.length !== filteredNotes.length;
}

var logNote= (note)=> {
    console.log('--');
    console.log(`Title: ${note.title}`);
    console.log(`Body: ${note.body}`);
}

module.exports = {
    addNote,
    getAll,
    getNote,
    removeNote,
    logNote
}