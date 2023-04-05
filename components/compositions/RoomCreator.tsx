import Ably from "ably/promises"
import { nanoid } from "nanoid"
import { configureAbly } from "@ably-labs/react-hooks"
import { useState } from "react"

export function RoomCreator() {
  const [roomId, setRoomId] = useState("")

  function handleClick() {
    const roomId = nanoid()
    // https://github.com/ably-labs/ably-nextjs-fundamentals-kit/blob/main/pages/presence.tsx
    // const ably = (new Ably.Realtime.Promise() = configureAbly({
    //   authUrl: "/api/createTokenRequest",
    //   authMethod: "POST",
    //   roomId,
    // }))
  }

  return (
    <div className="mx-auto p-4 flex flex-col text-center space-y-4 max-w-xl">
      <h1 className="text-4xl text-center">Create a room</h1>
      <div className="space-x-2">
        <label htmlFor="name">Player name</label>
        <input className="border-2 rounded-md max-w-sm mx-auto" name="name" type="text" />
      </div>
      <span>
        <button
          className="py-1 px-4 border-2 rounded-lg border-gray-300 text-gray-600 hover:border-gray-400 font-semibold"
          onClick={() => handleClick()}
        >
          Create Room
        </button>
      </span>
    </div>
  )
}
