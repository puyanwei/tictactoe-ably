import Ably from 'ably/promises'
import { useEffect, useState } from 'react'
import { useChannel } from '../hooks/useChannel'

const ably = new Ably.Realtime.Promise({ authUrl: '/api/createTokenRequest' })
const channel = ably.channels.get('tic-tac-toe')

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

type StateType = '' | 'x' | 'o'
export interface Board {
  state: StateType
}
const initialBoard: Board[] = [
  { state: '' },
  { state: '' },
  { state: '' },
  { state: '' },
  { state: '' },
  { state: '' },
  { state: '' },
  { state: '' },
  { state: '' },
]

export default function TicTacToe() {
  const [board, setBoard] = useState<Board[]>(initialBoard)
  const [isPlayerOneTurn, setPlayerOneTurn] = useState<boolean>(true)
  const [gameOver, setGameOver] = useState<boolean>(false)

  useEffect(() => {
    channel.publish('tic-tac-toe', board)
    channel.subscribe('tic-tac-toe', (msg) => setBoard(board))
    return () => channel.unsubscribe()
  }, [])

  function handleClick(index: number) {
    const newBoard = [...board]
    if (newBoard[index].state !== '') return null
    newBoard[index].state = isPlayerOneTurn ? 'x' : 'o'
    ably.channels
      .get('tic-tac-toe')
      .publish({ name: 'tic-tac-toe', data: newBoard })
    setPlayerOneTurn(!isPlayerOneTurn)
    if (!!checkWinner(board)) {
      setGameOver(true)
      return null
    }
  }

  function checkWinner(board: Board[]): boolean {
    return winningCombinations.some((combination) => {
      const [a, b, c] = combination
      if (
        board[a].state === '' ||
        board[b].state === '' ||
        board[c].state === ''
      )
        return false
      return (
        board[a].state &&
        board[a].state === board[b].state &&
        board[a].state === board[c].state
      )
    })
  }

  const textColor = gameOver ? 'text-red-200' : 'text-red-500'
  const buttonStyle = `w-full aspect-square border-black border-[1px] text-9xl pb-8 ${textColor}`

  console.log('%cTicTacToe.tsx line:80 ably', 'color: #007acc;', ably)
  return (
    <div className='p-4'>
      <h1 className='text-4xl text-center'>Tic Tac Toe</h1>
      {gameOver && (
        <h2 className='pt-4 text-2xl text-center'>
          Game Over - {isPlayerOneTurn ? 'O' : 'X'} is the winner!
        </h2>
      )}
      <div className='grid grid-cols-3 p-20 pt-12 place-content-center'>
        {board.map(({ state }, index) => (
          <button
            className={buttonStyle}
            key={index}
            onClick={() => handleClick(index)}
            disabled={gameOver}
          >
            {state}
          </button>
        ))}
      </div>
    </div>
  )
}
