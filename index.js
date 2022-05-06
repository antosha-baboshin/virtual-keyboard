const KEYBOARD_URL = './keyboard.json'
const res = await fetch(KEYBOARD_URL);
const KEYBOARD = await res.json();

let header = document.createElement('h1');
let textarea = document.createElement('textarea');
let div = document.createElement('div');
let span = document.createElement('span');

document.body.append(header);
document.body.append(textarea);
document.body.append(div);
document.body.append(span);

header.innerHTML = 'Virtual Keyboard';
span.innerHTML = 'The keyboard is created for Windows'
div.setAttribute('id', 'keyboard');
createKeyboard();

/* function addCollection() {
    let i = 0;
    for (let key in KEYBOARD_COLLECTION) {
        KEYBOARD_COLLECTION[key].EN = KEYBOARD_RU[i];
        i += 1;
    }
    console.log(KEYBOARD_COLLECTION);
};
addCollection(); */

function createKeyboard() {
    let symb = '';
    for (let key in KEYBOARD) {
        symb += `<div class='key' data='${key}'>${KEYBOARD[key].en}</div>`;
    }
    document.querySelector('#keyboard').innerHTML = symb;
};

document.onkeydown = function(event) {
    let active_key = document.querySelector(`.key[data='${event.code}']`);
    active_key.classList.add('active');
    writeText(event);
}
document.onkeyup = function(event) {
    let active_key = document.querySelector(`.key[data='${event.code}']`);
    active_key.classList.remove('active');
}

const KEYS = document.querySelectorAll('.key');

KEYS.forEach((key) => key.addEventListener('mousedown', addActiveOnClick));
KEYS.forEach((key) => key.addEventListener('mouseup', removeActiveOnClick));

function addActiveOnClick() {
    event.target.classList.add('active');
}
function removeActiveOnClick() {
    event.target.classList.remove('active');
}

KEYS.forEach((key) => key.addEventListener('mousedown', addActiveOnClick));

function writeText(event) {
    if (event.code == 'Backspace') {
        textarea.innerHTML = textarea.innerHTML.slice(0, -1);
    } else if (event.code == 'Tab' || event.code == 'Delete' || event.code == 'CapsLock' || event.code == 'Enter' || event.code == 'ShiftLeft' || event.code == 'ArrowUp' || event.code == 'ShiftRight' || event.code == 'ControlLeft' || event.code == 'MetaLeft' || event.code == 'AltLeft' || event.code == 'AltLeft' || event.code == 'AltRight' || event.code == 'ArrowLeft' || event.code == 'ArrowDown' || event.code == 'ArrowRight' || event.code == 'ControlRight') {
        textarea.innerHTML = textarea.innerHTML;
    } else {
        textarea.innerHTML += KEYBOARD[event.code].en;
    }
}

