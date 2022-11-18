const gameBoard = (function() {
  let board = ['_', '_', '_', '_', '_', '_', '_', '_', '_']

  function _arrayEquals(a, b) {
    return a.every((val, index) => val === b[index])
  }

  function _winCheck(symbol) {
    let winStatus = false

    const winConditions = [[board[0], board[1], board[2]], [board[3], board[4], board[5]], 
    [board[6], board[7], board[8]], [board[0], board[3], board[6]],
    [board[1], board[4], board[7]], [board[2], board[5], board[8]],
    [board[0], board[4], board[8]], [board[2], board[4], board[6]] ]
    winConditions.forEach((element) => {
      if (_arrayEquals(element, [symbol, symbol, symbol])) {
        winStatus = true
      }
    }) 

    return winStatus
  }

  function _tieCheck() {
    let tieStatus = true

    board.forEach((element) => {
      if (element === '_') tieStatus = false
    })

    return tieStatus
  }

  function validMoveCheck(space) {
    if (space.innerHTML === '_') return true
    return false
  } 

  function gameStatusCheck(symbol) {
    if (_winCheck(symbol)) {
      return "win"
    }

    if (_tieCheck()) {
      return "tie"
    }
  }

  return {
    board,
    validMoveCheck,
    gameStatusCheck
  }
})()

const players = (symbol) => {
  let name

  function placeSymbol(index) {
    gameBoard.board[index] = symbol
    displayController.render()
  }

  return {
    symbol,
    name,
    placeSymbol
  }
}

const game = (function() {
  let playerOne = players('X')
  let playerTwo = players('O')
  let gameStatus
  let activePlayer = playerOne

  //cache DOM
  let $spaces = document.querySelectorAll('.space')

  //bind events

  function _bindSpaces() {
    $spaces.forEach((element, index) => {
      element.addEventListener('click', () => {
        if (gameBoard.validMoveCheck(element)) _game(index)
      })
    })
  }

  function start_game() {
    _bindSpaces()
  }
  
  function _game(index) {
    if (gameStatus === 'win' || gameStatus === 'tie') return

    activePlayer.placeSymbol(index)
    gameStatus = gameBoard.gameStatusCheck(activePlayer.symbol)
    if (gameStatus === 'win') {
      displayController.displayResults(gameStatus, activePlayer)
    } else if (gameStatus === 'tie') {
      displayController.displayResults(gameStatus)
    }
    activePlayer != playerOne ? activePlayer = playerOne : activePlayer = playerTwo
  }

  return {
    playerOne,
    playerTwo,
    start_game
  }

})()

const displayController = (function() {
  //cache DOM
  let $spaces = document.querySelectorAll('.space')
  let $display = document.querySelector('.display')
  let $startButton = document.querySelector('.start')
  let $modal = document.querySelector('.modal')
  let $overlay = document.querySelector('.overlay')
  let $modalSubmitButton = document.querySelector('.submit')
  let $playerOneName = document.querySelector('#player-one-name')
  let $playerTwoName = document.querySelector('#player-two-name')


  //bind events
  $startButton.addEventListener('click', _displayModal)
  $overlay.addEventListener('click', _hideModal)
  $modalSubmitButton.addEventListener('click', _submitPlayerNames)

  function _submitPlayerNames() {
    game.playerOne.name = $playerOneName.value
    game.playerTwo.name = $playerTwoName.value
    _resetInputFields()
    _hideModal()
    game.start_game()
  }

  function _resetInputFields() {
    $playerOneName.value = ''
    $playerTwoName.value = ''
  }

  function _displayModal() {
    $modal.classList.add('active')
    $overlay.classList.add('active')
  }

  function _hideModal() {
    $modal.classList.remove('active')
    $overlay.classList.remove('active')
  }

  function render() {
    $spaces.forEach((element, index) => {
      element.innerHTML = gameBoard.board[index]
    })
  }

  function displayResults(result, activePlayer = undefined) {
    if (result === 'tie') {
      $display.innerHTML = "It's a tie!"
      return
    } 

    if (activePlayer.symbol === 'X') {
      $display.innerHTML = "Player One Wins!"
    } else {
      $display.innerHTML = "Player Two Wins!"
    }
  }

  render()

  return {
    render,
    displayResults
  }
})()