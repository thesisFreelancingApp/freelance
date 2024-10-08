import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prismaClient'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const users = await prisma.user.findMany()
      res.status(200).json(users)
    } catch (error) {
      res.status(500).json({ error: 'Error fetching users' })
    }
  } else if (req.method === 'POST') {
    try {
      const user = await prisma.user.create({
        data: req.body,
      })
      res.status(201).json(user)
    } catch (error) {
      res.status(500).json({ error: 'Error creating user' })
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}