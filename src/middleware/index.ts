import { get, merge } from 'lodash'
import { NextFunction, Request, Response } from 'express'

import { getUserBySessionToken } from "../db/users";

export const isOwner = (req: Request, res: Response, next: NextFunction) => {

  try {
    const id = get(req, 'user.id')
    const resourceOwnerId = get(req, 'params.id')
  
    if(!id) {
      return res.status(401).send('Unauthorized')
    }
  
    if(id !== resourceOwnerId) {
      return res.status(403).send('Forbidden')
    }
  
    return next()
  } catch (error) {
   console.log(error);
    return res.status(401).send('Unauthorized') 
  }
}

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction ) => {
  try {
    const sessionToken = get(req, 'cookies.sessionToken')
    if(!sessionToken) {
      return res.status(401).send('Unauthorized')
    }

    const user = await getUserBySessionToken(sessionToken)
    if(!user) {
      return res.status(401).send('Unauthorized')
    }
    merge(req, { user })
    return next()
  } catch (error) {
    console.log(error);
    return res.status(401).send('Unauthorized')
  }
}