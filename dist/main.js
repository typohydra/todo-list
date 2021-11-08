/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
const toggleMobileNavMenu = ( () => {
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
})();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLENBQUMsSSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB0b2dnbGVNb2JpbGVOYXZNZW51ID0gKCAoKSA9PiB7XG4gICAgY29uc3QgbW9iaWxlTmF2QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI21vYmlsZS1uYXYtYnV0dG9uJylcbiAgICBjb25zdCBtb2JpbGVOYXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCduYXYnKVxuXG4gICAgbW9iaWxlTmF2QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBpZihtb2JpbGVOYXYuc3R5bGUuZGlzcGxheSA9PT0gXCJub25lXCIpIHtcbiAgICAgICAgICAgIG1vYmlsZU5hdi5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gXCJoaWRkZW5cIlxuICAgICAgICAgICAgbW9iaWxlTmF2QnRuLnN0eWxlID0gXCJib3JkZXI6IGluc2V0ICNlMTI3MWNcIlxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbW9iaWxlTmF2LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIlxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9IFwidmlzaWJsZVwiXG4gICAgICAgICAgICBtb2JpbGVOYXZCdG4uc3R5bGUgPSBcImJvcmRlcjogb3V0c2V0ICNlMTI3MWNcIlxuICAgICAgICB9XG4gICAgfSlcbn0pKCk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9