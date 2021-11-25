/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/todoLogic.js":
/*!**************************!*\
  !*** ./src/todoLogic.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AllProjects": () => (/* binding */ AllProjects),
/* harmony export */   "OneProject": () => (/* binding */ OneProject),
/* harmony export */   "Note": () => (/* binding */ Note)
/* harmony export */ });
class AllProjects {
    constructor() {
        this.projects = [];
    }

    getProjects() { return this.projects;}

    getProjectByName(name) { 
        for(let i = 0; i < this.projects.length; i++) {
            if( this.projects[i].getName() === name ) {
                return this.projects[i];
            };
        }
    }

    addProject(name) {
        name = name.trim();
        if (name.length === 0) throw new Error("Project Name Can't Be Empty.")
        this.projects.forEach(project => {
            if( project.getName() === name ) throw new Error("Project Name Already Used.");
        });
        this.projects.push(new OneProject(name));
    }

    removeProject(name) {
        if (name.length === 0) return;
        for(let i = 0; i < this.projects.length; i++) {
            if(this.projects[i].getName() === name) {
                this.projects.splice(i, 1);
                return;
            }
        }
    }
}

class OneProject {
    constructor(name) {
        this.notes = [];
        this.name = name;
    }

    getName() { return this.name; }
    setName() {}

    getNoteByName(noteName) {
        for(let i = 0; i < this.notes.length; i++) {
            if( this.notes[i].getName() === noteName ) {
                return this.notes[i];
            };
        }
    }

    addNote(noteName, description) {
        noteName = noteName.trim();
        if (noteName.length === 0) throw new Error("Note Name Can't Be Empty.");
        this.notes.forEach(note => {
            if(note.getName() === noteName ) throw new Error("Note Name Already Used.");
        });
        this.notes.push(new Note(noteName, description));
    }
    removeNote(name) {
        if (name.length === 0) return;
        for(let i = 0; i < this.notes.length; i++) {
            if(this.notes[i].getName() === name) {
                this.notes.splice(i, 1);
                return;
            }
        }
    }
}

class Note {
    constructor(name, description) {
        this.name = name;
        this.description = description;
        this.checked = false;
    }

    getName() { return this.name; }
    setName() {}

    getDescription() { return this.description; }
    setDescrition() {}

    getChecked() { return this.checked; }
    setChecked() { this.checked = !this.checked;}
}



/***/ }),

/***/ "./src/userInterface.js":
/*!******************************!*\
  !*** ./src/userInterface.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "toggleMobileNavMenu": () => (/* binding */ toggleMobileNavMenu)
/* harmony export */ });
/* harmony import */ var _todoLogic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./todoLogic */ "./src/todoLogic.js");



let ALLPROJECTS = new _todoLogic__WEBPACK_IMPORTED_MODULE_0__.AllProjects();
let currentProjectName = "index";

function loadLocalStorage() {
    if(localStorage.length === 0) {
        ALLPROJECTS.projects.push(new _todoLogic__WEBPACK_IMPORTED_MODULE_0__.OneProject("index"));
    }
    else { // recreate class objects from localStorage
        let storageAllProjects = JSON.parse(localStorage.getItem("ALLPROJECTS"));

        (storageAllProjects.projects).forEach(project => {
            ALLPROJECTS.projects.push(new _todoLogic__WEBPACK_IMPORTED_MODULE_0__.OneProject(project.name));

            (project.notes).forEach(note => {
                let tempNote = new _todoLogic__WEBPACK_IMPORTED_MODULE_0__.Note(note.name, "");
                tempNote.checked = note.checked;
                ALLPROJECTS.projects[ALLPROJECTS.projects.length - 1].notes.push(tempNote);
            });
        });
    }
}
loadLocalStorage();
loadNotes(); // load index notes as default display

function updateLocalStorage() {
    localStorage.setItem("ALLPROJECTS", JSON.stringify(ALLPROJECTS));
}

