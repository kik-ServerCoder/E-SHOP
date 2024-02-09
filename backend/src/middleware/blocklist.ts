
import {invalidatedTokens} from '../api/registration'
import { Request, Response, NextFunction } from 'express';




export function checkBlacklist(req: Request, res: Response, next: NextFunction) {
  const userToken = req.header('Authorization')?.split(' ')[1];

  
  if (userToken === undefined || userToken === null) {
    return res.status(401).send('Token is blacklisted - user token is undefined/null');
  }

  if (invalidatedTokens.has(userToken)) {
    return res.status(401).send('Token is blacklisted - User already logged out');
  }

  next();
}

