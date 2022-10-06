import Ably from 'ably/promises'
import { useEffect } from 'react'
import messageCallback from 'ably'

const ably = new Ably.Realtime.Promise({ authUrl: '/api/createTokenRequest' })

export function useChannel(
  channelName: string,
  callback: (message: messageCallback.Types.Message) => void
) {
  const channel = ably.channels.get(channelName)

  const onMount = () => {
    channel.subscribe((message) => {
      callback(message)
    })
  }

  const onUnmount = () => {
    channel.unsubscribe()
  }

  const useEffectHook = () => {
    onMount()
    return () => {
      onUnmount()
    }
  }

  useEffect(useEffectHook)
  return [channel, ably]
}
