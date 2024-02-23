import express, {  Response } from 'express';
import { verifyToken } from '../middleware/verification';
import { PrismaClient } from '@prisma/client';
import { CustomRequest } from '../custom';
import { checkBlacklist } from '../middleware/blocklist';

const prisma = new PrismaClient();
const router = express.Router();


router.post('/addproduct', verifyToken, checkBlacklist, async (req: CustomRequest, res: Response) => {
  try {
    const {
     
      prod_code,
      prod_name,
      prod_price,
      prod_sku,
      prod_totalPrice,
    } = req.body;

    if ( !prod_code|| !prod_name || !prod_price || !prod_sku || !prod_price) {
      return res.status(400).json({ errors: ['Product name, product password, and product units are required fields'] });
    }

    const accountantId = req.decodedUser?.acct_ID;

    if (!accountantId) {
      return res.status(401).json({ message: 'Invalid or missing accountant ID' });
    }

    const newProduct = await prisma.product.create({
      data: {
        
        prod_code,
        prod_name,
        prod_price,
        prod_sku,
        prod_totalPrice,
        accountant: { connect: { acct_ID: parseInt(accountantId) } },
      },
    });

    res.status(201).json({ message: 'Product added successfully. Product ID: '+newProduct.prod_ID, identity: newProduct.prod_name });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


 

router.put('/editproduct/:productId', verifyToken, checkBlacklist, async (req: CustomRequest, res: Response) => {
  try {
    const { prod_name,  prod_code, prod_price, prod_sku, prod_sellprice, prod_buyprice, prod_totalSP, prod_totalBP, prod_totalPrice } = req.body;
    const productId = parseInt(req.params.productId,10);

    if (!prod_name || !prod_price || !prod_sku) {
      return res.status(400).json({ errors: ['Product name, product password, and product units are required fields'] });
    }

    const accountantId = req.decodedUser?.acct_ID;

    if (!accountantId) {
      return res.status(401).json({ message: 'accountant ID not found' });
    }

    const existingProduct = await prisma.product.findUnique({
      where: { prod_ID: productId },
      include: { accountant: true }, 
    });

    if (!existingProduct || existingProduct.accountantId !== parseInt(accountantId)) {
      return res.status(404).json({ message: 'Product not found or unauthorized to edit' });
    }

    const updatedProduct = await prisma.product.update({
      where: { prod_ID: productId},
      data: {
        prod_name,
        prod_code,
        prod_price,
        prod_sku,
        prod_sellprice,
        prod_buyprice,
        prod_totalSP,
        prod_totalBP,
        prod_totalPrice,
      },
    });

    res.status(200).json({ message: 'Product updated successfully', identity: updatedProduct.prod_name });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.patch('/editsellprice/:productId', verifyToken, checkBlacklist, async (req: CustomRequest, res: Response) => {
  try {
    
    const productId = parseInt(req.params.productId,10);
    const { prod_sku, prod_sellprice,prod_totalSP } = req.body;
    

    if (!prod_sku || !prod_sellprice || !prod_totalSP ) {
      return res.status(400).json({ errors: ['product units , product selling price and product total sell price are required fields'] });
    }
    const accountantId = req.decodedUser?.acct_ID;

    if (!accountantId) {
      return res.status(401).json({ message: 'accountant ID not found' });
    }

    const existingProduct = await prisma.product.findUnique({
      where: { prod_ID:productId },
      include: { accountant: true }, 
    });

    if (!existingProduct || existingProduct.accountantId !== parseInt(accountantId)) {
      return res.status(404).json({ message: 'Product not found or unauthorized to edit' });
    }
    const updatedProduct = await prisma.product.update({
      where: { prod_ID: productId},
      data: {      
        prod_sku,
        prod_sellprice,    
        prod_totalSP,
      },
    });

    res.status(201).json({
      message: 'Updated product sell price. Product Id: ' + updatedProduct.prod_ID,
      identity: updatedProduct.prod_name,
    });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});




router.patch('/editbuyprice/:productId', verifyToken, checkBlacklist, async (req: CustomRequest, res: Response) => {
  try {
    
    const productId = parseInt(req.params.productId,10);
    const { prod_sku, prod_buyprice,prod_totalBP } = req.body;
    

    if (!prod_sku || !prod_buyprice || !prod_totalBP ) {
      return res.status(400).json({ errors: ['product units , product Buying price and product total buy price are required fields'] });
    }
    const accountantId = req.decodedUser?.acct_ID;

    if (!accountantId) {
      return res.status(401).json({ message: 'accountant ID not found' });
    }

    const existingProduct = await prisma.product.findUnique({
      where: { prod_ID:productId },
      include: { accountant: true }, 
    });

    if (!existingProduct || existingProduct.accountantId !== parseInt(accountantId)) {
      return res.status(404).json({ message: 'Product not found or unauthorized to edit' });
    }
    const updatedProduct = await prisma.product.update({
      where: { prod_ID: productId},
      data: {      
        prod_sku,
        prod_buyprice,    
        prod_totalBP,
      },
    });

    res.status(201).json({
      message: 'Updated product Buy price. Product Id: ' + updatedProduct.prod_ID,
      identity: updatedProduct.prod_name,
    });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.delete('/deleteproduct/:productId', verifyToken, checkBlacklist, async (req: CustomRequest, res: Response) => {
  try {
    const productId = parseInt(req.params.productId, 10);

    const accountantId = req.decodedUser?.acct_ID;

    if (!accountantId) {
      return res.status(401).json({ message: 'Invalid or missing accountant ID' });
    }

    const existingProduct = await prisma.product.findUnique({
      where: { prod_ID: productId },
      include: { accountant: true },
    });

    if (!existingProduct || existingProduct.accountantId !== parseInt(accountantId)) {
      return res.status(404).json({ message: 'Product not found or unauthorized credentials to delete' });
    }

    await prisma.product.delete({
      where: { prod_ID: productId },
    });

    res.status(200).json({ message: 'Product deleted successfully', identity: existingProduct.prod_name });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});




  router.get('/getallproductlists',verifyToken,checkBlacklist, async (req, res) => {
    try {
      const products = await prisma.product.findMany();
      res.json(products);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/getproduct/:id', verifyToken, checkBlacklist, async (req: CustomRequest, res: Response) => {
  try {
    const accountantId: number | undefined = req.userId;
    const productID: number | undefined = parseInt(req.params.id);

    if (!accountantId) {
      return res.status(401).json({ error: 'Unauthorized. User ID not found.' });
    }

    if (isNaN(productID) || productID <= 0) {
      return res.status(400).json({ error: 'Invalid product ID' });
    }

    const product = await prisma.product.findUnique({
      where: {
        prod_ID: productID,
      },
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error('Error getting product by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});




export default router;