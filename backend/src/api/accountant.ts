import express, { Request, Response } from 'express';
import { verifyToken } from '../middleware/verification';
import {checkBlacklist} from '../middleware/blocklist'
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { CustomRequest } from '../custom';
import { invalidatedTokens } from './registration';


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

router.get('/getaccountant', verifyToken, checkBlacklist, async (req: CustomRequest, res: Response) => {
  try {
    const accountantId: number | undefined = req.userId;

    if (!accountantId) {
      return res.status(401).json({ error: 'Unauthorized. User ID not found.' });
    }

    const accountant = await prisma.accountant.findUnique({
      where: {
        acct_ID: accountantId,
      },
    });

    if (!accountant) {
      return res.status(404).json({ error: 'Accountant not found' });
    }

    res.status(200).json(accountant);
  } catch (error) {
    console.error('Error getting Accountant by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.patch('/editaccountant', verifyToken, checkBlacklist, async (req: CustomRequest, res: Response) => {
  try {
    const accountantidnumber: number | undefined = req.userId;
    const { email, name,username } = req.body;
    

    if (!email || !name || !username ) {
      return res.status(400).json({ errors: ['Email, name, username and password are required fields'] });
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
        name,
        username
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

   
router.post('/changepass', verifyToken, checkBlacklist, async (req: CustomRequest, res: Response) => {
  try {
    const accountantidnumber: number | undefined = req.userId;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ errors: ['Current password and new password are required fields'] });
    }

   
    const AccountantOwner = await prisma.accountant.findUnique({
      where: {
        acct_ID: accountantidnumber,
      },
    });

    if (!AccountantOwner) {
      return res.status(404).json({ error: 'Accountant not found' });
    }

    
    const passcheck = await bcrypt.compare(currentPassword, AccountantOwner.pass);

    if (!passcheck) {
      return res.status(401).json({ error: ' current password did not matched with previous pass' });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    
    const updatedAccountant = await prisma.accountant.update({
      where: {
        acct_ID: accountantidnumber,
      },
      data: {
        pass: hashedNewPassword,
      },
    }
    
    )
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (token === undefined) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
  
    invalidatedTokens.add(token);;

    res.status(201).json({
      message: 'Password changed successfully for Accountant with Id: ' + updatedAccountant.acct_ID,
      identity: updatedAccountant.username,
    });
  } catch (error) {
    console.error('Error changing password:', error);
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