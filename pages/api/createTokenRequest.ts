import Ably from 'ably/promises'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = new Ably.Realtime(process.env.ABLY_API_KEY as string)
  const tokenRequestData = await client.auth.createTokenRequest({
    clientId: 'tic-tac-toe',
  })
  res.status(200).json(tokenRequestData)
}
