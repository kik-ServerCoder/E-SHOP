import express, { Request, Response } from 'express';
import { verifyToken } from '../middleware/verification';
import {checkBlacklist} from '../middleware/blocklist'
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { CustomRequest } from '../custom';


const prisma = new PrismaClient();

const router = express.Router();


router.post('/addaccountant', verifyToken, checkBlacklist, async (req: Request, res: Response) => {
  try {
    const {
      name, email, pass, username
    } = req.body;

    if (!name || !email || !pass || !username) {
      return res.status(400).json({ errors: ['Product name, product password, and product units are required fields'] });
    }

   
    const hashedPassword = await bcrypt.hash(pass, 10);

    const newAccountant = await prisma.accountant.create({
      data: {
        name, email, pass:hashedPassword, username,
      },
    });

    res.status(201).json({ message: 'Added new Accountant.', identity: newAccountant.name });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});





router.patch('/editaccountant', verifyToken, checkBlacklist, async (req: CustomRequest, res: Response) => {
  try {
    const accountantidnumber: number | undefined = req.userId;
    const { email, name } = req.body;
    console.log(accountantidnumber);

    if (!email || !name ) {
      return res.status(400).json({ errors: ['Email, name, and password are required fields'] });
    }
    

    const isAccountantOwner = await prisma.accountant.findFirst({
      where: {
        acct_ID: accountantidnumber,
      },
    });

    if (!isAccountantOwner) {
      return res.status(403).json({ error: 'Permission denied. You are not the owner of this account.' });
    }
    const updatedAccountant = await prisma.accountant.update({
      where: {
        acct_ID: accountantidnumber,
      },
      data: {
        email,
        name
      },
    });

    res.status(201).json({
      message: 'Updated Accountant with Id: ' + updatedAccountant.acct_ID,
      identity: updatedAccountant.username,
    });
  } catch (error) {
    console.error('Error updating Accountant:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.delete('/deleteaccountant', verifyToken, checkBlacklist, async (req: CustomRequest, res: Response) => {
  try {
   
    const accountantId: number | undefined = req.userId;

    if (!accountantId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const AccountantOwner = await prisma.accountant.findFirst({
      where: {
        acct_ID: accountantId,
      },
    });

    if (!AccountantOwner) {
      return res.status(403).json({ error: 'Permission denied. You do not have credentials.' });
    }

    
    await prisma.accountant.delete({
      where: {
        acct_ID: accountantId,
      },
    });

    res.status(200).json({ message: 'Accountant deleted successfully',identity:AccountantOwner.name } );
  } catch (error) {
    console.error('Error deleting Accountant:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

   






router.get('/getallaccountantlists',verifyToken,checkBlacklist, async (req, res) => {
    try {
      const products = await prisma.accountant.findMany();
      res.json(products);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  




export default router;