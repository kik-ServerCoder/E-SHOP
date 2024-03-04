import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { verifyToken } from '../middleware/verification';
import {checkBlacklist} from '../middleware/blocklist';
 
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();



const router = express.Router();


 router.post('/signup', async (req: Request, res: Response) => {
  try {
    const { name, email, pass, username } = req.body;

    if (!name || !email || !pass || !username) {
      return res.status(400).json({ errors: ['Email, name, password, and username are required fields'] });
    }

    const hashedPassword = await bcrypt.hash(pass, 10);

    const newUser = await prisma.accountant.create({
      data: {
        email,
        name,
        pass: hashedPassword,
        username,
      },
    });

    res.status(201).json({ message: 'Welcome : ', identity: newUser.name });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});




  router.post('/login', async (req: Request, res: Response) => {
    try {
      const { username, pass } = req.body;
  
      const accountant = await prisma.accountant.findUnique({ where: { username }, select: {
        acct_ID:true , username:true , pass: true, email:true, name:true 
      } });
      
  
      if (!accountant ) {
        return res.status(401).json({ message: 'user not found' });
      }
      if (!accountant || !(await bcrypt.compare(pass, accountant.pass))) {
        return res.status(401).json({ message: ' password did not match' });
      }
  
      const token = jwt.sign({ acct_ID: accountant.acct_ID, username: accountant.username }, process.env.JWT_SECRET!, {
        expiresIn: '2h',
      }); 

      const user = {...accountant, pass: undefined};

      res.status(200).json({ message: 'Welcome : '+ accountant.name, identity: token, userdata:user});
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error.' });
    }
  });


 
  export const invalidatedTokens = new Set<string>();
  
  router.post('/logout',  checkBlacklist,verifyToken, (req, res) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (token === undefined) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
  
    invalidatedTokens.add(token);
  
    res.status(200).send('Logged out successfully');
  });





  router.post('/forgot-password', async (req: Request, res: Response) => {
    const { username } = req.body;
  
    try {
      const accountant = await prisma.accountant.findUnique({
        where: { username },
      });
  
      if (!accountant) {
        return res.status(404).json({ message: 'accountant not found.' });
      }
      const resetToken = jwt.sign({ username: accountant.username }, process.env.JWT_SECRET!, {
        expiresIn: '2h',
      });
      await prisma.passwordResetToken.create({
        data: {
          token: resetToken,
          expiresAt: new Date(Date.now() + 3600000),
          username : accountant.username,
        },
      });
      res.json({ message: 'Password reset initiated. here is your token to reset password.', resetToken });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error.' });
    }
  });






  router.post('/reset-password/:token', async (req: Request, res: Response) => {
    const { token } = req.params;
    const { newPassword } = req.body;
  
    try {
      const resetToken = await prisma.passwordResetToken.findUnique({
        where: { token },
      });
  
      if (!resetToken || resetToken.expiresAt < new Date()) {
        return res.status(400).json({ message: 'Invalid or expired token.' });
      }
  
      
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await prisma.accountant.update({
        where: { username :resetToken.username?.toString()  },
        data: { pass: hashedPassword },
      });
      try{await prisma.passwordResetToken.delete({
        where: { token },
      });}catch(error){
        res.status(400).json({message: 'Token Expired'})
      }
      
  
      res.json({ message: 'Password reset successful.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error.' });
    }
  });





  export default router;