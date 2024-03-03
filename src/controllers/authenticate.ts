import express from 'express';

import { authentication, random } from '../helpers';
import { createUser, getUserByEmail } from '../db/users';

export const register = async (req: express.Request, res: express.Response) => {

  try {
    const { username, password, email } = req.body;
    
    if (!username || !password || !email) {
      return res.status(400).send('Invalid input');
    }
  
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(400).send('User already exists');
    }

    const salt = random();
    const authenticationToken = authentication(salt, password);
    const user = await createUser({ 
      email, 
      username,
      authentication: {
        salt,
        password: authenticationToken,
      }, 
    });
    return res.status(201).json(user).end();
  } catch (error) {
    console.log(error);
    return res.status(400).send('');
  }
}

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).send('Invalid input')
    }
    const user = await getUserByEmail(email).select('+authentication.password +authentication.salt')
    if (!user) {
      return res.status(400).send('User not found')
    }
    
    const authenticationToken = authentication(user.authentication.salt, password)
    if (authenticationToken !== user.authentication.password) {
      return res.status(400).send('Invalid password')
    }
    
    const salt = random()
    user.authentication.sessionToken = authentication(salt, user._id.toString())
    await user.save()

    res.cookie('sessionToken', user.authentication.sessionToken, {
      domain: 'localhost',
      path: '/',
    })
    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.status(400).send('');
  }
}