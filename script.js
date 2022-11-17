const gameBoard = (function() {
  let board = ['_', '_', '_', '_', '_', '_', '_', '_', '_'] //['0', '1', '2', '3', '4', '5', '6', '7', '8']

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
    //Check if it's a win first
    if (_winCheck(symbol)) {
      return "win"
    }
    //If not a win and board is full, it is a tie
    if (_tieCheck()) {
      return "tie"
    }
    //otherwise, the game goes on. return false
  }

  return {
    board,
    validMoveCheck,
    gameStatusCheck
  }
})()

const players = (symbol) => {
  //cache DOM

  //bind events


  function placeSymbol(index) {
    gameBoard.board[index] = symbol
    displayController.render()
  }

  return {
    symbol,
    placeSymbol
  }
}

const game = (function() {
  let playerOne = players('X')
  let playerTwo = players('O')
  let gameStatus
  let activePlayer

  //cache DOM
  let $spaces = document.querySelectorAll('.space')

  //bind events
  $spaces.forEach((element, index) => {
    element.addEventListener('click', () => {
      if (gameBoard.validMoveCheck(element)) _game(index)
    })
  })
  
  function _game(index) {
    if (gameStatus === 'win' || gameStatus === 'tie') return
    
    activePlayer != playerOne ? activePlayer = playerOne : activePlayer = playerTwo
    activePlayer.placeSymbol(index)
    gameStatus = gameBoard.gameStatusCheck(activePlayer.symbol)
    if (gameStatus === 'win') {
      activePlayer === playerOne ? console.log("Player One Wins!") : console.log("Player Two Wins!")
    } else if (gameStatus === 'tie') {
      console.log("Tie!")
    }
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