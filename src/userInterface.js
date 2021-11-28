import { format } from 'date-fns';
import AllProjects from './AllProjects_class';

const ALLPROJECTS = new AllProjects();
let currentProjectName = 'index';

function updateLocalStorage() {
  localStorage.setItem('ALLPROJECTS', JSON.stringify(ALLPROJECTS));
}

/// /////////////////////////////////////////////////////////////////////////////
/// //////////////////////////////// Projects ///////////////////////////////////
/// /////////////////////////////////////////////////////////////////////////////
function addProject() {
  const addProjectBtn = document.querySelector('#add-project-btn');
  const inputProjectNameDiv = document.querySelector('#input-project-name-div');
  const inputName = document.querySelector('#inputName');
  const saveBtn = document.querySelector('#save');
  const discardBtn = document.querySelector('#discard');

  addProjectBtn.addEventListener('click', () => {
    inputProjectNameDiv.style.display = 'block';
  });

  saveBtn.addEventListener('click', () => { // create new project
    try {
      ALLPROJECTS.addProject(inputName.value);
      displayProject(inputName.value);
      inputName.value = '';
      updateLocalStorage();
    } catch (exception) {
      window.alert(exception);
    }
  });

  discardBtn.addEventListener('click', () => {
    inputProjectNameDiv.style.display = 'none';
  });
}

function displayProject(name) {
  const projectDiv = document.createElement('div');
  const currentProjectNameH1 = document.querySelector('#current-project-name');
  projectDiv.classList.add('project');
  projectDiv.addEventListener('click', () => {
    currentProjectName = name;
    currentProjectNameH1.innerText = currentProjectName;
    loadNotes();
  });

  const projectNameSpan = document.createElement('span');
  projectNameSpan.innerText = name;
  projectNameSpan.title = name; // tootip
  projectDiv.appendChild(projectNameSpan);

  if (name !== 'index') {
    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'X';
    deleteBtn.addEventListener('click', (e) => {
      deleteProject(projectDiv, name);
      e.stopPropagation();
    });
    projectDiv.appendChild(deleteBtn);
  }

  document.querySelector('#left-container').appendChild(projectDiv);
}

function deleteProject(element, name) {
  element.remove();
  ALLPROJECTS.removeProject(name);
  updateLocalStorage();
}

function loadProjects() {
  ALLPROJECTS.getProjects().forEach((project) => {
    displayProject(project.getName());
  });
}

function toggleMobileNavMenu() {
  const mobileNavBtn = document.querySelector('#mobile-nav-button');
  const mobileNav = document.querySelector('nav');

  mobileNavBtn.addEventListener('click', () => {
    if (mobileNav.style.display === 'none') {
      mobileNav.style.display = 'block';
      document.body.style.overflow = 'hidden';
      mobileNavBtn.style = 'border: inset #e1271c';
    } else {
      mobileNav.style.display = 'none';
      document.body.style.overflow = 'visible';
      mobileNavBtn.style = 'border: outset #e1271c';
    }
  });
}

/// //////////////////////////////////////////////////////////////////////////
/// //////////////////////////////// Notes ///////////////////////////////////
/// //////////////////////////////////////////////////////////////////////////
function loadNotes() {
  document.querySelector('#notes-container').innerHTML = ''; // clear page to display new project's notes

  const project = ALLPROJECTS.getProjectByName(currentProjectName).notes;
  project.forEach((note) => {
    displayNote(note.getName());
  });
}

function displayNote(noteName) {
  const currentNote = ALLPROJECTS.getProjectByName(currentProjectName).getNoteByName(noteName);

  const noteDiv = document.createElement('div');
  noteDiv.classList.add('note');

  const noteNameSpan = document.createElement('span');
  noteNameSpan.style.cssText = 'margin-right: auto;';
  noteNameSpan.innerText = noteName;
  noteNameSpan.title = noteName; // tootip

  const checkSpan = document.createElement('span');
  checkSpan.classList.add('checkNote');

  toggleCheckNote(currentNote);
  checkSpan.addEventListener('click', () => {
    currentNote.setChecked();
    toggleCheckNote(currentNote);
  });

  function toggleCheckNote(note) { // check or uncheck
    if (note.getChecked() === true) {
      checkSpan.style.cssText = 'background-color: #ede9d9;';
      noteNameSpan.style.cssText = 'margin-right: auto; text-decoration: line-through;';
    } else {
      checkSpan.style.cssText = 'background-color: white;';
      noteNameSpan.style.cssText = 'margin-right: auto;';
    }
    updateLocalStorage();
  }

  // due date
  const dueDateInput = document.createElement('input');
  dueDateInput.type = 'date';
  const dueDateSpan = document.createElement('span');
  dueDateSpan.style.color = '#ede9d9';
  if (currentNote.dueDate) {
    dueDateSpan.innerText = currentNote.dueDate;
    dueDateInput.style.display = 'none';
  } else {
    dueDateSpan.style.display = 'none';
  }

  dueDateInput.addEventListener('input', () => {
    dueDateSpan.style.display = 'inline';
    dueDateSpan.innerText = format(dueDateInput.valueAsDate, 'MM/dd/yyyy');
    dueDateInput.style.display = 'none';
    currentNote.dueDate = dueDateSpan.innerText;
    updateLocalStorage();
  });

  dueDateSpan.addEventListener('click', () => {
    dueDateSpan.style.display = 'none';
    dueDateInput.style.display = 'inline';
  });

  // delete
  const deleteBtn = document.createElement('button');
  deleteBtn.innerText = 'X';
  deleteBtn.addEventListener('click', () => {
    deleteNote(noteDiv, noteName);
  });

  noteDiv.appendChild(checkSpan);
  noteDiv.appendChild(noteNameSpan);
  noteDiv.appendChild(dueDateInput);
  noteDiv.appendChild(dueDateSpan);
  noteDiv.appendChild(deleteBtn);

  document.querySelector('#notes-container').appendChild(noteDiv);
}

function addNote() {
  const inputNoteName = document.querySelector('#inputNoteName');
  const saveNoteBtn = document.querySelector('#saveNote');
  const discardNoteBtn = document.querySelector('#discardNote');

  saveNoteBtn.addEventListener('click', () => { // create new note
    try {
      ALLPROJECTS.getProjectByName(currentProjectName).addNote(inputNoteName.value, '');
      displayNote(inputNoteName.value);
      inputNoteName.value = '';
      updateLocalStorage();
    } catch (exception) {
      window.alert(exception);
    }
  });

  discardNoteBtn.addEventListener('click', () => {
    inputNoteName.value = '';
  });
}

function deleteNote(element, name) {
  element.remove();
  ALLPROJECTS.getProjectByName(currentProjectName).removeNote(name);
  updateLocalStorage();
}

export {
  loadProjects,
  loadNotes,
  addProject,
  addNote,
  toggleMobileNavMenu,
  ALLPROJECTS,
};
