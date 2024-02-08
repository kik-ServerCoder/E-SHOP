import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { verifyToken } from './verification';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();



const router = express.Router();

 //accountant api

 router.post('/register', async (req: Request, res: Response) => {
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
  
      const user = await prisma.accountant.findUnique({ where: { username } });
  
      if (!user || !(await bcrypt.compare(pass, user.pass))) {
        return res.status(401).json({ message: 'error in username/password' });
      }
  
      const token = jwt.sign({ id: user.acct_ID, username: user.username }, process.env.JWT_SECRET!, {
        expiresIn: '1h',
      });
      res.status(201).json({ message: 'Welcome Sir :', identity: user.username});
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error.' });
    }
  });

  


  router.post('/forgot-password', async (req: Request, res: Response) => {
    const { username } = req.body;
  
    try {
      const user = await prisma.accountant.findUnique({
        where: { username },
      });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
      const resetToken = jwt.sign({ userId: user.acct_ID }, process.env.JWT_SECRET!, {
        expiresIn: '1h',
      });
      await prisma.passwordResetToken.create({
        data: {
          token: resetToken,
          expiresAt: new Date(Date.now() + 3600000),
          accountantId : user.acct_ID,
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
        where: { acct_ID: resetToken. accountantId  },
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
router.get('/getallaccountantlists',verifyToken, async (req, res) => {
    try {
      const products = await prisma.accountant.findMany();
      res.json(products);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  


  //product api
router.get('/getallproductlists', async (req, res) => {
    try {
      const products = await prisma.product.findMany();
      res.json(products);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });


  export default router;