////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////// Projects ///////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
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
            updateLocalStorage();
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
        loadNotes();
    })
    
    const projectNameSpan = document.createElement('span');
    projectNameSpan.innerText = name;
    projectNameSpan.title = name; // tootip
    projectDiv.appendChild(projectNameSpan);
    
    if(name !== "index")
    {
        const deleteBtn = document.createElement('button');
        deleteBtn.innerText = "X";
        deleteBtn.addEventListener('click', (e) => {
            deleteProject(projectDiv, name);
            e.stopPropagation();
        })
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
    ALLPROJECTS.getProjects().forEach(project => {
        displayProject(project.getName());
    });
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

/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////// Notes ///////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
function addNote() {
    const inputNoteName = document.querySelector('#inputNoteName');
    const saveNoteBtn = document.querySelector('#saveNote');
    const discardNoteBtn = document.querySelector('#discardNote');

    saveNoteBtn.addEventListener('click', () => { //create new note
        try {
            ALLPROJECTS.getProjectByName(currentProjectName).addNote(inputNoteName.value, "");
            displayNote(inputNoteName.value);
            inputNoteName.value = "";
            updateLocalStorage();
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
    let currentNote = ALLPROJECTS.getProjectByName(currentProjectName).getNoteByName(noteName);

    const noteDiv = document.createElement('div');
    noteDiv.classList.add("note");
    
    const noteNameSpan = document.createElement('span');
    noteNameSpan.style.cssText = "margin-right: auto;";
    noteNameSpan.innerText = noteName;
    noteNameSpan.title = noteName; // tootip
    
    const checkSpan = document.createElement('span');
    checkSpan.classList.add('checkNote');

    toggleCheckNote(currentNote, checkSpan, noteNameSpan);
    checkSpan.addEventListener('click', () => {
        currentNote.setChecked();
        toggleCheckNote(currentNote, checkSpan, noteNameSpan);
    })

    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = "X";
    deleteBtn.addEventListener('click', () => {
        deleteNote(noteDiv, noteName);
    })
    
    noteDiv.appendChild(checkSpan);
    noteDiv.appendChild(noteNameSpan);
    noteDiv.appendChild(deleteBtn);

    document.querySelector('#notes-container').appendChild(noteDiv);
}

function deleteNote(element, name) {
    element.remove();
    ALLPROJECTS.getProjectByName(currentProjectName).removeNote(name);
    updateLocalStorage();
}

function toggleCheckNote(note, checkSpan, noteNameSpan) { // check or uncheck
    if(note.getChecked() === true) {
        checkSpan.style.cssText = "background-color: #ede9d9;"
        noteNameSpan.style.cssText = "margin-right: auto; text-decoration: line-through;";
    }
    else {
        checkSpan.style.cssText = "background-color: white;"
        noteNameSpan.style.cssText = "margin-right: auto;";
    }
    updateLocalStorage();
}

function loadNotes() {
    document.querySelector('#notes-container').innerHTML = ""; // clear page to display new project's notes

    let project = ALLPROJECTS.getProjectByName(currentProjectName).notes;
    project.forEach(note => {
        displayNote(note.getName());
    });
}

addProject();
loadProjects();
toggleMobileNavMenu();
addNote();



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _userInterface__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./userInterface */ "./src/userInterface.js");


})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQjtBQUNBO0FBQ0EsdUJBQXVCLDBCQUEwQjtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsMEJBQTBCO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHVCQUF1QjtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHVCQUF1QjtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBLHVCQUF1QjtBQUN2QjtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CLG1CQUFtQjtBQUNuQjtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDdkY0RDtBQUM1RDtBQUNBO0FBQ0Esc0JBQXNCLG1EQUFXO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLGtEQUFVO0FBQ2hEO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQyxrREFBVTtBQUNwRDtBQUNBO0FBQ0EsbUNBQW1DLDRDQUFJO0FBQ3ZDO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsOENBQThDO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtEQUFrRDtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFEQUFxRDtBQUNyRDtBQUNBLG1DQUFtQztBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBEQUEwRDtBQUMxRDtBQUNBLDZEQUE2RDtBQUM3RCwwREFBMEQsOEJBQThCO0FBQ3hGO0FBQ0E7QUFDQSwyREFBMkQ7QUFDM0QseURBQXlEO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrREFBK0Q7QUFDL0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7VUNqTkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ05zRCIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy90b2RvTG9naWMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3VzZXJJbnRlcmZhY2UuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNsYXNzIEFsbFByb2plY3RzIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMucHJvamVjdHMgPSBbXTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRQcm9qZWN0cygpIHsgcmV0dXJuIHRoaXMucHJvamVjdHM7fVxyXG5cclxuICAgIGdldFByb2plY3RCeU5hbWUobmFtZSkgeyBcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5wcm9qZWN0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiggdGhpcy5wcm9qZWN0c1tpXS5nZXROYW1lKCkgPT09IG5hbWUgKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9qZWN0c1tpXTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYWRkUHJvamVjdChuYW1lKSB7XHJcbiAgICAgICAgbmFtZSA9IG5hbWUudHJpbSgpO1xyXG4gICAgICAgIGlmIChuYW1lLmxlbmd0aCA9PT0gMCkgdGhyb3cgbmV3IEVycm9yKFwiUHJvamVjdCBOYW1lIENhbid0IEJlIEVtcHR5LlwiKVxyXG4gICAgICAgIHRoaXMucHJvamVjdHMuZm9yRWFjaChwcm9qZWN0ID0+IHtcclxuICAgICAgICAgICAgaWYoIHByb2plY3QuZ2V0TmFtZSgpID09PSBuYW1lICkgdGhyb3cgbmV3IEVycm9yKFwiUHJvamVjdCBOYW1lIEFscmVhZHkgVXNlZC5cIik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5wcm9qZWN0cy5wdXNoKG5ldyBPbmVQcm9qZWN0KG5hbWUpKTtcclxuICAgIH1cclxuXHJcbiAgICByZW1vdmVQcm9qZWN0KG5hbWUpIHtcclxuICAgICAgICBpZiAobmFtZS5sZW5ndGggPT09IDApIHJldHVybjtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5wcm9qZWN0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZih0aGlzLnByb2plY3RzW2ldLmdldE5hbWUoKSA9PT0gbmFtZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9qZWN0cy5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIE9uZVByb2plY3Qge1xyXG4gICAgY29uc3RydWN0b3IobmFtZSkge1xyXG4gICAgICAgIHRoaXMubm90ZXMgPSBbXTtcclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIGdldE5hbWUoKSB7IHJldHVybiB0aGlzLm5hbWU7IH1cclxuICAgIHNldE5hbWUoKSB7fVxyXG5cclxuICAgIGdldE5vdGVCeU5hbWUobm90ZU5hbWUpIHtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5ub3Rlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiggdGhpcy5ub3Rlc1tpXS5nZXROYW1lKCkgPT09IG5vdGVOYW1lICkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubm90ZXNbaV07XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFkZE5vdGUobm90ZU5hbWUsIGRlc2NyaXB0aW9uKSB7XHJcbiAgICAgICAgbm90ZU5hbWUgPSBub3RlTmFtZS50cmltKCk7XHJcbiAgICAgICAgaWYgKG5vdGVOYW1lLmxlbmd0aCA9PT0gMCkgdGhyb3cgbmV3IEVycm9yKFwiTm90ZSBOYW1lIENhbid0IEJlIEVtcHR5LlwiKTtcclxuICAgICAgICB0aGlzLm5vdGVzLmZvckVhY2gobm90ZSA9PiB7XHJcbiAgICAgICAgICAgIGlmKG5vdGUuZ2V0TmFtZSgpID09PSBub3RlTmFtZSApIHRocm93IG5ldyBFcnJvcihcIk5vdGUgTmFtZSBBbHJlYWR5IFVzZWQuXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMubm90ZXMucHVzaChuZXcgTm90ZShub3RlTmFtZSwgZGVzY3JpcHRpb24pKTtcclxuICAgIH1cclxuICAgIHJlbW92ZU5vdGUobmFtZSkge1xyXG4gICAgICAgIGlmIChuYW1lLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLm5vdGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMubm90ZXNbaV0uZ2V0TmFtZSgpID09PSBuYW1lKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vdGVzLnNwbGljZShpLCAxKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgTm90ZSB7XHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBkZXNjcmlwdGlvbikge1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xyXG4gICAgICAgIHRoaXMuY2hlY2tlZCA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldE5hbWUoKSB7IHJldHVybiB0aGlzLm5hbWU7IH1cclxuICAgIHNldE5hbWUoKSB7fVxyXG5cclxuICAgIGdldERlc2NyaXB0aW9uKCkgeyByZXR1cm4gdGhpcy5kZXNjcmlwdGlvbjsgfVxyXG4gICAgc2V0RGVzY3JpdGlvbigpIHt9XHJcblxyXG4gICAgZ2V0Q2hlY2tlZCgpIHsgcmV0dXJuIHRoaXMuY2hlY2tlZDsgfVxyXG4gICAgc2V0Q2hlY2tlZCgpIHsgdGhpcy5jaGVja2VkID0gIXRoaXMuY2hlY2tlZDt9XHJcbn1cclxuXHJcbmV4cG9ydCB7XHJcbiAgICBBbGxQcm9qZWN0cyxcclxuICAgIE9uZVByb2plY3QsXHJcbiAgICBOb3RlXHJcbn0iLCJpbXBvcnQgeyBBbGxQcm9qZWN0cywgT25lUHJvamVjdCwgTm90ZSB9IGZyb20gXCIuL3RvZG9Mb2dpY1wiO1xyXG5cclxuXHJcbmxldCBBTExQUk9KRUNUUyA9IG5ldyBBbGxQcm9qZWN0cygpO1xyXG5sZXQgY3VycmVudFByb2plY3ROYW1lID0gXCJpbmRleFwiO1xyXG5cclxuZnVuY3Rpb24gbG9hZExvY2FsU3RvcmFnZSgpIHtcclxuICAgIGlmKGxvY2FsU3RvcmFnZS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICBBTExQUk9KRUNUUy5wcm9qZWN0cy5wdXNoKG5ldyBPbmVQcm9qZWN0KFwiaW5kZXhcIikpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7IC8vIHJlY3JlYXRlIGNsYXNzIG9iamVjdHMgZnJvbSBsb2NhbFN0b3JhZ2VcclxuICAgICAgICBsZXQgc3RvcmFnZUFsbFByb2plY3RzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIkFMTFBST0pFQ1RTXCIpKTtcclxuXHJcbiAgICAgICAgKHN0b3JhZ2VBbGxQcm9qZWN0cy5wcm9qZWN0cykuZm9yRWFjaChwcm9qZWN0ID0+IHtcclxuICAgICAgICAgICAgQUxMUFJPSkVDVFMucHJvamVjdHMucHVzaChuZXcgT25lUHJvamVjdChwcm9qZWN0Lm5hbWUpKTtcclxuXHJcbiAgICAgICAgICAgIChwcm9qZWN0Lm5vdGVzKS5mb3JFYWNoKG5vdGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IHRlbXBOb3RlID0gbmV3IE5vdGUobm90ZS5uYW1lLCBcIlwiKTtcclxuICAgICAgICAgICAgICAgIHRlbXBOb3RlLmNoZWNrZWQgPSBub3RlLmNoZWNrZWQ7XHJcbiAgICAgICAgICAgICAgICBBTExQUk9KRUNUUy5wcm9qZWN0c1tBTExQUk9KRUNUUy5wcm9qZWN0cy5sZW5ndGggLSAxXS5ub3Rlcy5wdXNoKHRlbXBOb3RlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxubG9hZExvY2FsU3RvcmFnZSgpO1xyXG5sb2FkTm90ZXMoKTsgLy8gbG9hZCBpbmRleCBub3RlcyBhcyBkZWZhdWx0IGRpc3BsYXlcclxuXHJcbmZ1bmN0aW9uIHVwZGF0ZUxvY2FsU3RvcmFnZSgpIHtcclxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiQUxMUFJPSkVDVFNcIiwgSlNPTi5zdHJpbmdpZnkoQUxMUFJPSkVDVFMpKTtcclxufVxyXG5cclxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8gUHJvamVjdHMgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuZnVuY3Rpb24gYWRkUHJvamVjdCgpIHtcclxuICAgIGNvbnN0IGFkZFByb2plY3RCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWRkLXByb2plY3QtYnRuJyk7XHJcbiAgICBjb25zdCBpbnB1dFByb2plY3ROYW1lRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2lucHV0LXByb2plY3QtbmFtZS1kaXYnKTtcclxuICAgIGNvbnN0IGlucHV0TmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNpbnB1dE5hbWUnKTtcclxuICAgIGNvbnN0IHNhdmVCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2F2ZScpO1xyXG4gICAgY29uc3QgZGlzY2FyZEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkaXNjYXJkJyk7XHJcblxyXG4gICAgYWRkUHJvamVjdEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICBpbnB1dFByb2plY3ROYW1lRGl2LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XHJcbiAgICB9KVxyXG5cclxuICAgIHNhdmVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7IC8vY3JlYXRlIG5ldyBwcm9qZWN0XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgQUxMUFJPSkVDVFMuYWRkUHJvamVjdChpbnB1dE5hbWUudmFsdWUpO1xyXG4gICAgICAgICAgICBkaXNwbGF5UHJvamVjdChpbnB1dE5hbWUudmFsdWUpO1xyXG4gICAgICAgICAgICBpbnB1dE5hbWUudmFsdWUgPSBcIlwiO1xyXG4gICAgICAgICAgICB1cGRhdGVMb2NhbFN0b3JhZ2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGV4Y2VwdGlvbikge1xyXG4gICAgICAgICAgICB3aW5kb3cuYWxlcnQoZXhjZXB0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG5cclxuICAgIGRpc2NhcmRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgaW5wdXRQcm9qZWN0TmFtZURpdi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICB9KVxyXG59XHJcblxyXG5mdW5jdGlvbiBkaXNwbGF5UHJvamVjdChuYW1lKSB7XHJcbiAgICBjb25zdCBwcm9qZWN0RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBjb25zdCBjdXJyZW50UHJvamVjdE5hbWVIMSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY3VycmVudC1wcm9qZWN0LW5hbWVcIik7XHJcbiAgICBwcm9qZWN0RGl2LmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0XCIpO1xyXG4gICAgcHJvamVjdERpdi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICBjdXJyZW50UHJvamVjdE5hbWUgPSBuYW1lOyBcclxuICAgICAgICBjdXJyZW50UHJvamVjdE5hbWVIMS5pbm5lclRleHQgPSBjdXJyZW50UHJvamVjdE5hbWU7XHJcbiAgICAgICAgbG9hZE5vdGVzKCk7XHJcbiAgICB9KVxyXG4gICAgXHJcbiAgICBjb25zdCBwcm9qZWN0TmFtZVNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICBwcm9qZWN0TmFtZVNwYW4uaW5uZXJUZXh0ID0gbmFtZTtcclxuICAgIHByb2plY3ROYW1lU3Bhbi50aXRsZSA9IG5hbWU7IC8vIHRvb3RpcFxyXG4gICAgcHJvamVjdERpdi5hcHBlbmRDaGlsZChwcm9qZWN0TmFtZVNwYW4pO1xyXG4gICAgXHJcbiAgICBpZihuYW1lICE9PSBcImluZGV4XCIpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc3QgZGVsZXRlQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICAgICAgZGVsZXRlQnRuLmlubmVyVGV4dCA9IFwiWFwiO1xyXG4gICAgICAgIGRlbGV0ZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgIGRlbGV0ZVByb2plY3QocHJvamVjdERpdiwgbmFtZSk7XHJcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICBwcm9qZWN0RGl2LmFwcGVuZENoaWxkKGRlbGV0ZUJ0bik7XHJcbiAgICB9XHJcblxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2xlZnQtY29udGFpbmVyJykuYXBwZW5kQ2hpbGQocHJvamVjdERpdik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRlbGV0ZVByb2plY3QoZWxlbWVudCwgbmFtZSkge1xyXG4gICAgZWxlbWVudC5yZW1vdmUoKTtcclxuICAgIEFMTFBST0pFQ1RTLnJlbW92ZVByb2plY3QobmFtZSk7XHJcbiAgICB1cGRhdGVMb2NhbFN0b3JhZ2UoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gbG9hZFByb2plY3RzKCkge1xyXG4gICAgQUxMUFJPSkVDVFMuZ2V0UHJvamVjdHMoKS5mb3JFYWNoKHByb2plY3QgPT4ge1xyXG4gICAgICAgIGRpc3BsYXlQcm9qZWN0KHByb2plY3QuZ2V0TmFtZSgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5jb25zdCB0b2dnbGVNb2JpbGVOYXZNZW51ID0gKCkgPT4ge1xyXG4gICAgY29uc3QgbW9iaWxlTmF2QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI21vYmlsZS1uYXYtYnV0dG9uJylcclxuICAgIGNvbnN0IG1vYmlsZU5hdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ25hdicpXHJcblxyXG4gICAgbW9iaWxlTmF2QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgIGlmIChtb2JpbGVOYXYuc3R5bGUuZGlzcGxheSA9PT0gXCJub25lXCIpIHtcclxuICAgICAgICAgICAgbW9iaWxlTmF2LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCJcclxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9IFwiaGlkZGVuXCJcclxuICAgICAgICAgICAgbW9iaWxlTmF2QnRuLnN0eWxlID0gXCJib3JkZXI6IGluc2V0ICNlMTI3MWNcIlxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG1vYmlsZU5hdi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCJcclxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9IFwidmlzaWJsZVwiXHJcbiAgICAgICAgICAgIG1vYmlsZU5hdkJ0bi5zdHlsZSA9IFwiYm9yZGVyOiBvdXRzZXQgI2UxMjcxY1wiXHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufTtcclxuXHJcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vIE5vdGVzIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbmZ1bmN0aW9uIGFkZE5vdGUoKSB7XHJcbiAgICBjb25zdCBpbnB1dE5vdGVOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2lucHV0Tm90ZU5hbWUnKTtcclxuICAgIGNvbnN0IHNhdmVOb3RlQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NhdmVOb3RlJyk7XHJcbiAgICBjb25zdCBkaXNjYXJkTm90ZUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkaXNjYXJkTm90ZScpO1xyXG5cclxuICAgIHNhdmVOb3RlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4geyAvL2NyZWF0ZSBuZXcgbm90ZVxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIEFMTFBST0pFQ1RTLmdldFByb2plY3RCeU5hbWUoY3VycmVudFByb2plY3ROYW1lKS5hZGROb3RlKGlucHV0Tm90ZU5hbWUudmFsdWUsIFwiXCIpO1xyXG4gICAgICAgICAgICBkaXNwbGF5Tm90ZShpbnB1dE5vdGVOYW1lLnZhbHVlKTtcclxuICAgICAgICAgICAgaW5wdXROb3RlTmFtZS52YWx1ZSA9IFwiXCI7XHJcbiAgICAgICAgICAgIHVwZGF0ZUxvY2FsU3RvcmFnZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZXhjZXB0aW9uKSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5hbGVydChleGNlcHRpb24pO1xyXG4gICAgICAgIH1cclxuICAgIH0pXHJcblxyXG4gICAgZGlzY2FyZE5vdGVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgaW5wdXROb3RlTmFtZS52YWx1ZSA9IFwiXCI7XHJcbiAgICB9KVxyXG59XHJcblxyXG5mdW5jdGlvbiBkaXNwbGF5Tm90ZShub3RlTmFtZSkge1xyXG4gICAgbGV0IGN1cnJlbnROb3RlID0gQUxMUFJPSkVDVFMuZ2V0UHJvamVjdEJ5TmFtZShjdXJyZW50UHJvamVjdE5hbWUpLmdldE5vdGVCeU5hbWUobm90ZU5hbWUpO1xyXG5cclxuICAgIGNvbnN0IG5vdGVEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIG5vdGVEaXYuY2xhc3NMaXN0LmFkZChcIm5vdGVcIik7XHJcbiAgICBcclxuICAgIGNvbnN0IG5vdGVOYW1lU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgIG5vdGVOYW1lU3Bhbi5zdHlsZS5jc3NUZXh0ID0gXCJtYXJnaW4tcmlnaHQ6IGF1dG87XCI7XHJcbiAgICBub3RlTmFtZVNwYW4uaW5uZXJUZXh0ID0gbm90ZU5hbWU7XHJcbiAgICBub3RlTmFtZVNwYW4udGl0bGUgPSBub3RlTmFtZTsgLy8gdG9vdGlwXHJcbiAgICBcclxuICAgIGNvbnN0IGNoZWNrU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgIGNoZWNrU3Bhbi5jbGFzc0xpc3QuYWRkKCdjaGVja05vdGUnKTtcclxuXHJcbiAgICB0b2dnbGVDaGVja05vdGUoY3VycmVudE5vdGUsIGNoZWNrU3Bhbiwgbm90ZU5hbWVTcGFuKTtcclxuICAgIGNoZWNrU3Bhbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICBjdXJyZW50Tm90ZS5zZXRDaGVja2VkKCk7XHJcbiAgICAgICAgdG9nZ2xlQ2hlY2tOb3RlKGN1cnJlbnROb3RlLCBjaGVja1NwYW4sIG5vdGVOYW1lU3Bhbik7XHJcbiAgICB9KVxyXG5cclxuICAgIGNvbnN0IGRlbGV0ZUJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgZGVsZXRlQnRuLmlubmVyVGV4dCA9IFwiWFwiO1xyXG4gICAgZGVsZXRlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgIGRlbGV0ZU5vdGUobm90ZURpdiwgbm90ZU5hbWUpO1xyXG4gICAgfSlcclxuICAgIFxyXG4gICAgbm90ZURpdi5hcHBlbmRDaGlsZChjaGVja1NwYW4pO1xyXG4gICAgbm90ZURpdi5hcHBlbmRDaGlsZChub3RlTmFtZVNwYW4pO1xyXG4gICAgbm90ZURpdi5hcHBlbmRDaGlsZChkZWxldGVCdG4pO1xyXG5cclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNub3Rlcy1jb250YWluZXInKS5hcHBlbmRDaGlsZChub3RlRGl2KTtcclxufVxyXG5cclxuZnVuY3Rpb24gZGVsZXRlTm90ZShlbGVtZW50LCBuYW1lKSB7XHJcbiAgICBlbGVtZW50LnJlbW92ZSgpO1xyXG4gICAgQUxMUFJPSkVDVFMuZ2V0UHJvamVjdEJ5TmFtZShjdXJyZW50UHJvamVjdE5hbWUpLnJlbW92ZU5vdGUobmFtZSk7XHJcbiAgICB1cGRhdGVMb2NhbFN0b3JhZ2UoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gdG9nZ2xlQ2hlY2tOb3RlKG5vdGUsIGNoZWNrU3Bhbiwgbm90ZU5hbWVTcGFuKSB7IC8vIGNoZWNrIG9yIHVuY2hlY2tcclxuICAgIGlmKG5vdGUuZ2V0Q2hlY2tlZCgpID09PSB0cnVlKSB7XHJcbiAgICAgICAgY2hlY2tTcGFuLnN0eWxlLmNzc1RleHQgPSBcImJhY2tncm91bmQtY29sb3I6ICNlZGU5ZDk7XCJcclxuICAgICAgICBub3RlTmFtZVNwYW4uc3R5bGUuY3NzVGV4dCA9IFwibWFyZ2luLXJpZ2h0OiBhdXRvOyB0ZXh0LWRlY29yYXRpb246IGxpbmUtdGhyb3VnaDtcIjtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGNoZWNrU3Bhbi5zdHlsZS5jc3NUZXh0ID0gXCJiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcIlxyXG4gICAgICAgIG5vdGVOYW1lU3Bhbi5zdHlsZS5jc3NUZXh0ID0gXCJtYXJnaW4tcmlnaHQ6IGF1dG87XCI7XHJcbiAgICB9XHJcbiAgICB1cGRhdGVMb2NhbFN0b3JhZ2UoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gbG9hZE5vdGVzKCkge1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI25vdGVzLWNvbnRhaW5lcicpLmlubmVySFRNTCA9IFwiXCI7IC8vIGNsZWFyIHBhZ2UgdG8gZGlzcGxheSBuZXcgcHJvamVjdCdzIG5vdGVzXHJcblxyXG4gICAgbGV0IHByb2plY3QgPSBBTExQUk9KRUNUUy5nZXRQcm9qZWN0QnlOYW1lKGN1cnJlbnRQcm9qZWN0TmFtZSkubm90ZXM7XHJcbiAgICBwcm9qZWN0LmZvckVhY2gobm90ZSA9PiB7XHJcbiAgICAgICAgZGlzcGxheU5vdGUobm90ZS5nZXROYW1lKCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmFkZFByb2plY3QoKTtcclxubG9hZFByb2plY3RzKCk7XHJcbnRvZ2dsZU1vYmlsZU5hdk1lbnUoKTtcclxuYWRkTm90ZSgpO1xyXG5cclxuZXhwb3J0IHtcclxuICAgIHRvZ2dsZU1vYmlsZU5hdk1lbnVcclxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgdG9nZ2xlTW9iaWxlTmF2TWVudSB9IGZyb20gXCIuL3VzZXJJbnRlcmZhY2VcIjtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9