const KEYBOARD_URL = './keyboard.json';
const res = await fetch(KEYBOARD_URL);
const KEYBOARD = await res.json();

const header = document.createElement('h1');
const textarea = document.createElement('textarea');
const div = document.createElement('div');
const span = document.createElement('span');
let keys = document.querySelectorAll('.key');
let isCaps = false;

document.body.append(header);
document.body.append(textarea);
document.body.append(div);
document.body.append(span);

header.innerHTML = 'Virtual Keyboard';
span.innerHTML = 'The keyboard is created for Windows<br>Press SHIFT + CTRL to change language';
div.setAttribute('id', 'keyboard');

const DEFAULT_LANGUAGE = 'en';
let language = localStorage.getItem('language') || DEFAULT_LANGUAGE;

textarea.focus();
let cursorPosition = 0;

function createKeyboard(lang) {
  let symb = '';
  keys = document.querySelectorAll('.key');
  for (const key in KEYBOARD) {
    if (lang === 'en') {
      if (isCaps) {
        symb += `<div class='key' data='${key}'>${KEYBOARD[key].EN}</div>`;
      } else {
        symb += `<div class='key' data='${key}'>${KEYBOARD[key].en}</div>`;
      }
    } else if (isCaps) {
      symb += `<div class='key' data='${key}'>${KEYBOARD[key].RU}</div>`;
    } else {
      symb += `<div class='key' data='${key}'>${KEYBOARD[key].ru}</div>`;
    }
  }
  document.querySelector('#keyboard').innerHTML = symb;
}

createKeyboard(language);

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
  } else if (!isCaps) {
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

function updateTextarea() {
  textarea.focus();
  textarea.selectionStart = textarea.selectionEnd = cursorPosition;
}

function writeText(event) {
  const startCursorPos = textarea.textContent.substring(0, cursorPosition);
  const currentCursorPos = textarea.textContent.substring(cursorPosition);

  event.preventDefault();
  if (event.code === 'Backspace') {
    if (cursorPosition > 0) {
      const subStrStart = textarea.textContent.substring(0, textarea.selectionStart - 1);
      const subStrEnd = textarea.textContent.substring(textarea.selectionEnd);
      textarea.textContent = subStrStart + subStrEnd;
      cursorPosition -= 1;
    }
  } else if (event.code === 'ShiftLeft' || event.code === 'ShiftRight' || event.code === 'ControlLeft' || event.code === 'MetaLeft' || event.code === 'AltLeft' || event.code === 'AltLeft' || event.code === 'AltRight' || event.code === 'ControlRight') {
    return textarea.textContent;
  } else if (event.code === 'CapsLock') {
    capsKeys();
  } else if (event.code === 'Enter') {
    textarea.textContent = `${startCursorPos}\n${currentCursorPos}`;
    cursorPosition += 1;
  } else if (event.code === 'Tab') {
    textarea.textContent = `${startCursorPos}\t${currentCursorPos}`;
    cursorPosition += 1;
  } else if (event.code === 'Delete') {
    const startSel = textarea.textContent.substring(0, textarea.selectionStart);
    const endSel = textarea.textContent.substring(textarea.selectionEnd + 1);
    textarea.textContent = startSel + endSel;
  } else {
    const CURRENT_KEY = document.querySelector(`.key[data='${event.code}']`);
    textarea.textContent = startCursorPos + CURRENT_KEY.textContent + currentCursorPos;
    cursorPosition += 1;
  }
  return updateTextarea();
}

function addActiveOnClick() {
  event.target.classList.add('active');
}
function removeActiveOnClick() {
  event.target.classList.remove('active');
}
function writeTextByMouse() {
  if (event.target.getAttribute('data') === 'Backspace') {
    if (cursorPosition > 0) {
      const subStrStart = textarea.textContent.substring(0, textarea.selectionStart - 1);
      const subStrEnd = textarea.textContent.substring(textarea.selectionEnd);
      textarea.textContent = subStrStart + subStrEnd;
      cursorPosition -= 1;
    }
  } else if (event.target.getAttribute('data') === 'ShiftLeft' || event.target.getAttribute('data') === 'ShiftRight' || event.target.getAttribute('data') === 'ControlLeft' || event.target.getAttribute('data') === 'MetaLeft' || event.target.getAttribute('data') === 'AltLeft' || event.target.getAttribute('data') === 'AltLeft' || event.target.getAttribute('data') === 'AltRight' || event.target.getAttribute('data') === 'ControlRight' || event.target.getAttribute('id') === 'keyboard') {
    return textarea.textContent;
  } else if (event.target.getAttribute('data') === 'CapsLock') {
    capsKeys();
  } else if (event.target.getAttribute('data') === 'Enter') {
    textarea.textContent = `${textarea.textContent.substring(0, cursorPosition)}\n${textarea.textContent.substring(cursorPosition)}`;
    cursorPosition += 1;
  } else if (event.target.getAttribute('data') === 'Tab') {
    textarea.textContent = `${textarea.textContent.substring(0, cursorPosition)}\t${textarea.textContent.substring(cursorPosition)}`;
    cursorPosition += 1;
  } else if (event.target.getAttribute('data') === 'Delete') {
    const startSel = textarea.textContent.substring(0, textarea.selectionStart);
    const endSel = textarea.textContent.substring(textarea.selectionEnd + 1);
    textarea.textContent = startSel + endSel;
  } else {
    const startCursorPos = textarea.textContent.substring(0, cursorPosition);
    const currentCursorPos = textarea.textContent.substring(cursorPosition);
    textarea.textContent = startCursorPos + event.target.textContent + currentCursorPos;
    cursorPosition += 1;
  }
  return updateTextarea();
}

keys.forEach((key) => key.addEventListener('mousedown', addActiveOnClick));

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
    } else if (!isCaps) {
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

function unshiftKeys(event) {
  keys = document.querySelectorAll('.key');
  if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
    if (language === 'en') {
      if (isCaps) {
        keys.forEach((key) => {
          key.innerHTML = KEYBOARD[key.getAttribute('data')].EN;
        });
      } else {
        keys.forEach((key) => {
          key.innerHTML = KEYBOARD[key.getAttribute('data')].en;
        });
      }
    } else if (isCaps) {
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

textarea.addEventListener('click', () => {
  cursorPosition = textarea.selectionStart;
});

keys.forEach((key) => key.addEventListener('mousedown', addActiveOnClick));
keys.forEach((key) => key.addEventListener('mouseup', removeActiveOnClick));

const KEYBOARD_BLOCK = document.getElementById('keyboard');
KEYBOARD_BLOCK.onmousedown = () => { writeTextByMouse(); };

document.onkeydown = (event) => {
  if (event.code in KEYBOARD) {
    const ACTIVE_KEY = document.querySelector(`.key[data='${event.code}']`);
    ACTIVE_KEY.classList.add('active');
    writeText(event);
    shiftKeys(event);
    changeLanguage(event);
  }
};
document.onkeyup = (event) => {
  if (event.code in KEYBOARD) {
    const ACTIVE_KEY = document.querySelector(`.key[data='${event.code}']`);
    ACTIVE_KEY.classList.remove('active');
    unshiftKeys(event);
  }
};
