const fs = require('fs');
const chalk = require('chalk');

const addNote = (title, body) => {
   // add only unique titles

   const notes = loadNotes();

   const duplicateItem = notes.filter((note) => {
      return title === note.title;
   });

   if (duplicateItem.length === 0) {
      notes.push({
         title: title,
         body: body,
      });
      saveNotes(notes);
      console.log(chalk.green.inverse('New note added'));
   } else {
      console.log(chalk.red.inverse('Title already exists'));
   }
};

const saveNotes = (notes) => {
   const json = JSON.stringify(notes);
   fs.writeFileSync('notes.json', json);
};

const loadNotes = () => {
   try {
      const buffer = fs.readFileSync('./notes.json');
      const dataJSON = buffer.toString();
      const data = JSON.parse(dataJSON);
      return data;
   } catch (error) {
      return [];
   }
};

const removeNote = (title) => {
   // load the notes
   const notes = loadNotes();
   const noteTokeep = notes.filter((note) => {
      return note.title !== title;
   });
   if (notes.length > noteTokeep.length) {
      saveNotes(noteTokeep);
      console.log(chalk.green.inverse('Note removed'));
   } else {
      console.log(chalk.red.inverse('No note found'));
   }
};

module.exports = {
   addNote,
   removeNote,
};
