interface PlayerStatusesProps {
  handleClick: () => void
  opponentStatus: string
}

export function PlayerStatuses({ handleClick, opponentStatus }: PlayerStatusesProps) {
  return (
    <>
      <h1 className="text-4xl text-center">Click when ready</h1>
      <br />
      <div className="grid grid-cols-2 border-2">
        <button className="border-r-[1px]">Click to start</button>
        <div className="text-center m-12" onClick={() => handleClick()}>
          {opponentStatus}
        </div>
      </div>
    </>
  )
}
