const KEYBOARD_URL = './keyboard.json'
const res = await fetch(KEYBOARD_URL);
const KEYBOARD = await res.json();

let header = document.createElement('h1');
let textarea = document.createElement('textarea');
let div = document.createElement('div');
let span = document.createElement('span');
let keys = document.querySelectorAll('.key');
let isCaps = false;

document.body.append(header);
document.body.append(textarea);
document.body.append(div);
document.body.append(span);

header.innerHTML = 'Virtual Keyboard';
span.innerHTML = 'The keyboard is created for Windows<br>Press SHIFT + CTRL to change language'
div.setAttribute('id', 'keyboard');
//textarea.disabled = true;
//textarea.autofocus = true;

const DEFAULT_LANGUAGE = 'en';
let language = localStorage.getItem('language') || DEFAULT_LANGUAGE;
createKeyboard(language);

textarea.focus();
let cursorPosition = 0;

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
    keys = document.querySelectorAll('.key');
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
}

document.onkeydown = (event) => {
    if (event.code in KEYBOARD) {
        let active_key = document.querySelector(`.key[data='${event.code}']`);
        active_key.classList.add('active');
        writeText(event);
        shiftKeys(event);
        changeLanguage(event);
    }
}
document.onkeyup = (event) => {
    if (event.code in KEYBOARD) {
        let active_key = document.querySelector(`.key[data='${event.code}']`);
        active_key.classList.remove('active');
        unshiftKeys(event);
    }
}

const KEYBOARD_BLOCK = document.getElementById('keyboard');
KEYBOARD_BLOCK.onmousedown = () => { writeTextByMouse() };

keys.forEach((key) => key.addEventListener('mousedown', addActiveOnClick));
keys.forEach((key) => key.addEventListener('mouseup', removeActiveOnClick));

function addActiveOnClick() {
    event.target.classList.add('active');
}
function removeActiveOnClick() {
    event.target.classList.remove('active');
}
function writeTextByMouse() {
    if (event.target.getAttribute('data') == 'Backspace') {
        if (cursorPosition > 0) {
            textarea.innerHTML = textarea.innerHTML.substring(0, textarea.selectionStart - 1) + textarea.innerHTML.substring(textarea.selectionEnd);
            cursorPosition -= 1;
          }
    } else if (event.target.getAttribute('data') == 'ShiftLeft' || event.target.getAttribute('data') == 'ShiftRight' || event.target.getAttribute('data') == 'ControlLeft' || event.target.getAttribute('data') == 'MetaLeft' || event.target.getAttribute('data') == 'AltLeft' || event.target.getAttribute('data') == 'AltLeft' || event.target.getAttribute('data') == 'AltRight' || event.target.getAttribute('data') == 'ControlRight' || event.target.getAttribute('id') == 'keyboard') {
        textarea.innerHTML;
    } else if (event.target.getAttribute('data') === 'CapsLock') {
        capsKeys();
    } else if (event.target.getAttribute('data') === 'Enter') {
        textarea.innerHTML = textarea.innerHTML.substring(0, cursorPosition) + '\n' + textarea.innerHTML.substring(cursorPosition);
        cursorPosition += 1;
    } else if (event.target.getAttribute('data') === 'Tab') {
        textarea.innerHTML = textarea.innerHTML.substring(0, cursorPosition) + '\t' + textarea.innerHTML.substring(cursorPosition);
        cursorPosition += 1;
    } else if (event.target.getAttribute('data') === 'Delete') {
        textarea.innerHTML = textarea.innerHTML.substring(0, textarea.selectionStart) + textarea.innerHTML.substring(textarea.selectionEnd + 1);
    } else {
        textarea.innerHTML = textarea.innerHTML.substring(0, cursorPosition) + event.target.innerHTML + textarea.innerHTML.substring(cursorPosition);
        cursorPosition += 1;
    }
    updateTextarea();
}

keys.forEach((key) => key.addEventListener('mousedown', addActiveOnClick));

function writeText(event) {
    event.preventDefault();
    if (event.code == 'Backspace') {
        if (cursorPosition > 0) {
            textarea.innerHTML = textarea.innerHTML.substring(0, textarea.selectionStart - 1) + textarea.innerHTML.substring(textarea.selectionEnd);
            cursorPosition -= 1;
          }
    } else if (event.code == 'ShiftLeft' || event.code == 'ShiftRight' || event.code == 'ControlLeft' || event.code == 'MetaLeft' || event.code == 'AltLeft' || event.code == 'AltLeft' || event.code == 'AltRight' || event.code == 'ControlRight') {
        textarea.innerHTML;
    } else if (event.code === 'CapsLock') {
        capsKeys();
    } else if (event.code === 'Enter') {
        textarea.innerHTML = textarea.innerHTML.substring(0, cursorPosition) + '\n' + textarea.innerHTML.substring(cursorPosition);
        cursorPosition += 1;
    } else if (event.code === 'Tab') {
        textarea.innerHTML = textarea.innerHTML.substring(0, cursorPosition) + '\t' + textarea.innerHTML.substring(cursorPosition);
        cursorPosition += 1;
    } else if (event.code === 'Delete') {
        textarea.innerHTML = textarea.innerHTML.substring(0, textarea.selectionStart) + textarea.innerHTML.substring(textarea.selectionEnd + 1);
    } else {
        let current_key = document.querySelector(`.key[data='${event.code}']`);
        textarea.innerHTML = textarea.innerHTML.substring(0, cursorPosition) + current_key.innerHTML + textarea.innerHTML.substring(cursorPosition);
        cursorPosition += 1;
    }
    updateTextarea();
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

function updateTextarea() {
    textarea.focus();
    textarea.selectionStart = textarea.selectionEnd = cursorPosition;
  }

textarea.addEventListener('click', () => {
  cursorPosition = textarea.selectionStart;
});