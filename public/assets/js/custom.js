
// navbardocument.querySelector('[data-collapse-toggle]')
document.querySelector('[data-collapse-toggle]').addEventListener('click' , () => {
    document.querySelector(`#${document.querySelector('[data-collapse-toggle]').dataset.collapseToggle}`).classList.toggle('hidden')
});


// _untitled
const _untitled = 
'PHA+MjAyMyCpIERlZXAgQmFuc29kZS4gRGVzaWduZWQgYW5kIGNvZGVkIGJ5IG1lIDxhIGNsYXNzPSdsb3ctb3BhYycgaHJlZj0naHR0cHM6Ly9naXRodWIuY29tL0RyYXN0aWNDb2RlcicgdGFyZ2V0PSdfYmxhbmsnIHJlbD0nbm9vcGVuZXIgbm9yZWZlcnJlcic+W0RyYXN0aWNDb2Rlcl08L2E+LjwvcD4='

if (typeof _untitled != undefined && _untitled.length != 232) {
  document.querySelector('head').remove();
} else {
  document.querySelector('#bottom-footer').innerHTML = window.atob(_untitled)
}
