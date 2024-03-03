import { Request, Response } from 'express'

import { getUsers, deleteUserById, getUserById } from '../db/users'

export const getAllUsers = async (req:Request, res: Response) => {
  try {
    const users = await getUsers()
    return res.status(200).json(users).end()
  } catch (error) {
    console.log(error)
    return res.status(400).send('')
  }
}

export const deleteUser = async (req:Request, res: Response) => {
  try {
    const { id } = req.params
    const deleteUser = await deleteUserById(id)
    return res.status(200).json(deleteUser).end()
  } catch (error) {
    console.log(error)
    return res.status(400)
  }
}

export const updateUser = async (req:Request, res: Response) => {
  try {
    const { id } = req.params
    const { username } = req.body

    if (!username) {
      return res.status(400).send('Username is required')
    }

    const user = await getUserById(id)
    if (!user) {
      return res.status(404).send('User not found')
    }

    user.username = username
    await user.save()

    return res.status(200).json(user).end()
  } catch (error) {
    console.log(error)
    return res.status(400)
  }
}