const gameBoard = (function() {
  let board = ['_', '_', '_', '_', '_', '_', '_', '_', '_',]

  

  function validMoveCheck(space) {
    if (space.innerHTML === '_') return true
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


  function placeSymbol(index) {
    gameBoard.board[index] = symbol
    displayController.render()
  }

  return {
    placeSymbol
  }
}

const game = (function() {
  let playerOne = players('X')
  let playerTwo = players('O')
  //let gameFinished = false
  let activePlayer

  //cache DOM
  let $spaces = document.querySelectorAll('.space')

  //bind events
  $spaces.forEach((element, index) => {
    element.addEventListener('click', function() {
      console.log(gameBoard.validMoveCheck(element))
      if (gameBoard.validMoveCheck(element)) {
        _game(index)
      }
    })
  })

  function _game(index) {
    activePlayer != playerOne ? activePlayer = playerOne : activePlayer = playerTwo
    activePlayer.placeSymbol(index)
  }


})()

const displayController = (function() {
  //cache DOM
  let $spaces = document.querySelectorAll('.space')

  //bind events

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