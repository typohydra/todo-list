import OneProject from './OneProject_class';
import Note from './Note_class';
import {
  loadNotes, loadProjects, addProject, addNote, toggleMobileNavMenu, ALLPROJECTS,
} from './userInterface';

export default function loadLocalStorage() {
  if (localStorage.length === 0) {
    ALLPROJECTS.projects.push(new OneProject('index'));
  } else { // recreate class objects from localStorage
    const storageAllProjects = JSON.parse(localStorage.getItem('ALLPROJECTS'));

    (storageAllProjects.projects).forEach((project) => {
      ALLPROJECTS.projects.push(new OneProject(project.name));

      (project.notes).forEach((note) => {
        const tempNote = new Note(note.name, '');
        tempNote.checked = note.checked;
        tempNote.dueDate = note.dueDate;
        ALLPROJECTS.projects[ALLPROJECTS.projects.length - 1].notes.push(tempNote);
      });
    });
  }

  loadNotes(); // load index notes as default display
  loadProjects();
  addProject();
  addNote();
  toggleMobileNavMenu();
}
