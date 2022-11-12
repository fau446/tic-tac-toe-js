const gameBoard = (function () {
  let board = [1, 2, 3, 4, 5, 6, 7, 8, 9]

  return {
    board
  }
})()

const displayController = (function () {
  //cache DOM
  let $board = document.querySelector('.board')
  let $spaces = document.querySelectorAll('.space')

  //bind events

  function _render() {
    $spaces.forEach((element, index) => {
      if (gameBoard.board[index] === 'X' || gameBoard.board[index] === 'O') {
        element.innerHTML = gameBoard.board[index]
      } else {
        element.innerHTML = '_'
      }
    })
  }

  _render()
})()