const gameBoard = (function() {
  let board = ['_', '_', '_', '_', '_', '_', '_', '_', '_',]

  //this module should check if the player selected space is valid
  //the function that checks if a space is valid should be private

  function validMoveCheck(space) {
    if (space === '_') return true
    return false
  }

  return {
    board,
    validMoveCheck
  }
})()

const players = (symbol) => {
  //cache DOM
  let $spaces = document.querySelectorAll('.space')

  //bind events


  function placeSymbol() {
    $spaces.forEach((element, index) => {
      element.addEventListener('click', function() {
        gameBoard.board[index] = symbol
        displayController.render()
      })
    })
  }

  return {
    placeSymbol
  }
}

const game = (function() {
  let playerOne = players('X')
  let playerTwo = players('O')
  let gameFinished = false
  let activePlayer

  //cache DOM
  let $spaces = document.querySelectorAll('.space')

  //bind events
  $spaces.forEach((element) => {
    element.addEventListener('click', function() {
      activePlayer === playerOne ? activePlayer = playerTwo : activePlayer = playerOne
      activePlayer.placeSymbol()
    })
  })

  function _game() {
    activePlayer = playerOne
    activePlayer.placeSymbol()
  }

  _game()
})()

const displayController = (function() {
  //cache DOM
  let $spaces = document.querySelectorAll('.space')

  //bind events
  /*$spaces.forEach((element, index) => {
    element.addEventListener('click', function() {
      gameBoard.board[index] = 'X'
      _render()
    })
  })*/

  function render() {
    $spaces.forEach((element, index) => {
      element.innerHTML = gameBoard.board[index]
    })
  }

  render()

  return {
    render
  }
})()