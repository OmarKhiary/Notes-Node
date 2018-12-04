const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js'); 

const titleOptions = {
    describe:'Title of note',
    demand: true,
    alias:'t'
}
const bodyOptions = {
    describe:'Write Your Body Of Note',
    demand:true,
    alias:'b'  
}
const argv = yargs
        .command('add', 'Add a new note',{
            title:titleOptions,
            body:bodyOptions
        })
        .command('list','List all notes')
        .command('read', 'Read a note',{
        title: titleOptions
        }).command('remove','Remove a note', {
            title:titleOptions
        })
        .help()
        .argv;
var command = process.argv[2];
// console.log('Command: ', command ); 
// console.log('Yargs', argv);

if(command === 'add'){
    //  console.log('Adding new Note ');
  var note = notes.addNote(argv.title, argv.body);

  if(note){
      console.log('Note Created');
    notes.logNote(note);
  }else{
    console.log('--');
    console.log('Note Title has Taken')
  }
}else if (command === 'list' ){
  //  console.log('Listing all notes');
  var allNotes = notes.getAll();
    console.log(`Printing ${allNotes.length} note(s)`);
    allNotes.forEach((note)=> notes.logNote(note));
}else if(command === 'read'){
  var note = notes.getNote(argv.title);
    if(note){
        console.log('Note is Founded');
        notes.logNote(note);
    }else{
        console.log('Note not Found')
    }
}else if(command === 'remove'){
  var noteRemoved = notes.removeNote(argv.title);
  var message = noteRemoved ? 'Note was Removed' : 'Note not Found';
    console.log(message);
}
else{
    console.log('Command not recognized');
}