const gameBoard = (function() {
  let board = ['_', '_', '_', '_', '_', '_', '_', '_', '_',]

  //this module should check if the player selected space is valid
  //the function that checks if a space is valid should be private
  return {
    board
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
  let activePlayer = playerOne
  activePlayer.placeSymbol()

  function _game() {
    /*while (gameFinished === false) {
      playerOne.placeSymbol()
    }*/
    //while loop 
      //activePlayer = playerOne
      //playerOne.placeSymbol()
      //checks if it's a win through gameBoard module
      //activePlayer = playerTwo
      //playerTwo.placeSymbol()
      //checks if it's a win
    //end while loop
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