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
        this.projects = [new OneProject("index")];
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
        deleteBtn.addEventListener('click', () => {
            deleteProject(projectDiv, name);
        })
        projectDiv.appendChild(deleteBtn);
    }


    document.querySelector('#left-container').appendChild(projectDiv);
}

function deleteProject(element, name) {
    element.remove();
    ALLPROJECTS.removeProject(name);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ05zRCIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy90b2RvTG9naWMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3VzZXJJbnRlcmZhY2UuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNsYXNzIEFsbFByb2plY3RzIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMucHJvamVjdHMgPSBbbmV3IE9uZVByb2plY3QoXCJpbmRleFwiKV07XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UHJvamVjdHMoKSB7IHJldHVybiB0aGlzLnByb2plY3RzO31cclxuXHJcbiAgICBnZXRQcm9qZWN0QnlOYW1lKG5hbWUpIHsgXHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMucHJvamVjdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYoIHRoaXMucHJvamVjdHNbaV0uZ2V0TmFtZSgpID09PSBuYW1lICkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvamVjdHNbaV07XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFkZFByb2plY3QobmFtZSkge1xyXG4gICAgICAgIG5hbWUgPSBuYW1lLnRyaW0oKTtcclxuICAgICAgICBpZiAobmFtZS5sZW5ndGggPT09IDApIHRocm93IG5ldyBFcnJvcihcIlByb2plY3QgTmFtZSBDYW4ndCBCZSBFbXB0eS5cIilcclxuICAgICAgICB0aGlzLnByb2plY3RzLmZvckVhY2gocHJvamVjdCA9PiB7XHJcbiAgICAgICAgICAgIGlmKCBwcm9qZWN0LmdldE5hbWUoKSA9PT0gbmFtZSApIHRocm93IG5ldyBFcnJvcihcIlByb2plY3QgTmFtZSBBbHJlYWR5IFVzZWQuXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMucHJvamVjdHMucHVzaChuZXcgT25lUHJvamVjdChuYW1lKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVtb3ZlUHJvamVjdChuYW1lKSB7XHJcbiAgICAgICAgaWYgKG5hbWUubGVuZ3RoID09PSAwKSByZXR1cm47XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMucHJvamVjdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYodGhpcy5wcm9qZWN0c1tpXS5nZXROYW1lKCkgPT09IG5hbWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucHJvamVjdHMuc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBPbmVQcm9qZWN0IHtcclxuICAgIGNvbnN0cnVjdG9yKG5hbWUpIHtcclxuICAgICAgICB0aGlzLm5vdGVzID0gW107XHJcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXROYW1lKCkgeyByZXR1cm4gdGhpcy5uYW1lOyB9XHJcbiAgICBzZXROYW1lKCkge31cclxuXHJcbiAgICBnZXROb3RlQnlOYW1lKG5vdGVOYW1lKSB7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMubm90ZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYoIHRoaXMubm90ZXNbaV0uZ2V0TmFtZSgpID09PSBub3RlTmFtZSApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm5vdGVzW2ldO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhZGROb3RlKG5vdGVOYW1lLCBkZXNjcmlwdGlvbikge1xyXG4gICAgICAgIG5vdGVOYW1lID0gbm90ZU5hbWUudHJpbSgpO1xyXG4gICAgICAgIGlmIChub3RlTmFtZS5sZW5ndGggPT09IDApIHRocm93IG5ldyBFcnJvcihcIk5vdGUgTmFtZSBDYW4ndCBCZSBFbXB0eS5cIik7XHJcbiAgICAgICAgdGhpcy5ub3Rlcy5mb3JFYWNoKG5vdGUgPT4ge1xyXG4gICAgICAgICAgICBpZihub3RlLmdldE5hbWUoKSA9PT0gbm90ZU5hbWUgKSB0aHJvdyBuZXcgRXJyb3IoXCJOb3RlIE5hbWUgQWxyZWFkeSBVc2VkLlwiKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLm5vdGVzLnB1c2gobmV3IE5vdGUobm90ZU5hbWUsIGRlc2NyaXB0aW9uKSk7XHJcbiAgICB9XHJcbiAgICByZW1vdmVOb3RlKG5hbWUpIHtcclxuICAgICAgICBpZiAobmFtZS5sZW5ndGggPT09IDApIHJldHVybjtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5ub3Rlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZih0aGlzLm5vdGVzW2ldLmdldE5hbWUoKSA9PT0gbmFtZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub3Rlcy5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIE5vdGUge1xyXG4gICAgY29uc3RydWN0b3IobmFtZSwgZGVzY3JpcHRpb24pIHtcclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcclxuICAgICAgICB0aGlzLmNoZWNrZWQgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXROYW1lKCkgeyByZXR1cm4gdGhpcy5uYW1lOyB9XHJcbiAgICBzZXROYW1lKCkge31cclxuXHJcbiAgICBnZXREZXNjcmlwdGlvbigpIHsgcmV0dXJuIHRoaXMuZGVzY3JpcHRpb247IH1cclxuICAgIHNldERlc2NyaXRpb24oKSB7fVxyXG5cclxuICAgIGdldENoZWNrZWQoKSB7IHJldHVybiB0aGlzLmNoZWNrZWQ7IH1cclxuICAgIHNldENoZWNrZWQoKSB7IHRoaXMuY2hlY2tlZCA9ICF0aGlzLmNoZWNrZWQ7fVxyXG59XHJcblxyXG5leHBvcnQge1xyXG4gICAgQWxsUHJvamVjdHMsXHJcbiAgICBPbmVQcm9qZWN0LFxyXG4gICAgTm90ZVxyXG59IiwiaW1wb3J0IHsgQWxsUHJvamVjdHMsIE9uZVByb2plY3QsIE5vdGUgfSBmcm9tIFwiLi90b2RvTG9naWNcIjtcclxuXHJcbmxldCBBTExQUk9KRUNUUyA9IG5ldyBBbGxQcm9qZWN0cygpO1xyXG5sZXQgY3VycmVudFByb2plY3ROYW1lID0gXCJpbmRleFwiO1xyXG5cclxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8gUHJvamVjdHMgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuZnVuY3Rpb24gYWRkUHJvamVjdCgpIHtcclxuICAgIGNvbnN0IGFkZFByb2plY3RCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWRkLXByb2plY3QtYnRuJyk7XHJcbiAgICBjb25zdCBpbnB1dFByb2plY3ROYW1lRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2lucHV0LXByb2plY3QtbmFtZS1kaXYnKTtcclxuICAgIGNvbnN0IGlucHV0TmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNpbnB1dE5hbWUnKTtcclxuICAgIGNvbnN0IHNhdmVCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2F2ZScpO1xyXG4gICAgY29uc3QgZGlzY2FyZEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkaXNjYXJkJyk7XHJcblxyXG4gICAgYWRkUHJvamVjdEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICBpbnB1dFByb2plY3ROYW1lRGl2LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XHJcbiAgICB9KVxyXG5cclxuICAgIHNhdmVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7IC8vY3JlYXRlIG5ldyBwcm9qZWN0XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgQUxMUFJPSkVDVFMuYWRkUHJvamVjdChpbnB1dE5hbWUudmFsdWUpO1xyXG4gICAgICAgICAgICBkaXNwbGF5UHJvamVjdChpbnB1dE5hbWUudmFsdWUpO1xyXG4gICAgICAgICAgICBpbnB1dE5hbWUudmFsdWUgPSBcIlwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZXhjZXB0aW9uKSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5hbGVydChleGNlcHRpb24pO1xyXG4gICAgICAgIH1cclxuICAgIH0pXHJcblxyXG4gICAgZGlzY2FyZEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICBpbnB1dFByb2plY3ROYW1lRGl2LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgIH0pXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRpc3BsYXlQcm9qZWN0KG5hbWUpIHtcclxuICAgIFxyXG4gICAgY29uc3QgcHJvamVjdERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgY29uc3QgY3VycmVudFByb2plY3ROYW1lSDEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2N1cnJlbnQtcHJvamVjdC1uYW1lXCIpO1xyXG4gICAgcHJvamVjdERpdi5jbGFzc0xpc3QuYWRkKFwicHJvamVjdFwiKTtcclxuICAgIHByb2plY3REaXYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgY3VycmVudFByb2plY3ROYW1lID0gbmFtZTsgXHJcbiAgICAgICAgY3VycmVudFByb2plY3ROYW1lSDEuaW5uZXJUZXh0ID0gY3VycmVudFByb2plY3ROYW1lO1xyXG4gICAgICAgIGxvYWROb3RlcygpO1xyXG4gICAgfSlcclxuICAgIFxyXG4gICAgY29uc3QgcHJvamVjdE5hbWVTcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgcHJvamVjdE5hbWVTcGFuLmlubmVyVGV4dCA9IG5hbWU7XHJcbiAgICBwcm9qZWN0TmFtZVNwYW4udGl0bGUgPSBuYW1lOyAvLyB0b290aXBcclxuICAgIHByb2plY3REaXYuYXBwZW5kQ2hpbGQocHJvamVjdE5hbWVTcGFuKTtcclxuICAgIFxyXG4gICAgaWYobmFtZSAhPT0gXCJpbmRleFwiKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IGRlbGV0ZUJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgICAgIGRlbGV0ZUJ0bi5pbm5lclRleHQgPSBcIlhcIjtcclxuICAgICAgICBkZWxldGVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGRlbGV0ZVByb2plY3QocHJvamVjdERpdiwgbmFtZSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICBwcm9qZWN0RGl2LmFwcGVuZENoaWxkKGRlbGV0ZUJ0bik7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNsZWZ0LWNvbnRhaW5lcicpLmFwcGVuZENoaWxkKHByb2plY3REaXYpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkZWxldGVQcm9qZWN0KGVsZW1lbnQsIG5hbWUpIHtcclxuICAgIGVsZW1lbnQucmVtb3ZlKCk7XHJcbiAgICBBTExQUk9KRUNUUy5yZW1vdmVQcm9qZWN0KG5hbWUpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBsb2FkUHJvamVjdHMoKSB7XHJcbiAgICBBTExQUk9KRUNUUy5nZXRQcm9qZWN0cygpLmZvckVhY2gocHJvamVjdCA9PiB7XHJcbiAgICAgICAgZGlzcGxheVByb2plY3QocHJvamVjdC5nZXROYW1lKCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmNvbnN0IHRvZ2dsZU1vYmlsZU5hdk1lbnUgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBtb2JpbGVOYXZCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbW9iaWxlLW5hdi1idXR0b24nKVxyXG4gICAgY29uc3QgbW9iaWxlTmF2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbmF2JylcclxuXHJcbiAgICBtb2JpbGVOYXZCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgaWYgKG1vYmlsZU5hdi5zdHlsZS5kaXNwbGF5ID09PSBcIm5vbmVcIikge1xyXG4gICAgICAgICAgICBtb2JpbGVOYXYuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIlxyXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gXCJoaWRkZW5cIlxyXG4gICAgICAgICAgICBtb2JpbGVOYXZCdG4uc3R5bGUgPSBcImJvcmRlcjogaW5zZXQgI2UxMjcxY1wiXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbW9iaWxlTmF2LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIlxyXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gXCJ2aXNpYmxlXCJcclxuICAgICAgICAgICAgbW9iaWxlTmF2QnRuLnN0eWxlID0gXCJib3JkZXI6IG91dHNldCAjZTEyNzFjXCJcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59O1xyXG5cclxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8gTm90ZXMgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuZnVuY3Rpb24gYWRkTm90ZSgpIHtcclxuICAgIGNvbnN0IGlucHV0Tm90ZU5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjaW5wdXROb3RlTmFtZScpO1xyXG4gICAgY29uc3Qgc2F2ZU5vdGVCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2F2ZU5vdGUnKTtcclxuICAgIGNvbnN0IGRpc2NhcmROb3RlQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Rpc2NhcmROb3RlJyk7XHJcblxyXG4gICAgc2F2ZU5vdGVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7IC8vY3JlYXRlIG5ldyBub3RlXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgQUxMUFJPSkVDVFMuZ2V0UHJvamVjdEJ5TmFtZShjdXJyZW50UHJvamVjdE5hbWUpLmFkZE5vdGUoaW5wdXROb3RlTmFtZS52YWx1ZSwgXCJcIik7XHJcbiAgICAgICAgICAgIGRpc3BsYXlOb3RlKGlucHV0Tm90ZU5hbWUudmFsdWUpO1xyXG4gICAgICAgICAgICBpbnB1dE5vdGVOYW1lLnZhbHVlID0gXCJcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGV4Y2VwdGlvbikge1xyXG4gICAgICAgICAgICB3aW5kb3cuYWxlcnQoZXhjZXB0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG5cclxuICAgIGRpc2NhcmROb3RlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgIGlucHV0Tm90ZU5hbWUudmFsdWUgPSBcIlwiO1xyXG4gICAgfSlcclxufVxyXG5cclxuZnVuY3Rpb24gZGlzcGxheU5vdGUobm90ZU5hbWUpIHtcclxuICAgIGxldCBjdXJyZW50Tm90ZSA9IEFMTFBST0pFQ1RTLmdldFByb2plY3RCeU5hbWUoY3VycmVudFByb2plY3ROYW1lKS5nZXROb3RlQnlOYW1lKG5vdGVOYW1lKTtcclxuXHJcbiAgICBjb25zdCBub3RlRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBub3RlRGl2LmNsYXNzTGlzdC5hZGQoXCJub3RlXCIpO1xyXG4gICAgXHJcbiAgICBjb25zdCBub3RlTmFtZVNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICBub3RlTmFtZVNwYW4uc3R5bGUuY3NzVGV4dCA9IFwibWFyZ2luLXJpZ2h0OiBhdXRvO1wiO1xyXG4gICAgbm90ZU5hbWVTcGFuLmlubmVyVGV4dCA9IG5vdGVOYW1lO1xyXG4gICAgbm90ZU5hbWVTcGFuLnRpdGxlID0gbm90ZU5hbWU7IC8vIHRvb3RpcFxyXG4gICAgXHJcbiAgICBjb25zdCBjaGVja1NwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICBjaGVja1NwYW4uY2xhc3NMaXN0LmFkZCgnY2hlY2tOb3RlJyk7XHJcblxyXG4gICAgdG9nZ2xlQ2hlY2tOb3RlKGN1cnJlbnROb3RlLCBjaGVja1NwYW4sIG5vdGVOYW1lU3Bhbik7XHJcbiAgICBjaGVja1NwYW4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgY3VycmVudE5vdGUuc2V0Q2hlY2tlZCgpO1xyXG4gICAgICAgIHRvZ2dsZUNoZWNrTm90ZShjdXJyZW50Tm90ZSwgY2hlY2tTcGFuLCBub3RlTmFtZVNwYW4pO1xyXG4gICAgfSlcclxuXHJcbiAgICBjb25zdCBkZWxldGVCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgIGRlbGV0ZUJ0bi5pbm5lclRleHQgPSBcIlhcIjtcclxuICAgIGRlbGV0ZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICBkZWxldGVOb3RlKG5vdGVEaXYsIG5vdGVOYW1lKTtcclxuICAgIH0pXHJcbiAgICBcclxuICAgIG5vdGVEaXYuYXBwZW5kQ2hpbGQoY2hlY2tTcGFuKTtcclxuICAgIG5vdGVEaXYuYXBwZW5kQ2hpbGQobm90ZU5hbWVTcGFuKTtcclxuICAgIG5vdGVEaXYuYXBwZW5kQ2hpbGQoZGVsZXRlQnRuKTtcclxuXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbm90ZXMtY29udGFpbmVyJykuYXBwZW5kQ2hpbGQobm90ZURpdik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRlbGV0ZU5vdGUoZWxlbWVudCwgbmFtZSkge1xyXG4gICAgZWxlbWVudC5yZW1vdmUoKTtcclxuICAgIEFMTFBST0pFQ1RTLmdldFByb2plY3RCeU5hbWUoY3VycmVudFByb2plY3ROYW1lKS5yZW1vdmVOb3RlKG5hbWUpO1xyXG59XHJcblxyXG5mdW5jdGlvbiB0b2dnbGVDaGVja05vdGUobm90ZSwgY2hlY2tTcGFuLCBub3RlTmFtZVNwYW4pIHsgLy8gY2hlY2sgb3IgdW5jaGVja1xyXG4gICAgaWYobm90ZS5nZXRDaGVja2VkKCkgPT09IHRydWUpIHtcclxuICAgICAgICBjaGVja1NwYW4uc3R5bGUuY3NzVGV4dCA9IFwiYmFja2dyb3VuZC1jb2xvcjogI2VkZTlkOTtcIlxyXG4gICAgICAgIG5vdGVOYW1lU3Bhbi5zdHlsZS5jc3NUZXh0ID0gXCJtYXJnaW4tcmlnaHQ6IGF1dG87IHRleHQtZGVjb3JhdGlvbjogbGluZS10aHJvdWdoO1wiO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgY2hlY2tTcGFuLnN0eWxlLmNzc1RleHQgPSBcImJhY2tncm91bmQtY29sb3I6IHdoaXRlO1wiXHJcbiAgICAgICAgbm90ZU5hbWVTcGFuLnN0eWxlLmNzc1RleHQgPSBcIm1hcmdpbi1yaWdodDogYXV0bztcIjtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gbG9hZE5vdGVzKCkge1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI25vdGVzLWNvbnRhaW5lcicpLmlubmVySFRNTCA9IFwiXCI7IC8vIGNsZWFyIHBhZ2UgdG8gZGlzcGxheSBuZXcgcHJvamVjdCdzIG5vdGVzXHJcblxyXG4gICAgbGV0IHByb2plY3QgPSBBTExQUk9KRUNUUy5nZXRQcm9qZWN0QnlOYW1lKGN1cnJlbnRQcm9qZWN0TmFtZSkubm90ZXM7XHJcbiAgICBwcm9qZWN0LmZvckVhY2gobm90ZSA9PiB7XHJcbiAgICAgICAgZGlzcGxheU5vdGUobm90ZS5nZXROYW1lKCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcblxyXG5hZGRQcm9qZWN0KCk7XHJcbmxvYWRQcm9qZWN0cygpO1xyXG50b2dnbGVNb2JpbGVOYXZNZW51KCk7XHJcbmFkZE5vdGUoKTtcclxuXHJcbmV4cG9ydCB7XHJcbiAgICB0b2dnbGVNb2JpbGVOYXZNZW51XHJcbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IHRvZ2dsZU1vYmlsZU5hdk1lbnUgfSBmcm9tIFwiLi91c2VySW50ZXJmYWNlXCI7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==