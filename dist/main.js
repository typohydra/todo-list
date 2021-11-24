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
    setChecked() {}
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

    saveNoteBtn.addEventListener('click', function(e) { //create new note
        try {
            ALLPROJECTS.getProjectByName(currentProjectName).addNote(inputNoteName.value, "");
            displayNote(inputNoteName.value);
            inputNoteName.value = "";
        }
        catch (exception) {
            window.alert(exception);
        }
        e.stopPropagation();
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

    document.querySelector('#notes-container').appendChild(noteDiv);
}

function deleteNote(element, name) {
    element.remove();
    ALLPROJECTS.getProjectByName(currentProjectName).removeNote(name);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQjtBQUNBO0FBQ0EsdUJBQXVCLDBCQUEwQjtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsMEJBQTBCO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsdUJBQXVCO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0EsdUJBQXVCO0FBQ3ZCO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDL0U0RDtBQUM1RDtBQUNBLHNCQUFzQixtREFBVztBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsOENBQThDO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3REFBd0Q7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrREFBK0Q7QUFDL0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7VUN6SkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ05zRCIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy90b2RvTG9naWMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3VzZXJJbnRlcmZhY2UuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNsYXNzIEFsbFByb2plY3RzIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMucHJvamVjdHMgPSBbbmV3IE9uZVByb2plY3QoXCJpbmRleFwiKV07XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UHJvamVjdHMoKSB7IHJldHVybiB0aGlzLnByb2plY3RzO31cclxuXHJcbiAgICBnZXRQcm9qZWN0QnlOYW1lKG5hbWUpIHsgXHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMucHJvamVjdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYoIHRoaXMucHJvamVjdHNbaV0uZ2V0TmFtZSgpID09PSBuYW1lICkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvamVjdHNbaV07XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFkZFByb2plY3QobmFtZSkge1xyXG4gICAgICAgIG5hbWUgPSBuYW1lLnRyaW0oKTtcclxuICAgICAgICBpZiAobmFtZS5sZW5ndGggPT09IDApIHRocm93IG5ldyBFcnJvcihcIlByb2plY3QgTmFtZSBDYW4ndCBCZSBFbXB0eS5cIilcclxuICAgICAgICB0aGlzLnByb2plY3RzLmZvckVhY2gocHJvamVjdCA9PiB7XHJcbiAgICAgICAgICAgIGlmKCBwcm9qZWN0LmdldE5hbWUoKSA9PT0gbmFtZSApIHRocm93IG5ldyBFcnJvcihcIlByb2plY3QgTmFtZSBBbHJlYWR5IFVzZWQuXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMucHJvamVjdHMucHVzaChuZXcgT25lUHJvamVjdChuYW1lKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVtb3ZlUHJvamVjdChuYW1lKSB7XHJcbiAgICAgICAgaWYgKG5hbWUubGVuZ3RoID09PSAwKSByZXR1cm47XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMucHJvamVjdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYodGhpcy5wcm9qZWN0c1tpXS5nZXROYW1lKCkgPT09IG5hbWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucHJvamVjdHMuc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBPbmVQcm9qZWN0IHtcclxuICAgIGNvbnN0cnVjdG9yKG5hbWUpIHtcclxuICAgICAgICB0aGlzLm5vdGVzID0gW107XHJcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXROYW1lKCkgeyByZXR1cm4gdGhpcy5uYW1lOyB9XHJcbiAgICBzZXROYW1lKCkge31cclxuXHJcbiAgICBhZGROb3RlKG5vdGVOYW1lLCBkZXNjcmlwdGlvbikge1xyXG4gICAgICAgIG5vdGVOYW1lID0gbm90ZU5hbWUudHJpbSgpO1xyXG4gICAgICAgIGlmIChub3RlTmFtZS5sZW5ndGggPT09IDApIHRocm93IG5ldyBFcnJvcihcIk5vdGUgTmFtZSBDYW4ndCBCZSBFbXB0eS5cIik7XHJcbiAgICAgICAgdGhpcy5ub3Rlcy5mb3JFYWNoKG5vdGUgPT4ge1xyXG4gICAgICAgICAgICBpZihub3RlLmdldE5hbWUoKSA9PT0gbm90ZU5hbWUgKSB0aHJvdyBuZXcgRXJyb3IoXCJOb3RlIE5hbWUgQWxyZWFkeSBVc2VkLlwiKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLm5vdGVzLnB1c2gobmV3IE5vdGUobm90ZU5hbWUsIGRlc2NyaXB0aW9uKSk7XHJcbiAgICB9XHJcbiAgICByZW1vdmVOb3RlKG5hbWUpIHtcclxuICAgICAgICBpZiAobmFtZS5sZW5ndGggPT09IDApIHJldHVybjtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5ub3Rlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZih0aGlzLm5vdGVzW2ldLmdldE5hbWUoKSA9PT0gbmFtZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub3Rlcy5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIE5vdGUge1xyXG4gICAgY29uc3RydWN0b3IobmFtZSwgZGVzY3JpcHRpb24pIHtcclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcclxuICAgICAgICB0aGlzLmNoZWNrZWQgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXROYW1lKCkgeyByZXR1cm4gdGhpcy5uYW1lOyB9XHJcbiAgICBzZXROYW1lKCkge31cclxuXHJcbiAgICBnZXREZXNjcmlwdGlvbigpIHsgcmV0dXJuIHRoaXMuZGVzY3JpcHRpb247IH1cclxuICAgIHNldERlc2NyaXRpb24oKSB7fVxyXG5cclxuICAgIGdldENoZWNrZWQoKSB7IHJldHVybiB0aGlzLmNoZWNrZWQ7IH1cclxuICAgIHNldENoZWNrZWQoKSB7fVxyXG59XHJcblxyXG5leHBvcnQge1xyXG4gICAgQWxsUHJvamVjdHMsXHJcbiAgICBPbmVQcm9qZWN0LFxyXG4gICAgTm90ZVxyXG59IiwiaW1wb3J0IHsgQWxsUHJvamVjdHMsIE9uZVByb2plY3QsIE5vdGUgfSBmcm9tIFwiLi90b2RvTG9naWNcIjtcclxuXHJcbmxldCBBTExQUk9KRUNUUyA9IG5ldyBBbGxQcm9qZWN0cygpO1xyXG5sZXQgY3VycmVudFByb2plY3ROYW1lID0gXCJpbmRleFwiO1xyXG5cclxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8gUHJvamVjdHMgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuZnVuY3Rpb24gYWRkUHJvamVjdCgpIHtcclxuICAgIGNvbnN0IGFkZFByb2plY3RCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWRkLXByb2plY3QtYnRuJyk7XHJcbiAgICBjb25zdCBpbnB1dFByb2plY3ROYW1lRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2lucHV0LXByb2plY3QtbmFtZS1kaXYnKTtcclxuICAgIGNvbnN0IGlucHV0TmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNpbnB1dE5hbWUnKTtcclxuICAgIGNvbnN0IHNhdmVCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2F2ZScpO1xyXG4gICAgY29uc3QgZGlzY2FyZEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkaXNjYXJkJyk7XHJcblxyXG4gICAgYWRkUHJvamVjdEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICBpbnB1dFByb2plY3ROYW1lRGl2LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XHJcbiAgICB9KVxyXG5cclxuICAgIHNhdmVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7IC8vY3JlYXRlIG5ldyBwcm9qZWN0XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgQUxMUFJPSkVDVFMuYWRkUHJvamVjdChpbnB1dE5hbWUudmFsdWUpO1xyXG4gICAgICAgICAgICBkaXNwbGF5UHJvamVjdChpbnB1dE5hbWUudmFsdWUpO1xyXG4gICAgICAgICAgICBpbnB1dE5hbWUudmFsdWUgPSBcIlwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZXhjZXB0aW9uKSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5hbGVydChleGNlcHRpb24pO1xyXG4gICAgICAgIH1cclxuICAgIH0pXHJcblxyXG4gICAgZGlzY2FyZEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICBpbnB1dFByb2plY3ROYW1lRGl2LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgIH0pXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRpc3BsYXlQcm9qZWN0KG5hbWUpIHtcclxuICAgIFxyXG4gICAgY29uc3QgcHJvamVjdERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgY29uc3QgY3VycmVudFByb2plY3ROYW1lSDEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2N1cnJlbnQtcHJvamVjdC1uYW1lXCIpO1xyXG4gICAgcHJvamVjdERpdi5jbGFzc0xpc3QuYWRkKFwicHJvamVjdFwiKTtcclxuICAgIHByb2plY3REaXYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgY3VycmVudFByb2plY3ROYW1lID0gbmFtZTsgXHJcbiAgICAgICAgY3VycmVudFByb2plY3ROYW1lSDEuaW5uZXJUZXh0ID0gY3VycmVudFByb2plY3ROYW1lO1xyXG4gICAgICAgIGxvYWROb3RlcygpO1xyXG4gICAgfSlcclxuICAgIFxyXG4gICAgY29uc3QgcHJvamVjdE5hbWVTcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgcHJvamVjdE5hbWVTcGFuLmlubmVyVGV4dCA9IG5hbWU7XHJcbiAgICBwcm9qZWN0TmFtZVNwYW4udGl0bGUgPSBuYW1lOyAvLyB0b290aXBcclxuICAgXHJcbiAgICBjb25zdCBkZWxldGVCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgIGRlbGV0ZUJ0bi5pbm5lclRleHQgPSBcIlhcIjtcclxuICAgIGRlbGV0ZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICBkZWxldGVQcm9qZWN0KHByb2plY3REaXYsIG5hbWUpO1xyXG4gICAgfSlcclxuXHJcbiAgICBwcm9qZWN0RGl2LmFwcGVuZENoaWxkKHByb2plY3ROYW1lU3Bhbik7XHJcbiAgICBwcm9qZWN0RGl2LmFwcGVuZENoaWxkKGRlbGV0ZUJ0bik7XHJcblxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2xlZnQtY29udGFpbmVyJykuYXBwZW5kQ2hpbGQocHJvamVjdERpdik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRlbGV0ZVByb2plY3QoZWxlbWVudCwgbmFtZSkge1xyXG4gICAgZWxlbWVudC5yZW1vdmUoKTtcclxuICAgIEFMTFBST0pFQ1RTLnJlbW92ZVByb2plY3QobmFtZSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxvYWRQcm9qZWN0cygpIHtcclxuICAgIEFMTFBST0pFQ1RTLmdldFByb2plY3RzKCkuZm9yRWFjaChwcm9qZWN0ID0+IHtcclxuICAgICAgICBkaXNwbGF5UHJvamVjdChwcm9qZWN0LmdldE5hbWUoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuY29uc3QgdG9nZ2xlTW9iaWxlTmF2TWVudSA9ICgpID0+IHtcclxuICAgIGNvbnN0IG1vYmlsZU5hdkJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtb2JpbGUtbmF2LWJ1dHRvbicpXHJcbiAgICBjb25zdCBtb2JpbGVOYXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCduYXYnKVxyXG5cclxuICAgIG1vYmlsZU5hdkJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICBpZiAobW9iaWxlTmF2LnN0eWxlLmRpc3BsYXkgPT09IFwibm9uZVwiKSB7XHJcbiAgICAgICAgICAgIG1vYmlsZU5hdi5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSBcImhpZGRlblwiXHJcbiAgICAgICAgICAgIG1vYmlsZU5hdkJ0bi5zdHlsZSA9IFwiYm9yZGVyOiBpbnNldCAjZTEyNzFjXCJcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBtb2JpbGVOYXYuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSBcInZpc2libGVcIlxyXG4gICAgICAgICAgICBtb2JpbGVOYXZCdG4uc3R5bGUgPSBcImJvcmRlcjogb3V0c2V0ICNlMTI3MWNcIlxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn07XHJcblxyXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLyBOb3RlcyAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5mdW5jdGlvbiBhZGROb3RlKCkge1xyXG4gICAgY29uc3QgaW5wdXROb3RlTmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNpbnB1dE5vdGVOYW1lJyk7XHJcbiAgICBjb25zdCBzYXZlTm90ZUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzYXZlTm90ZScpO1xyXG4gICAgY29uc3QgZGlzY2FyZE5vdGVCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGlzY2FyZE5vdGUnKTtcclxuXHJcbiAgICBzYXZlTm90ZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHsgLy9jcmVhdGUgbmV3IG5vdGVcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBBTExQUk9KRUNUUy5nZXRQcm9qZWN0QnlOYW1lKGN1cnJlbnRQcm9qZWN0TmFtZSkuYWRkTm90ZShpbnB1dE5vdGVOYW1lLnZhbHVlLCBcIlwiKTtcclxuICAgICAgICAgICAgZGlzcGxheU5vdGUoaW5wdXROb3RlTmFtZS52YWx1ZSk7XHJcbiAgICAgICAgICAgIGlucHV0Tm90ZU5hbWUudmFsdWUgPSBcIlwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZXhjZXB0aW9uKSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5hbGVydChleGNlcHRpb24pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgfSlcclxuXHJcbiAgICBkaXNjYXJkTm90ZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICBpbnB1dE5vdGVOYW1lLnZhbHVlID0gXCJcIjtcclxuICAgIH0pXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRpc3BsYXlOb3RlKG5vdGVOYW1lKSB7XHJcbiAgICBjb25zdCBub3RlRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBub3RlRGl2LmNsYXNzTGlzdC5hZGQoXCJub3RlXCIpO1xyXG5cclxuICAgIGNvbnN0IG5vdGVOYW1lU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgIG5vdGVOYW1lU3Bhbi5pbm5lclRleHQgPSBub3RlTmFtZTtcclxuICAgIG5vdGVOYW1lU3Bhbi50aXRsZSA9IG5vdGVOYW1lOyAvLyB0b290aXBcclxuICAgXHJcbiAgICBjb25zdCBkZWxldGVCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgIGRlbGV0ZUJ0bi5pbm5lclRleHQgPSBcIlhcIjtcclxuICAgIGRlbGV0ZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICBkZWxldGVOb3RlKG5vdGVEaXYsIG5vdGVOYW1lKTtcclxuICAgIH0pXHJcbiAgICBcclxuICAgIG5vdGVEaXYuYXBwZW5kQ2hpbGQobm90ZU5hbWVTcGFuKTtcclxuICAgIG5vdGVEaXYuYXBwZW5kQ2hpbGQoZGVsZXRlQnRuKTtcclxuXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbm90ZXMtY29udGFpbmVyJykuYXBwZW5kQ2hpbGQobm90ZURpdik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRlbGV0ZU5vdGUoZWxlbWVudCwgbmFtZSkge1xyXG4gICAgZWxlbWVudC5yZW1vdmUoKTtcclxuICAgIEFMTFBST0pFQ1RTLmdldFByb2plY3RCeU5hbWUoY3VycmVudFByb2plY3ROYW1lKS5yZW1vdmVOb3RlKG5hbWUpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBsb2FkTm90ZXMoKSB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbm90ZXMtY29udGFpbmVyJykuaW5uZXJIVE1MID0gXCJcIjsgLy8gY2xlYXIgcGFnZSB0byBkaXNwbGF5IG5ldyBwcm9qZWN0J3Mgbm90ZXNcclxuXHJcbiAgICBsZXQgcHJvamVjdCA9IEFMTFBST0pFQ1RTLmdldFByb2plY3RCeU5hbWUoY3VycmVudFByb2plY3ROYW1lKS5ub3RlcztcclxuICAgIHByb2plY3QuZm9yRWFjaChub3RlID0+IHtcclxuICAgICAgICBkaXNwbGF5Tm90ZShub3RlLmdldE5hbWUoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuYWRkUHJvamVjdCgpO1xyXG5sb2FkUHJvamVjdHMoKTtcclxudG9nZ2xlTW9iaWxlTmF2TWVudSgpO1xyXG5hZGROb3RlKCk7XHJcblxyXG5leHBvcnQge1xyXG4gICAgdG9nZ2xlTW9iaWxlTmF2TWVudVxyXG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyB0b2dnbGVNb2JpbGVOYXZNZW51IH0gZnJvbSBcIi4vdXNlckludGVyZmFjZVwiO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=