
import { Response, NextFunction } from 'express';
import { CustomRequest } from '../custom'; 
import { DecodedAccountant } from '../types'; 
import jwt, { JwtPayload } from 'jsonwebtoken';

const verifyToken = (req: CustomRequest, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    
   
    const decodedAccountant: DecodedAccountant = {
      acct_ID: decoded.acct_ID as string,
      
    };
    console.log('Decoded JWT:', decoded);
    req.decodedUser = decodedAccountant; 

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Access Denied from verifications' });
  }
};

export { verifyToken };
