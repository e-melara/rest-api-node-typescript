import express from 'express';

import { authentication, random } from 'helpers';
import { createUser, getUserByEmail } from 'db/users';

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
    const user = await createUser({ 
      email, 
      username,
      authentication: authentication(salt, password), 
    });
    return res.status(201).json(user).end();
  } catch (error) {
    console.log(error);
    return res.status(400).send('');
  }
}