import { AllProjects, OneProject, Note } from "./todoLogic";

let ALLPROJECTS = new AllProjects();
let currentProjectName = "index";

// Projects
function addProject() {
    const addProjectBtn = document.querySelector('#add-project-btn');
    const inputProjectNameDiv = document.querySelector('#input-project-name-div');
    const inputName = document.querySelector('#inputName');
    const saveBtn = document.querySelector('#save');
    const discardBtn = document.querySelector('#discard');

    addProjectBtn.addEventListener('click', () => {
        inputProjectNameDiv.style.display = "block";
    })

    saveBtn.addEventListener('click', () => { //create new project
        try {
            ALLPROJECTS.addProject(inputName.value);
            displayProject(inputName.value);
            inputName.value = "";
        }
        catch (exception) {
            window.alert(exception);
        }
    })

    discardBtn.addEventListener('click', () => {
        inputProjectNameDiv.style.display = "none";
    })
}

function displayProject(name) {
    
    const projectDiv = document.createElement('div');
    const currentProjectNameH1 = document.querySelector("#current-project-name");
    projectDiv.classList.add("project");
    projectDiv.addEventListener('click', () => {
        currentProjectName = name; 
        currentProjectNameH1.innerText = currentProjectName;
        addNote();
    })
    
    const projectNameSpan = document.createElement('span');
    projectNameSpan.innerText = name;
    projectNameSpan.title = name; // tootip
   
    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = "X";
    deleteBtn.addEventListener('click', () => {
        deleteProject(projectDiv, name);
    })

    projectDiv.appendChild(projectNameSpan);
    projectDiv.appendChild(deleteBtn);

    document.querySelector('#left-container').appendChild(projectDiv);
}

function deleteProject(element, name) {
    element.remove();
    ALLPROJECTS.removeProject(name);
}

const toggleMobileNavMenu = () => {
    const mobileNavBtn = document.querySelector('#mobile-nav-button')
    const mobileNav = document.querySelector('nav')

    mobileNavBtn.addEventListener('click', () => {
        if (mobileNav.style.display === "none") {
            mobileNav.style.display = "block"
            document.body.style.overflow = "hidden"
            mobileNavBtn.style = "border: inset #e1271c"
        } else {
            mobileNav.style.display = "none"
            document.body.style.overflow = "visible"
            mobileNavBtn.style = "border: outset #e1271c"
        }
    })
};

// Notes
function addNote() {
    const inputNoteName = document.querySelector('#inputNoteName');
    const saveNoteBtn = document.querySelector('#saveNote');
    const discardNoteBtn = document.querySelector('#discardNote');

    saveNoteBtn.addEventListener('click', () => { //create new note
        try {
            ALLPROJECTS.getProjectByName(currentProjectName).addNote(inputNoteName.value, "");
            displayNote(inputNoteName.value);
            inputName.value = "";
        }
        catch (exception) {
            window.alert(exception);
        }
    })

    discardNoteBtn.addEventListener('click', () => {
        inputNoteName.value = "";
    })
}

function displayNote(noteName) {
    const noteDiv = document.createElement('div');
    noteDiv.classList.add("note");

    const noteNameSpan = document.createElement('span');
    noteNameSpan.innerText = noteName;
    noteNameSpan.title = noteName; // tootip
   
    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = "X";
    deleteBtn.addEventListener('click', () => {
        deleteNote(noteDiv, noteName);
    })
    
    noteDiv.appendChild(noteNameSpan);
    noteDiv.appendChild(deleteBtn);

    document.querySelector('#right-container').appendChild(noteDiv);
}

function deleteNote(element, name) {
    element.remove();
    ALLPROJECTS.getProjectByName(currentProjectName).removeNote(name);
}

addProject();
toggleMobileNavMenu();

export {
    toggleMobileNavMenu
}