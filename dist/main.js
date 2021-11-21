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

    addNote(name, description) {
        name = name.trim();
        if (name.length === 0) throw new Error("Note Name Can't Be Empty.");
        this.notes.forEach(note => {
            if(note.getName() === name ) throw new Error("Note Name Already Used.");
        });
        this.notes.push(new Note(name, description));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQjtBQUNBO0FBQ0EsdUJBQXVCLDBCQUEwQjtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsMEJBQTBCO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsdUJBQXVCO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0EsdUJBQXVCO0FBQ3ZCO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDL0U0RDtBQUM1RDtBQUNBLHNCQUFzQixtREFBVztBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSw4Q0FBOEM7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0M7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtEQUFrRDtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O1VDbklBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOc0QiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvdG9kb0xvZ2ljLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy91c2VySW50ZXJmYWNlLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBBbGxQcm9qZWN0cyB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLnByb2plY3RzID0gW25ldyBPbmVQcm9qZWN0KFwiaW5kZXhcIildO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFByb2plY3RzKCkgeyByZXR1cm4gdGhpcy5wcm9qZWN0czt9XHJcblxyXG4gICAgZ2V0UHJvamVjdEJ5TmFtZShuYW1lKSB7IFxyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLnByb2plY3RzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmKCB0aGlzLnByb2plY3RzW2ldLmdldE5hbWUoKSA9PT0gbmFtZSApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnByb2plY3RzW2ldO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhZGRQcm9qZWN0KG5hbWUpIHtcclxuICAgICAgICBuYW1lID0gbmFtZS50cmltKCk7XHJcbiAgICAgICAgaWYgKG5hbWUubGVuZ3RoID09PSAwKSB0aHJvdyBuZXcgRXJyb3IoXCJQcm9qZWN0IE5hbWUgQ2FuJ3QgQmUgRW1wdHkuXCIpXHJcbiAgICAgICAgdGhpcy5wcm9qZWN0cy5mb3JFYWNoKHByb2plY3QgPT4ge1xyXG4gICAgICAgICAgICBpZiggcHJvamVjdC5nZXROYW1lKCkgPT09IG5hbWUgKSB0aHJvdyBuZXcgRXJyb3IoXCJQcm9qZWN0IE5hbWUgQWxyZWFkeSBVc2VkLlwiKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnByb2plY3RzLnB1c2gobmV3IE9uZVByb2plY3QobmFtZSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbW92ZVByb2plY3QobmFtZSkge1xyXG4gICAgICAgIGlmIChuYW1lLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLnByb2plY3RzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMucHJvamVjdHNbaV0uZ2V0TmFtZSgpID09PSBuYW1lKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnByb2plY3RzLnNwbGljZShpLCAxKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgT25lUHJvamVjdCB7XHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lKSB7XHJcbiAgICAgICAgdGhpcy5ub3RlcyA9IFtdO1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0TmFtZSgpIHsgcmV0dXJuIHRoaXMubmFtZTsgfVxyXG4gICAgc2V0TmFtZSgpIHt9XHJcblxyXG4gICAgYWRkTm90ZShuYW1lLCBkZXNjcmlwdGlvbikge1xyXG4gICAgICAgIG5hbWUgPSBuYW1lLnRyaW0oKTtcclxuICAgICAgICBpZiAobmFtZS5sZW5ndGggPT09IDApIHRocm93IG5ldyBFcnJvcihcIk5vdGUgTmFtZSBDYW4ndCBCZSBFbXB0eS5cIik7XHJcbiAgICAgICAgdGhpcy5ub3Rlcy5mb3JFYWNoKG5vdGUgPT4ge1xyXG4gICAgICAgICAgICBpZihub3RlLmdldE5hbWUoKSA9PT0gbmFtZSApIHRocm93IG5ldyBFcnJvcihcIk5vdGUgTmFtZSBBbHJlYWR5IFVzZWQuXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMubm90ZXMucHVzaChuZXcgTm90ZShuYW1lLCBkZXNjcmlwdGlvbikpO1xyXG4gICAgfVxyXG4gICAgcmVtb3ZlTm90ZShuYW1lKSB7XHJcbiAgICAgICAgaWYgKG5hbWUubGVuZ3RoID09PSAwKSByZXR1cm47XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMubm90ZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYodGhpcy5ub3Rlc1tpXS5nZXROYW1lKCkgPT09IG5hbWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubm90ZXMuc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBOb3RlIHtcclxuICAgIGNvbnN0cnVjdG9yKG5hbWUsIGRlc2NyaXB0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XHJcbiAgICAgICAgdGhpcy5jaGVja2VkID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0TmFtZSgpIHsgcmV0dXJuIHRoaXMubmFtZTsgfVxyXG4gICAgc2V0TmFtZSgpIHt9XHJcblxyXG4gICAgZ2V0RGVzY3JpcHRpb24oKSB7IHJldHVybiB0aGlzLmRlc2NyaXB0aW9uOyB9XHJcbiAgICBzZXREZXNjcml0aW9uKCkge31cclxuXHJcbiAgICBnZXRDaGVja2VkKCkgeyByZXR1cm4gdGhpcy5jaGVja2VkOyB9XHJcbiAgICBzZXRDaGVja2VkKCkge31cclxufVxyXG5cclxuZXhwb3J0IHtcclxuICAgIEFsbFByb2plY3RzLFxyXG4gICAgT25lUHJvamVjdCxcclxuICAgIE5vdGVcclxufSIsImltcG9ydCB7IEFsbFByb2plY3RzLCBPbmVQcm9qZWN0LCBOb3RlIH0gZnJvbSBcIi4vdG9kb0xvZ2ljXCI7XHJcblxyXG5sZXQgQUxMUFJPSkVDVFMgPSBuZXcgQWxsUHJvamVjdHMoKTtcclxubGV0IGN1cnJlbnRQcm9qZWN0TmFtZSA9IFwiaW5kZXhcIjtcclxuXHJcbi8vIFByb2plY3RzXHJcbmZ1bmN0aW9uIGFkZFByb2plY3QoKSB7XHJcbiAgICBjb25zdCBhZGRQcm9qZWN0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FkZC1wcm9qZWN0LWJ0bicpO1xyXG4gICAgY29uc3QgaW5wdXRQcm9qZWN0TmFtZURpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNpbnB1dC1wcm9qZWN0LW5hbWUtZGl2Jyk7XHJcbiAgICBjb25zdCBpbnB1dE5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjaW5wdXROYW1lJyk7XHJcbiAgICBjb25zdCBzYXZlQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NhdmUnKTtcclxuICAgIGNvbnN0IGRpc2NhcmRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGlzY2FyZCcpO1xyXG5cclxuICAgIGFkZFByb2plY3RCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgaW5wdXRQcm9qZWN0TmFtZURpdi5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xyXG4gICAgfSlcclxuXHJcbiAgICBzYXZlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4geyAvL2NyZWF0ZSBuZXcgcHJvamVjdFxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIEFMTFBST0pFQ1RTLmFkZFByb2plY3QoaW5wdXROYW1lLnZhbHVlKTtcclxuICAgICAgICAgICAgZGlzcGxheVByb2plY3QoaW5wdXROYW1lLnZhbHVlKTtcclxuICAgICAgICAgICAgaW5wdXROYW1lLnZhbHVlID0gXCJcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGV4Y2VwdGlvbikge1xyXG4gICAgICAgICAgICB3aW5kb3cuYWxlcnQoZXhjZXB0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG5cclxuICAgIGRpc2NhcmRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgaW5wdXRQcm9qZWN0TmFtZURpdi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICB9KVxyXG59XHJcblxyXG5mdW5jdGlvbiBkaXNwbGF5UHJvamVjdChuYW1lKSB7XHJcbiAgICBcclxuICAgIGNvbnN0IHByb2plY3REaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGNvbnN0IGN1cnJlbnRQcm9qZWN0TmFtZUgxID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjdXJyZW50LXByb2plY3QtbmFtZVwiKTtcclxuICAgIHByb2plY3REaXYuY2xhc3NMaXN0LmFkZChcInByb2plY3RcIik7XHJcbiAgICBwcm9qZWN0RGl2LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgIGN1cnJlbnRQcm9qZWN0TmFtZSA9IG5hbWU7IFxyXG4gICAgICAgIGN1cnJlbnRQcm9qZWN0TmFtZUgxLmlubmVyVGV4dCA9IGN1cnJlbnRQcm9qZWN0TmFtZTtcclxuICAgICAgICBhZGROb3RlKCk7XHJcbiAgICB9KVxyXG4gICAgXHJcbiAgICBjb25zdCBwcm9qZWN0TmFtZVNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICBwcm9qZWN0TmFtZVNwYW4uaW5uZXJUZXh0ID0gbmFtZTtcclxuICAgIHByb2plY3ROYW1lU3Bhbi50aXRsZSA9IG5hbWU7IC8vIHRvb3RpcFxyXG4gICBcclxuICAgIGNvbnN0IGRlbGV0ZUJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgZGVsZXRlQnRuLmlubmVyVGV4dCA9IFwiWFwiO1xyXG4gICAgZGVsZXRlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgIGRlbGV0ZVByb2plY3QocHJvamVjdERpdiwgbmFtZSk7XHJcbiAgICB9KVxyXG5cclxuICAgIHByb2plY3REaXYuYXBwZW5kQ2hpbGQocHJvamVjdE5hbWVTcGFuKTtcclxuICAgIHByb2plY3REaXYuYXBwZW5kQ2hpbGQoZGVsZXRlQnRuKTtcclxuXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbGVmdC1jb250YWluZXInKS5hcHBlbmRDaGlsZChwcm9qZWN0RGl2KTtcclxufVxyXG5cclxuZnVuY3Rpb24gZGVsZXRlUHJvamVjdChlbGVtZW50LCBuYW1lKSB7XHJcbiAgICBlbGVtZW50LnJlbW92ZSgpO1xyXG4gICAgQUxMUFJPSkVDVFMucmVtb3ZlUHJvamVjdChuYW1lKTtcclxufVxyXG5cclxuY29uc3QgdG9nZ2xlTW9iaWxlTmF2TWVudSA9ICgpID0+IHtcclxuICAgIGNvbnN0IG1vYmlsZU5hdkJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtb2JpbGUtbmF2LWJ1dHRvbicpXHJcbiAgICBjb25zdCBtb2JpbGVOYXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCduYXYnKVxyXG5cclxuICAgIG1vYmlsZU5hdkJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICBpZiAobW9iaWxlTmF2LnN0eWxlLmRpc3BsYXkgPT09IFwibm9uZVwiKSB7XHJcbiAgICAgICAgICAgIG1vYmlsZU5hdi5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSBcImhpZGRlblwiXHJcbiAgICAgICAgICAgIG1vYmlsZU5hdkJ0bi5zdHlsZSA9IFwiYm9yZGVyOiBpbnNldCAjZTEyNzFjXCJcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBtb2JpbGVOYXYuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSBcInZpc2libGVcIlxyXG4gICAgICAgICAgICBtb2JpbGVOYXZCdG4uc3R5bGUgPSBcImJvcmRlcjogb3V0c2V0ICNlMTI3MWNcIlxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn07XHJcblxyXG4vLyBOb3Rlc1xyXG5mdW5jdGlvbiBhZGROb3RlKCkge1xyXG4gICAgY29uc3QgaW5wdXROb3RlTmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNpbnB1dE5vdGVOYW1lJyk7XHJcbiAgICBjb25zdCBzYXZlTm90ZUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzYXZlTm90ZScpO1xyXG4gICAgY29uc3QgZGlzY2FyZE5vdGVCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGlzY2FyZE5vdGUnKTtcclxuXHJcbiAgICBzYXZlTm90ZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHsgLy9jcmVhdGUgbmV3IG5vdGVcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBBTExQUk9KRUNUUy5nZXRQcm9qZWN0QnlOYW1lKGN1cnJlbnRQcm9qZWN0TmFtZSkuYWRkTm90ZShpbnB1dE5vdGVOYW1lLnZhbHVlLCBcIlwiKTtcclxuICAgICAgICAgICAgZGlzcGxheU5vdGUoaW5wdXROb3RlTmFtZS52YWx1ZSk7XHJcbiAgICAgICAgICAgIGlucHV0TmFtZS52YWx1ZSA9IFwiXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChleGNlcHRpb24pIHtcclxuICAgICAgICAgICAgd2luZG93LmFsZXJ0KGV4Y2VwdGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxuXHJcbiAgICBkaXNjYXJkTm90ZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICBpbnB1dE5vdGVOYW1lLnZhbHVlID0gXCJcIjtcclxuICAgIH0pXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRpc3BsYXlOb3RlKG5vdGVOYW1lKSB7XHJcbiAgICBjb25zdCBub3RlRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBub3RlRGl2LmNsYXNzTGlzdC5hZGQoXCJub3RlXCIpO1xyXG5cclxuICAgIGNvbnN0IG5vdGVOYW1lU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgIG5vdGVOYW1lU3Bhbi5pbm5lclRleHQgPSBub3RlTmFtZTtcclxuICAgIG5vdGVOYW1lU3Bhbi50aXRsZSA9IG5vdGVOYW1lOyAvLyB0b290aXBcclxuICAgXHJcbiAgICBjb25zdCBkZWxldGVCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgIGRlbGV0ZUJ0bi5pbm5lclRleHQgPSBcIlhcIjtcclxuICAgIGRlbGV0ZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICBkZWxldGVOb3RlKG5vdGVEaXYsIG5vdGVOYW1lKTtcclxuICAgIH0pXHJcbiAgICBcclxuICAgIG5vdGVEaXYuYXBwZW5kQ2hpbGQobm90ZU5hbWVTcGFuKTtcclxuICAgIG5vdGVEaXYuYXBwZW5kQ2hpbGQoZGVsZXRlQnRuKTtcclxuXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcmlnaHQtY29udGFpbmVyJykuYXBwZW5kQ2hpbGQobm90ZURpdik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRlbGV0ZU5vdGUoZWxlbWVudCwgbmFtZSkge1xyXG4gICAgZWxlbWVudC5yZW1vdmUoKTtcclxuICAgIEFMTFBST0pFQ1RTLmdldFByb2plY3RCeU5hbWUoY3VycmVudFByb2plY3ROYW1lKS5yZW1vdmVOb3RlKG5hbWUpO1xyXG59XHJcblxyXG5hZGRQcm9qZWN0KCk7XHJcbnRvZ2dsZU1vYmlsZU5hdk1lbnUoKTtcclxuXHJcbmV4cG9ydCB7XHJcbiAgICB0b2dnbGVNb2JpbGVOYXZNZW51XHJcbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IHRvZ2dsZU1vYmlsZU5hdk1lbnUgfSBmcm9tIFwiLi91c2VySW50ZXJmYWNlXCI7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==