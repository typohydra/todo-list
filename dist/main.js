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
        catch(exception) { 
            window.alert(exception);
        }
    })

    discardBtn.addEventListener('click', () => {
        inputProjectNameDiv.style.display = "none";
    })
}

function displayProject(name) {
    const projectDiv = document.createElement('div');
    projectDiv.classList.add("project");

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
        if(mobileNav.style.display === "none") {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QiwwQkFBMEI7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1Qix1QkFBdUI7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQSx1QkFBdUI7QUFDdkI7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2RTBEO0FBQzFEO0FBQ0Esc0JBQXNCLG1EQUFXO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsOENBQThDO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0M7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztVQzNFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTnNEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3RvZG9Mb2dpYy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvdXNlckludGVyZmFjZS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgQWxsUHJvamVjdHMge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5wcm9qZWN0cyA9IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFByb2plY3RzKCkgeyByZXR1cm4gdGhpcy5wcm9qZWN0czt9XHJcblxyXG4gICAgYWRkUHJvamVjdChuYW1lKSB7XHJcbiAgICAgICAgbmFtZSA9IG5hbWUudHJpbSgpO1xyXG4gICAgICAgIGlmIChuYW1lLmxlbmd0aCA9PT0gMCkgdGhyb3cgbmV3IEVycm9yKFwiUHJvamVjdCBOYW1lIENhbid0IEJlIEVtcHR5LlwiKVxyXG4gICAgICAgIHRoaXMucHJvamVjdHMuZm9yRWFjaChwcm9qZWN0ID0+IHtcclxuICAgICAgICAgICAgaWYoIHByb2plY3QuZ2V0TmFtZSgpID09PSBuYW1lICkgdGhyb3cgbmV3IEVycm9yKFwiUHJvamVjdCBOYW1lIEFscmVhZHkgVXNlZC5cIik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5wcm9qZWN0cy5wdXNoKG5ldyBPbmVQcm9qZWN0KG5hbWUpKTtcclxuICAgIH1cclxuXHJcbiAgICByZW1vdmVQcm9qZWN0KG5hbWUpIHtcclxuICAgICAgICBpZiAobmFtZS5sZW5ndGggPT09IDApIHJldHVybjtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5wcm9qZWN0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZih0aGlzLnByb2plY3RzW2ldLmdldE5hbWUoKSA9PT0gbmFtZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9qZWN0cy5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIE9uZVByb2plY3Qge1xyXG4gICAgY29uc3RydWN0b3IobmFtZSkge1xyXG4gICAgICAgIHRoaXMubm90ZXMgPSBbXTtcclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIGdldE5hbWUoKSB7IHJldHVybiB0aGlzLm5hbWU7IH1cclxuICAgIHNldE5hbWUoKSB7fVxyXG5cclxuICAgIGFkZE5vdGUobmFtZSwgZGVzY3JpcHRpb24pIHtcclxuICAgICAgICBuYW1lID0gbmFtZS50cmltKCk7XHJcbiAgICAgICAgaWYgKG5hbWUubGVuZ3RoID09PSAwKSB0aHJvdyBuZXcgRXJyb3IoXCJOb3RlIE5hbWUgQ2FuJ3QgQmUgRW1wdHkuXCIpO1xyXG4gICAgICAgIHRoaXMubm90ZXMuZm9yRWFjaChub3RlID0+IHtcclxuICAgICAgICAgICAgaWYobm90ZS5nZXROYW1lKCkgPT09IG5hbWUgKSB0aHJvdyBuZXcgRXJyb3IoXCJOb3RlIE5hbWUgQWxyZWFkeSBVc2VkLlwiKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLm5vdGVzLnB1c2gobmV3IE5vdGUobmFtZSwgZGVzY3JpcHRpb24pKTtcclxuICAgIH1cclxuICAgIHJlbW92ZU5vdGUobmFtZSkge1xyXG4gICAgICAgIGlmIChuYW1lLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLm5vdGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMubm90ZXNbaV0uZ2V0TmFtZSgpID09PSBuYW1lKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vdGVzLnNwbGljZShpLCAxKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgTm90ZSB7XHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBkZXNjcmlwdGlvbikge1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xyXG4gICAgICAgIHRoaXMuY2hlY2tlZCA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldE5hbWUoKSB7IHJldHVybiB0aGlzLm5hbWU7IH1cclxuICAgIHNldE5hbWUoKSB7fVxyXG5cclxuICAgIGdldERlc2NyaXB0aW9uKCkgeyByZXR1cm4gdGhpcy5kZXNjcmlwdGlvbjsgfVxyXG4gICAgc2V0RGVzY3JpdGlvbigpIHt9XHJcblxyXG4gICAgZ2V0Q2hlY2tlZCgpIHsgcmV0dXJuIHRoaXMuY2hlY2tlZDsgfVxyXG4gICAgc2V0Q2hlY2tlZCgpIHt9XHJcbn1cclxuXHJcbmV4cG9ydCB7XHJcbiAgICBBbGxQcm9qZWN0cyxcclxuICAgIE9uZVByb2plY3QsXHJcbiAgICBOb3RlXHJcbn0iLCJpbXBvcnQge0FsbFByb2plY3RzLCBPbmVQcm9qZWN0LCBOb3RlfSBmcm9tIFwiLi90b2RvTG9naWNcIjtcclxuXHJcbmxldCBBTExQUk9KRUNUUyA9IG5ldyBBbGxQcm9qZWN0cygpO1xyXG5cclxuZnVuY3Rpb24gYWRkUHJvamVjdCgpIHsgXHJcbiAgICBjb25zdCBhZGRQcm9qZWN0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FkZC1wcm9qZWN0LWJ0bicpO1xyXG4gICAgY29uc3QgaW5wdXRQcm9qZWN0TmFtZURpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNpbnB1dC1wcm9qZWN0LW5hbWUtZGl2Jyk7XHJcbiAgICBjb25zdCBpbnB1dE5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjaW5wdXROYW1lJyk7XHJcbiAgICBjb25zdCBzYXZlQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NhdmUnKTtcclxuICAgIGNvbnN0IGRpc2NhcmRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGlzY2FyZCcpO1xyXG4gICAgXHJcbiAgICBhZGRQcm9qZWN0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgIGlucHV0UHJvamVjdE5hbWVEaXYuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcclxuICAgIH0pXHJcblxyXG4gICAgc2F2ZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHsgLy9jcmVhdGUgbmV3IHByb2plY3RcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBBTExQUk9KRUNUUy5hZGRQcm9qZWN0KGlucHV0TmFtZS52YWx1ZSk7XHJcbiAgICAgICAgICAgIGRpc3BsYXlQcm9qZWN0KGlucHV0TmFtZS52YWx1ZSk7XHJcbiAgICAgICAgICAgIGlucHV0TmFtZS52YWx1ZSA9IFwiXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoKGV4Y2VwdGlvbikgeyBcclxuICAgICAgICAgICAgd2luZG93LmFsZXJ0KGV4Y2VwdGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxuXHJcbiAgICBkaXNjYXJkQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgIGlucHV0UHJvamVjdE5hbWVEaXYuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgfSlcclxufVxyXG5cclxuZnVuY3Rpb24gZGlzcGxheVByb2plY3QobmFtZSkge1xyXG4gICAgY29uc3QgcHJvamVjdERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgcHJvamVjdERpdi5jbGFzc0xpc3QuYWRkKFwicHJvamVjdFwiKTtcclxuXHJcbiAgICBjb25zdCBwcm9qZWN0TmFtZVNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICBwcm9qZWN0TmFtZVNwYW4uaW5uZXJUZXh0ID0gbmFtZTtcclxuICAgIHByb2plY3ROYW1lU3Bhbi50aXRsZSA9IG5hbWU7IC8vIHRvb3RpcFxyXG4gICAgXHJcbiAgICBjb25zdCBkZWxldGVCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgIGRlbGV0ZUJ0bi5pbm5lclRleHQgPSBcIlhcIjtcclxuICAgIGRlbGV0ZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICBkZWxldGVQcm9qZWN0KHByb2plY3REaXYsIG5hbWUpO1xyXG4gICAgfSlcclxuICAgIFxyXG4gICAgcHJvamVjdERpdi5hcHBlbmRDaGlsZChwcm9qZWN0TmFtZVNwYW4pO1xyXG4gICAgcHJvamVjdERpdi5hcHBlbmRDaGlsZChkZWxldGVCdG4pO1xyXG5cclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNsZWZ0LWNvbnRhaW5lcicpLmFwcGVuZENoaWxkKHByb2plY3REaXYpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkZWxldGVQcm9qZWN0KGVsZW1lbnQsIG5hbWUpIHtcclxuICAgIGVsZW1lbnQucmVtb3ZlKCk7XHJcbiAgICBBTExQUk9KRUNUUy5yZW1vdmVQcm9qZWN0KG5hbWUpO1xyXG59XHJcblxyXG5jb25zdCB0b2dnbGVNb2JpbGVOYXZNZW51ID0gKCkgPT4ge1xyXG4gICAgY29uc3QgbW9iaWxlTmF2QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI21vYmlsZS1uYXYtYnV0dG9uJylcclxuICAgIGNvbnN0IG1vYmlsZU5hdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ25hdicpXHJcblxyXG4gICAgbW9iaWxlTmF2QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgIGlmKG1vYmlsZU5hdi5zdHlsZS5kaXNwbGF5ID09PSBcIm5vbmVcIikge1xyXG4gICAgICAgICAgICBtb2JpbGVOYXYuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIlxyXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gXCJoaWRkZW5cIlxyXG4gICAgICAgICAgICBtb2JpbGVOYXZCdG4uc3R5bGUgPSBcImJvcmRlcjogaW5zZXQgI2UxMjcxY1wiXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbW9iaWxlTmF2LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIlxyXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gXCJ2aXNpYmxlXCJcclxuICAgICAgICAgICAgbW9iaWxlTmF2QnRuLnN0eWxlID0gXCJib3JkZXI6IG91dHNldCAjZTEyNzFjXCJcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59O1xyXG5cclxuYWRkUHJvamVjdCgpO1xyXG50b2dnbGVNb2JpbGVOYXZNZW51KCk7XHJcblxyXG5leHBvcnQge1xyXG4gICAgdG9nZ2xlTW9iaWxlTmF2TWVudVxyXG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyB0b2dnbGVNb2JpbGVOYXZNZW51IH0gZnJvbSBcIi4vdXNlckludGVyZmFjZVwiO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=