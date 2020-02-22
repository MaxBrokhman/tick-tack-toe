const gameCells = document.querySelectorAll('.game-cell')
const gameFiled = document.querySelector('.play-field')

const gameState = []

const player1 = 'X'

const player2 = '0'

let currentPlayer = player1

const isPlayer1 = () => currentPlayer === player1

const togglePlayer = () => currentPlayer = isPlayer1() 
  ? player2 
  : player1

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

const setGameField = (idx, player) => {
  gameState[idx] = player
}

const isWinner = () => {
  for(let cond of winningConditions){
    const [a, b, c] = cond
    const isValuePresented = currentPlayer === gameState[a]
    const isAllEqual = gameState[a] === gameState[b] && gameState[b] === gameState[c]
    if(isValuePresented && isAllEqual) return true
  }
  return false
}

const isDraw = () => {
  if(gameState.length !== 9) return false
  for (let value of gameState){
    if(!value) return false
  }
  return true
}

const gameFieldClickHandler = (evt) => {
  const { target } = evt
  const idx = target.dataset.cellIdx
  if(idx !== undefined && !target.textContent.length){
    setGameField(parseInt(idx), currentPlayer)
    target.textContent = currentPlayer
    if(isWinner()){
      console.log('Winner! ', currentPlayer)
      return
    }
    if(isDraw()) {
      console.log('Draw! ')
      return
    }
    togglePlayer()
  }
}

gameFiled.addEventListener('click', gameFieldClickHandler)

