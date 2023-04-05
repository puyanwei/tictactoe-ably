import { useEffect, useState } from "react"
import TicTacToe from "../components/compositions/TicTacToe"
import { PlayerStatuses } from "../components/compositions/PlayerStatuses"

function Game() {
  const [isOpponentReady, setOpponentIsReady] = useState(false)
  const [isHeroReady, setIsHeroReady] = useState(false)

  useEffect(() => {
    // const channel = ably.channels.get("game")
    // channel.subscribe("game", (msg) => {
    //   console.log(`subscription triggered`, msg)
    //   if (!msg?.data) return null
    //   const { OpponentStatus } = msg.data
    //   setOpponentStatus(OpponentStatus)
    setOpponentIsReady(true)
  }, [])

  function handleClick() {
    setIsHeroReady(true)
  }

  const opponentStatus = isOpponentReady ? "Opponent is ready" : "Opponent is not ready"
  const isGameReady = isOpponentReady && isHeroReady
  return (
    <div className="p-4">
      {isGameReady ? (
        <TicTacToe />
      ) : (
        <PlayerStatuses opponentStatus={opponentStatus} handleClick={handleClick} />
      )}
    </div>
  )
}

export default Game
