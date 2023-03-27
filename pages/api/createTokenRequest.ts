import Ably from "ably/promises"
import { NextApiRequest, NextApiResponse } from "next"
import { nanoid } from "nanoid"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const apiKey = process.env.ABLY_API_KEY
  if (!apiKey) throw new Error("Missing ABLY_API_KEY env var")
  const id = nanoid()
  const client = new Ably.Realtime(apiKey)
  const tokenRequestData = await client.auth.createTokenRequest({
    clientId: id,
  })
  res.status(200).json(tokenRequestData)
}
