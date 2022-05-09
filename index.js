const KEYBOARD_URL = './keyboard.json'
const res = await fetch(KEYBOARD_URL);
const KEYBOARD = await res.json();

let header = document.createElement('h1');
let textarea = document.createElement('textarea');
let div = document.createElement('div');
let span = document.createElement('span');
let isCaps = false;

document.body.append(header);
document.body.append(textarea);
document.body.append(div);
document.body.append(span);

header.innerHTML = 'Virtual Keyboard';
span.innerHTML = 'The keyboard is created for Windows<br>Press SHIFT + CTRL to change language'
div.setAttribute('id', 'keyboard');
textarea.autofocus = true;

const DEFAULT_LANGUAGE = 'en';
let language = localStorage.getItem('language') || DEFAULT_LANGUAGE;
createKeyboard(language);

/* function addCollection() {
    let i = 0;
    for (let key in KEYBOARD_COLLECTION) {
        KEYBOARD_COLLECTION[key].EN = KEYBOARD_RU[i];
        i += 1;
    }
    console.log(KEYBOARD_COLLECTION);
};
addCollection(); */

function createKeyboard(language) {
    let symb = '';
    for (let key in KEYBOARD) {
        if (language == 'en') {
            if (isCaps) {
                symb += `<div class='key' data='${key}'>${KEYBOARD[key].EN}</div>`;    
            } else {
                symb += `<div class='key' data='${key}'>${KEYBOARD[key].en}</div>`;
            }
        } else {
            if (isCaps) {
                symb += `<div class='key' data='${key}'>${KEYBOARD[key].RU}</div>`;
            } else {
                symb += `<div class='key' data='${key}'>${KEYBOARD[key].ru}</div>`;
            }
        }
    }
    document.querySelector('#keyboard').innerHTML = symb;
};

document.onkeydown = function(event) {
    let active_key = document.querySelector(`.key[data='${event.code}']`);
    console.log(active_key);
    active_key.classList.add('active');
    writeText(event);
    shiftKeys(event);
    changeLanguage(event);
}
document.onkeyup = function(event) {
    let active_key = document.querySelector(`.key[data='${event.code}']`);
    active_key.classList.remove('active');
    unshiftKeys(event);
}

let keys = document.querySelectorAll('.key');

keys.forEach((key) => key.addEventListener('mousedown', addActiveOnClick));
keys.forEach((key) => key.addEventListener('mouseup', removeActiveOnClick));

function addActiveOnClick() {
    event.target.classList.add('active');
}
function removeActiveOnClick() {
    event.target.classList.remove('active');
}

keys.forEach((key) => key.addEventListener('mousedown', addActiveOnClick));

function writeText(event) {
    if (event.code == 'Backspace') {
        textarea.innerHTML = textarea.innerHTML.slice(0, -1);
    } else if (event.code == 'ShiftLeft' || event.code == 'ShiftRight' || event.code == 'ControlLeft' || event.code == 'MetaLeft' || event.code == 'AltLeft' || event.code == 'AltLeft' || event.code == 'AltRight' || event.code == 'ControlRight') {
        textarea.innerHTML = textarea.innerHTML;
    } else if (event.code === 'CapsLock') {
        capsKeys();
    } else if (event.code === 'Enter') {
        textarea.innerHTML += '\n';
    } else if (event.code === 'Tab') {
        textarea.innerHTML += '\t';
    } else if (event.code === 'Delete') {
        
    } else {
        let current_key = document.querySelector(`.key[data='${event.code}']`);
        textarea.innerHTML += current_key.innerHTML;
    }
}

function shiftKeys(event) {
    keys = document.querySelectorAll('.key');
    if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
        if (language === 'en') {
            if (!isCaps) {
                keys.forEach((key) => { 
                    key.innerHTML = KEYBOARD[key.getAttribute('data')].EN; 
                });
            } else {
                keys.forEach((key) => { 
                    key.innerHTML = KEYBOARD[key.getAttribute('data')].en; 
                });
            }
        } else {
            if (!isCaps) {
                keys.forEach((key) => { 
                    key.innerHTML = KEYBOARD[key.getAttribute('data')].RU; 
                });
            } else {
                keys.forEach((key) => { 
                    key.innerHTML = KEYBOARD[key.getAttribute('data')].ru; 
                });
            }
        }
    }
}

function unshiftKeys(event) {
    if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
        if (language === 'en') {
            if (q_key.innerHTML === 'q') {
                keys.forEach((key) => { 
                    key.innerHTML = KEYBOARD[key.getAttribute('data')].EN; 
                });
            } else {
                keys.forEach((key) => { 
                    key.innerHTML = KEYBOARD[key.getAttribute('data')].en; 
                });
            }
        } else {
            if (q_key.innerHTML === 'й') {
                keys.forEach((key) => { 
                    key.innerHTML = KEYBOARD[key.getAttribute('data')].RU; 
                });
            } else {
                keys.forEach((key) => { 
                    key.innerHTML = KEYBOARD[key.getAttribute('data')].ru; 
                });
            }
        }
    }
}

function changeLanguage(event) {
    const LEFT_CONTROL = document.querySelector('.key[data="ControlLeft"]');
    const RIGHT_CONTROL = document.querySelector('.key[data="ControlRight"]');
    const LEFT_SHIFT = document.querySelector('.key[data="ShiftLeft"]');
    const RIGHT_SHIFT = document.querySelector('.key[data="ShiftRight"]');

    if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
        if (LEFT_CONTROL.classList.contains('active') || RIGHT_CONTROL.classList.contains('active')) {
            if (language === 'ru') {
                language = 'en';
            } else {
                language = 'ru';
            }
            createKeyboard(language);
        }
    } else if (event.code === 'ControlLeft' || event.code === 'ControlRight') {
        if (LEFT_SHIFT.classList.contains('active') || RIGHT_SHIFT.classList.contains('active')) {
            if (language === 'ru') {
                language = 'en';
            } else {
                language = 'ru';
            }
            createKeyboard(language);
        }
    }
    localStorage.setItem('language', language);
}

let q_key = document.querySelector('.key[data="KeyQ"]');

function capsKeys() {
    keys = document.querySelectorAll('.key');
    if (language === 'en') {
        if (!isCaps) {
            keys.forEach((key) => { 
                key.innerHTML = KEYBOARD[key.getAttribute('data')].EN; 
            });
            isCaps = true;
        } else {
            keys.forEach((key) => { 
                key.innerHTML = KEYBOARD[key.getAttribute('data')].en; 
            });
            isCaps = false;
        }
    } else {
        if (!isCaps) {
            keys.forEach((key) => { 
                key.innerHTML = KEYBOARD[key.getAttribute('data')].RU; 
            });
            isCaps = true;
        } else {
            keys.forEach((key) => { 
                key.innerHTML = KEYBOARD[key.getAttribute('data')].ru; 
            });
            isCaps = false;
        }
    }
}