import express, { Request, Response } from 'express';
import { verifyToken } from '../middleware/verification';
import {checkBlacklist} from '../middleware/blocklist'
import { PrismaClient } from '@prisma/client';
import { CustomRequest } from '../custom';

const prisma = new PrismaClient();

const router = express.Router();









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