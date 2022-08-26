var state = { board: [], 
  currentGame: [], savedGames: [] };

function start() {
  readLocalStorage();
  createBoard();
  newGame();
}

function readLocalStorage() {
  if (!window.localStorage) {
    return;
  }

  var savedGamesFromLocalStorage = window.localStorage.getItem('saved-games');

  if (savedGamesFromLocalStorage) {
    state.savedGames = JSON.parse(savedGamesFromLocalStorage);
  }
}

function writeToLocalStorage() {
  window.localStorage.setItem('saved-games', JSON.stringify(state.savedGames));
}
function cleanToLocalStorage() {
  window.localStorage.clear();
}

function createBoard() {
  state.board = [];

  for (var i = 1; i <= 60; i++) {
    state.board.push(i);
  }
}

function newGame() {
  resetGame();
  render();
}

function render() {
  renderBoard();
  renderButtons();
  renderSavedGames();
}

function renderBoard() {
  var divBoard = document.querySelector('#megasena-board');
  divBoard.innerHTML = '';

  var ulNumbers = document.createElement('ul');
  ulNumbers.classList.add('numbers');

  for (var i = 0; i < state.board.length; i++) {
    var currentNumber = state.board[i];

    var liNumber = document.createElement('li');
    liNumber.textContent = currentNumber;
    liNumber.classList.add('number');

    liNumber.addEventListener('click', handleNumberClick);

    if (isNumberInGame(currentNumber)) {
      liNumber.classList.add('selected-number');
    }

    ulNumbers.appendChild(liNumber);
  }

  divBoard.appendChild(ulNumbers);
}

function handleNumberClick(event) {
  var value = Number(event.currentTarget.textContent);

  if (isNumberInGame(value)) {
    removeNumberFromGame(value);
  } else {
    addNumberToGame(value);
  }

  render();
}

function renderButtons() {
  var divButtons = document.querySelector('#megasena-buttons');
  divButtons.innerHTML = '';

  var buttonNewGame = createNewGameButton();
  var buttonRandomGame = createRandomGameButton();
  var buttonSavedGame = createSaveGameButton();
  var buttonClearGame = clearSaveGameButton();

  divButtons.appendChild(buttonNewGame);
  divButtons.appendChild(buttonRandomGame);
  divButtons.appendChild(buttonSavedGame);
  divButtons.appendChild(buttonClearGame);
}


function clearSaveGameButton() {
  var button  = document.createElement('buttonDelete');
  button.textContent = 'Apagar jogos salvo';
  

  
  button.disabled = blockButtonResetGame();

  if (state.savedGames.length === 0) {
    button.classList.add("seletor-cursor")
    } else { button.classList.add("seletor-cursor1")
    }

if (state.savedGames.length === 0) {
  button.disable = blockButtonResetGame()}
    else if (state.savedGames.length >= 1) {
      button.addEventListener('click', clearGameStorage)
    }



    if (state.savedGames.length === 0) {
      button.classList.add("buttonDelete")
    } else {button.classList.add("buttonDelete:active")}


  return button;
}



function blockButtonResetGame() {
  return state.savedGames.length === 0;

}

function createRandomGameButton() {
  var button = document.createElement('button');
  button.textContent = 'Jogo aleatório';

  button.addEventListener('click', randomGame);

  return button;
}

function renderSavedGames() {
  var divSavedGames = document.querySelector('#megasena-saved-games');
  divSavedGames.innerHTML = '';

  if (state.savedGames.length === 0) {
    divSavedGames.innerHTML = '<p class="nenhumJogo"> Nenhum jogo salvo </p>';
    divSavedGames.classList.add('savedGame');
  } else {
    var ulSavedGames = document.createElement('ul');
    ulSavedGames.classList.add('savedGame');

    for (var i = 0; i < state.savedGames.length; i++) {
      var currentGame = state.savedGames[i];

      var liGame = document.createElement('li');
      liGame.textContent = currentGame.sort((a, b) => a - b).join(' ');

      ulSavedGames.appendChild(liGame);
    }

    divSavedGames.appendChild(ulSavedGames)
  }

}




function createNewGameButton() {
  var button = document.createElement('button');
  button.textContent = 'Novo Jogo';

  button.addEventListener('click', newGame);

  return button;
}

function createSaveGameButton() {
  var button = document.createElement('buttonSaved');
  button.textContent = 'Salvar jogo';
  button.disabled = !isGameComplete();

  if(state.currentGame.length < 6 ) {
    button.classList.add("seletor-cursor")
  } else if (state.currentGame.length === 6) {
    button.classList.add("seletor-cursor1");
    button.classList.add("active")
    }

  button.addEventListener('click', saveGame);

  return button;
}

function addNumberToGame(numberToAdd) {
  if (numberToAdd < 1 || numberToAdd > 60) {
    console.error('Número inválido', numberToAdd);
    return;
  }

  if (state.currentGame.length >= 6) {
    console.error('O jogo já está completo.');
    return;
  }

  if (isNumberInGame(numberToAdd)) {
    console.error('Este número já está no jogo.', numberToAdd);
    return;
  }

  state.currentGame.push(numberToAdd);
}

function removeNumberFromGame(numberToRemove) {
  if (numberToRemove < 1 || numberToRemove > 60) {
    console.error('Número inválido', numberToRemove);
    return;
  }
  var newGame = [];

  for (var i = 0; i < state.currentGame.length; i++) {
    var currentNumber = state.currentGame[i];

    if (currentNumber === numberToRemove) {
      continue;
    }
    newGame.push(currentNumber);
  }
  state.currentGame = newGame;
}

function isNumberInGame(numberToCheck) {
  return state.currentGame.includes(numberToCheck);
}

function saveGame() {
  if (!isGameComplete()) {
    console.error('O jogo não está completo!');
    return;
  }

  state.savedGames.push(state.currentGame);
  writeToLocalStorage();
  newGame();
}

function clearGameStorage() {
  cleanToLocalStorage();
  location. reload()
}

function isGameComplete() {
  return state.currentGame.length === 6;
}

function resetGame() {
  state.currentGame = [];
}

function randomGame() {
  resetGame();

  while (!isGameComplete()) {
    var randomNumber = Math.ceil(Math.random() * 60);
    addNumberToGame(randomNumber);
  }

  render();
}

start();
