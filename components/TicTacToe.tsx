import Ably from "ably/promises"
import { useEffect, useState } from "react"
import { winningCombinations } from "../const/maps"

const ably = new Ably.Realtime.Promise({ authUrl: "/api/createTokenRequest" })
const channel = ably.channels.get("tic-tac-toe")

export default function TicTacToe() {
  const [board, setBoard] = useState<Board[]>(initialBoard)
  const [isPlayerOneTurn, setPlayerOneTurn] = useState<boolean>(true)
  const [gameOver, setGameOver] = useState<boolean>(false)

  useEffect(() => {
    channel.publish("tic-tac-toe", { board, isPlayerOneTurn, gameOver })
    channel.subscribe("tic-tac-toe", (msg) => {
      console.log(`subscription triggered`, msg)
      if (!msg?.data) return null
      const { board, isPlayerOneTurn, gameOver } = msg.data
      setBoard(board)
      setPlayerOneTurn(isPlayerOneTurn)
      setGameOver(gameOver)
    })
    return () => channel.unsubscribe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function handleClick(index: number) {
    const newBoard = [...board]
    if (newBoard[index].state !== "") return null
    newBoard[index].state = isPlayerOneTurn ? "x" : "o"

    const newPlayerOneTurn = !isPlayerOneTurn
    // setPlayerOneTurn(newPlayerOneTurn)

    const newGameOver = checkWinner(newBoard)
    console.log({ newGameOver })
    // setGameOver(newGameOver)

    await channel.publish("tic-tac-toe", {
      board,
      isPlayerOneTurn: newPlayerOneTurn,
      gameOver: newGameOver,
    })
  }

  async function handleRestart() {
    const newBoard: Board[] = [
      { state: "" },
      { state: "" },
      { state: "" },
      { state: "" },
      { state: "" },
      { state: "" },
      { state: "" },
      { state: "" },
      { state: "" },
    ]

    // setPlayerOneTurn(newPlayerOneTurn)

    // setGameOver(newGameOver)
    // setBoard(newBoard)
    await channel.publish("tic-tac-toe", {
      board: newBoard,
      isPlayerOneTurn: true,
      gameOver: false,
    })
  }

  function checkWinner(board: Board[]): boolean {
    return winningCombinations.some((combination) => {
      const [a, b, c] = combination
      if (board[a].state === "" || board[b].state === "" || board[c].state === "") return false
      return (
        board[a].state && board[a].state === board[b].state && board[a].state === board[c].state
      )
    })
  }

  const textColor = gameOver ? "text-red-200" : "text-red-500"
  const tttButtonStyle = `w-full aspect-square border-black border-[1px] text-9xl pb-8 ${textColor}`
  const buttonStyle = `py-2 px-4 border-2 rounded border-gray-300 text-gray-600 hover:border-gray-400 font-bold`

  if (!!gameOver) channel.unsubscribe("tic-tac-toe")
  return (
    <div className="p-4">
      <h1 className="text-4xl text-center">Tic Tac Toe</h1>
      <div className="grid max-w-2xl grid-cols-3 p-20 pt-12 mx-auto">
        {board.map(({ state }, index) => (
          <button
            className={tttButtonStyle}
            key={index}
            onClick={() => handleClick(index)}
            disabled={gameOver}
          >
            {state}
          </button>
        ))}
      </div>
      {
        <div className="text-center">
          <h2 className="w-full pt-4 text-2xl">
            Game Over - {isPlayerOneTurn ? "O" : "X"} is the winner!
          </h2>
          <br />
          <button className={buttonStyle} onClick={() => handleRestart()}>
            Restart
          </button>
        </div>
      }
    </div>
  )
}

type StateType = "" | "x" | "o"
export interface Board {
  state: StateType
}
const initialBoard: Board[] = [
  { state: "" },
  { state: "" },
  { state: "" },
  { state: "" },
  { state: "" },
  { state: "" },
  { state: "" },
  { state: "" },
  { state: "" },
]
