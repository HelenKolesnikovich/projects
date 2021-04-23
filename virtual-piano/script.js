const bookmarkButtons = document.querySelectorAll('.btn');
const piano = document.querySelector('.piano');
const keysCollection = document.querySelectorAll('.piano-key');
const keyTitlesCollection = document.querySelectorAll('.title-key');

/* switch for Notes/Letters buttons */
function displayActiveButton(event) {
  bookmarkButtons.forEach((btn) => {
    if(btn.classList.contains('btn-active'))
    {
      btn.classList.remove('btn-active');
    }
  });

event.target.classList.add('btn-active');
event.target.classList.contains('btn-notes') ? displayKeyNoteTitles() : displayKeyLetterTitles();
}
function displayKeyNoteTitles() {
  for(let i = 0; i < keyTitlesCollection.length; i++)
  {
    if(keysCollection[i].dataset.note)
    {
      keyTitlesCollection[i].innerHTML = keysCollection[i].dataset.note;
    }
  }
}
function displayKeyLetterTitles() {
  for(let i = 0; i < keyTitlesCollection.length; i++)
  {
    if(keysCollection[i].dataset.letter)
    {
      keyTitlesCollection[i].innerHTML = keysCollection[i].dataset.letter;
    }      
  }
}

/* switch piano keys in active state */
function displayActiveKeyState(key) {
  key.children[0].classList.add('title-key-active');
  key.classList.add('piano-key-active');
  const keyNote = key.dataset.note;
  const soundSrc = `assets/audio/${keyNote}.mp3`;
  playSound(soundSrc);
}

function removeActiveKeyState(event) {
  if(event.propertyName !== 'transform')
  {
    return;
  }
  event.target.classList.remove('piano-key-active');
  keyTitlesCollection.forEach((titleKey) => {
    titleKey.classList.remove('title-key-active');
  });
}

/* play on the piano through virtual keys */
function playThroughVirtualKeys(event) {
  if(event.which == 1)
  {
    displayActiveKeyState(event.target);
  }  
}

/* play on the piano with moving mouse */
function playThroughMovingMouse(event) {
  if(event.which == 1)
  {
    displayActiveKeyState(event.target);
    piano.addEventListener('mouseover', playThroughMovingMouse);
  }
}

function stopPlayThroughMovingMouse() {
  piano.removeEventListener('mouseover', playThroughMovingMouse);
}


/* play on the piano through keyboard */
function playThroughKeyboard(event) {
  const pressedCodeKey = event.code;
  const pressedKey = pressedCodeKey.slice(3);
  keysCollection.forEach((key) => {
    if(key.dataset.letter === pressedKey)
    {
      displayActiveKeyState(key);
    }
  });
}

/* audio playing */
function playSound(soundSrc) {
  const audio = new Audio();
  audio.src = soundSrc;
  audio.currentTime = 0;
  audio.play();
}

/* obj.addEventListener() */
bookmarkButtons.forEach((button) => button.addEventListener('click', displayActiveButton));
piano.addEventListener('mousedown', playThroughVirtualKeys);
keysCollection.forEach((key) => key.addEventListener('transitionend', removeActiveKeyState));
window.addEventListener('keydown', playThroughKeyboard);
piano.addEventListener('mousedown', playThroughMovingMouse);
piano.addEventListener('mouseup', stopPlayThroughMovingMouse);

/* implement fullscreen version for piano */
const fullscreenButton = document.querySelector('.fullscreen-button');
const fullscreenElement = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement;

function resizeScreen() {    
  if (!document.fullscreenElement) 
  {
    fullscreenButton.classList.add('fullscreen');
    activateFullscreen(document.documentElement);
  } 
  else 
  {
    fullscreenButton.classList.remove('fullscreen');
    deactivateFullscreen();
  }      
}

function activateFullscreen(element) {    
  if(element.requestFullscreen) 
  {
    element.requestFullscreen();        // W3C spec
  }
  else if(element.mozRequestFullScreen) 
  {
    element.mozRequestFullScreen();     // Firefox
  }
  else if(element.webkitRequestFullscreen) 
  {
    element.webkitRequestFullscreen();  // Safari
  }
  else if(element.msRequestFullscreen) 
  {
    element.msRequestFullscreen();      // IE/Edge
  }  
};

function deactivateFullscreen() {
  if(document.exitFullscreen) 
  {
    document.exitFullscreen();
  } 
  else if(document.mozCancelFullScreen) 
  {
    document.mozCancelFullScreen();
  } 
  else if(document.webkitExitFullscreen) 
  {
    document.webkitExitFullscreen();
  }   
};

function onFullScreenChange() {
  if (!document.fullscreenElement)
  {
    fullscreenButton.classList.remove('fullscreen');
  }
};

fullscreenButton.addEventListener('click', resizeScreen);
document.addEventListener('fullscreenchange', onFullScreenChange);
