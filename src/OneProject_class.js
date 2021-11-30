import Note from './Note_class';

export default class OneProject {
  constructor(name) {
    this.notes = [];

    this.name = name;
  }

  getName() {
    return this.name;
  }

  setName(name) {
    this.name = name;
  }

  getNoteByName(noteName) {
    for (let i = 0; i < this.notes.length; i++) {
      if (this.notes[i].getName() === noteName) {
        return this.notes[i];
      }
    }

    return null;
  }

  addNote(name, description) {
    const noteName = name.trim();

    if (noteName.length === 0) throw new Error("Note Name Can't Be Empty.");

    this.notes.forEach((note) => {
      if (note.getName() === noteName) { throw new Error('Note Name Already Used.'); }
    });

    this.notes.push(new Note(noteName, description));
  }

  removeNote(name) {
    if (name.length === 0) return;

    for (let i = 0; i < this.notes.length; i++) {
      if (this.notes[i].getName() === name) {
        this.notes.splice(i, 1);

        return;
      }
    }
  }
}
