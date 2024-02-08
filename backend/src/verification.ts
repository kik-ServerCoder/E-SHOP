import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);;
    const user = decoded;
    console.log(user);
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token.' });
  }
};

export { verifyToken };