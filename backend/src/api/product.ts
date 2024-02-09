import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { verifyToken } from '../middleware/verification';

import { PrismaClient } from '@prisma/client';
import { CustomRequest } from '../custom';
import { checkBlacklist } from '../middleware/blocklist';
const prisma = new PrismaClient();

const router = express.Router();

router.post('/addproduct', verifyToken, checkBlacklist, async (req: CustomRequest, res: Response) => {
  try {
    const {
      prod_name,
      prod_price,
      prod_sku,
      prod_sellprice,
      prod_buyprice,
      prod_totalSP,
      prod_totalBP,
      prod_totalPrice,
    } = req.body;

    if (!prod_name || !prod_price || !prod_sku) {
      return res.status(400).json({ errors: ['Product name, product password, and product units are required fields'] });
    }

    const accountantId = req.decodedUser?.acct_ID;

    if (!accountantId) {
      return res.status(401).json({ message: 'Invalid or missing accountant ID' });
    }

    const newProduct = await prisma.product.create({
      data: {
        prod_name,
        prod_price,
        prod_sku,
        prod_sellprice,
        prod_buyprice,
        prod_totalSP,
        prod_totalBP,
        prod_totalPrice,
        accountant: { connect: { acct_ID: parseInt(accountantId) } },
      },
    });

    res.status(201).json({ message: 'Product added successfully', identity: newProduct.prod_name });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


 






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