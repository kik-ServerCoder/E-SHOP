import express, { Response } from 'express';
import { verifyToken } from '../middleware/verification';
import { PrismaClient } from '@prisma/client';
import { CustomRequest } from '../custom';
import { checkBlacklist } from '../middleware/blocklist';
import { parseISO } from 'date-fns';

const prisma = new PrismaClient();
const router = express.Router();
router.get('/getselltracking', verifyToken, checkBlacklist, async (req: CustomRequest, res: Response) => {
  try {
    const accountantusername = req.decodedUsername?.username;
    const { startTime } = req.query;
    if (!accountantusername) {
      return res.status(401).json({ message: 'accountant not found' });
    }
    const parsedStartTime = startTime ? parseISO(startTime.toString()) : new Date(0); 
    const selltracking = await prisma.sellPriceHistory.findMany({where: {
      createdAt: {
        gte: parsedStartTime,
      },
    },});
    res.json(selltracking);
  } catch (error) {
    console.error('Error fetching sell tracking:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/getbuytracking', verifyToken, checkBlacklist, async (req: CustomRequest, res:Response) => {
  try {
    const accountantusername = req.decodedUsername?.username;
    const { startTime } = req.query;
    if (!accountantusername) {
      return res.status(401).json({ message: 'accountant not found' });
    }
    const parsedStartTime = startTime ? parseISO(startTime.toString()) : new Date(0); 
    const buytracking = await prisma.buyPriceHistory.findMany({where: {
      createdAt: {
        gte: parsedStartTime,
      },
    },});
    res.json(buytracking);
  } catch (error) {
    console.error('Error fetching sell tracking:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/getallproductlists', verifyToken, checkBlacklist, async (req: CustomRequest, res: Response) => {
  try {
    const accountantUsername = req.decodedUsername?.username;

    if (!accountantUsername) {
      return res.status(401).json({ message: 'Accountant not found' });
    }

   
    const { startTime } = req.query;

    
    const parsedStartTime = startTime ? parseISO(startTime.toString()) : new Date(0);

    
    console.log(parsedStartTime);

    const products = await prisma.product.findMany({
      where: {
        createdAt: {
          gte: parsedStartTime,
        },
      },
    });

    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/getproduct/:id', verifyToken, checkBlacklist, async (req: CustomRequest, res: Response) => {
  try {
   
    const productID: number | undefined = parseInt(req.params.id);
    const accountantusername = req.decodedUsername?.username;

    if (!accountantusername) {
      return res.status(401).json({ message: 'accountant not found' });
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
router.get('/getproductwithcode/:code', verifyToken, checkBlacklist, async (req: CustomRequest, res: Response) => {
  try {
   
    const productcode: string | undefined = req.params.code;

    const accountantusername = req.decodedUsername?.username;

    if (!accountantusername) {
      return res.status(401).json({ message: 'accountant not found' });
    }

    if (!productcode) {
      return res.status(400).json({ error: 'Invalid product Code' });
    }

    const product = await prisma.product.findUnique({
      where: {
        prod_code: productcode,
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

router.post('/addproduct', verifyToken, checkBlacklist, async (req: CustomRequest, res: Response) => {
  try {
    const { prod_code,  prod_name } = req.body;

    if (!prod_code || !prod_name) {
      return res.status(400).json({ error: 'Product code and product name are required fields' });
    }

    const accountantusername = req.decodedUsername?.username;

    if (!accountantusername) {
      return res.status(401).json({ error: 'Invalid or missing accountant' });
    }

    const newProduct = await prisma.product.create({
      data: {
        prod_code,
        prod_name,
       
        accountant: { connect: { username: accountantusername } },
      },
    });

    res.status(201).json({
      message: 'Product added successfully',
      product: {
        prod_ID: newProduct.prod_ID,
        prod_name: newProduct.prod_name,
      },
    });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/prodsellpricetracking', verifyToken, checkBlacklist, async (req: CustomRequest, res: Response) => {
  try {

    const {
      prod_code,
      prod_name,
      prod_sellsku,
      prod_sellprice,
      prod_totalSP
    } = req.body;

    if (!prod_code || !prod_name || !prod_sellsku || !prod_sellprice || !prod_totalSP) {
      return res.status(400).json({ errors: ['Product name, product code, and product units are required fields'] });
    }

    const accountantusername = req.decodedUsername?.username;

    if (!accountantusername) {
      return res.status(401).json({ message: 'accountant not found' });
    }
    const newProduct = await prisma.sellPriceHistory.create({
      data: {
        prod_code,
        prod_name,
        prod_sellsku,
        prod_sellprice,
        prod_totalSP,
        accountant: { connect: { username: accountantusername } },
      },
    });

    res.status(201).json({ message: 'Product history added successfully. Product code: ' + newProduct.prod_code, identity: newProduct.prod_name });
  } catch (error) {
    console.error('Error creating product history:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/prodbuypricetracking', verifyToken, checkBlacklist, async (req: CustomRequest, res: Response) => {
  try {
    const {
      prod_code,
      prod_name,
      prod_buysku,
      prod_buyprice,
      prod_totalBP
    } = req.body;

    if (!prod_code || !prod_name || !prod_buysku || !prod_buyprice || !prod_totalBP) {
      return res.status(400).json({ errors: ['Product name, product code, and product units are required fields'] });
    }


    const accountantusername = req.decodedUsername?.username;

    if (!accountantusername) {
      return res.status(401).json({ message: 'accountant not found' });
    }


    const newProduct = await prisma.buyPriceHistory.create({
      data: {
        prod_code,
        prod_name,
        prod_buysku,
        prod_buyprice,
        prod_totalBP,
        accountant: { connect: { username: accountantusername } },
      },
    });


    res.status(201).json({
      message: 'Product history added successfully.',
      product: { prod_code: newProduct.prod_code, prod_name: newProduct.prod_name },
    });
  } catch (error) {

    console.error('Error creating product history:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



router.put('/editproduct/:productcode', verifyToken, checkBlacklist, async (req: CustomRequest, res: Response) => {
  try {
    const { prod_name, prod_code, prod_sku, prod_sellprice, prod_buyprice, prod_totalSP, prod_totalBP } = req.body;
    const productcode = req.params.productcode;

    if (!prod_name || !prod_code ) {
      return res.status(400).json({ errors: ['Product name and code are required fields'] });
    }

    const accountantusername = req.decodedUsername?.username;

    if (!accountantusername) {
      return res.status(401).json({ message: 'accountant not found' });
    }

    const existingProduct = await prisma.product.findUnique({
      where: { prod_code: productcode },
      include: { accountant: true },
    });

    if (!existingProduct) {
      return res.status(404).json({ message: 'Product not found or unauthorized to edit' });
    }

    const updatedProduct = await prisma.product.update({
      where: { prod_code: productcode },
      data: {
        prod_name,
        prod_code,    
        prod_sku: Number(prod_sku),
        prod_sellprice,
        prod_buyprice,
        prod_totalSP,
        prod_totalBP,
      
      },
    });

    res.status(200).json({ message: 'Product updated successfully', identity: updatedProduct.prod_name });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.patch('/editsellprice/:productcode', verifyToken, checkBlacklist, async (req: CustomRequest, res: Response) => {
  try {

    const productcode = req.params.productcode;
    const { prod_sku, prod_sellprice, prod_totalSP } = req.body;


    if (!prod_sku || !prod_sellprice || !prod_totalSP) {
      return res.status(400).json({ errors: ['product units , product selling price and product total sell price are required fields'] });
    }
    const accountantusername = req.decodedUsername?.username;

    if (!accountantusername) {
      return res.status(401).json({ message: 'accountant not found' });
    }

    const existingProduct = await prisma.product.findUnique({
      where: { prod_code: productcode },
      include: { accountant: true },
    });
// || existingProduct.accountantId !== parseInt(accountantId)
    if (!existingProduct ) {
      return res.status(404).json({ message: 'Product not found or unauthorized to edit' });
    }
    const updatedProduct = await prisma.product.update({
      where: { prod_code: productcode },
      data: {
        prod_sku:Number(prod_sku),
        prod_sellprice,
        prod_totalSP,
      },
    });

    res.status(201).json({
      message: 'Updated product sell price. Product code: ' + updatedProduct.prod_code,
      identity: updatedProduct.prod_name,
    });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.patch('/editbuyprice/:productcode', verifyToken, checkBlacklist, async (req: CustomRequest, res: Response) => {
  try {

    const productcode = req.params.productcode;
    const { prod_sku, prod_buyprice, prod_totalBP } = req.body;


    if (!prod_sku || !prod_buyprice || !prod_totalBP) {
      return res.status(400).json({ errors: ['product units , product Buying price and product total buy price are required fields'] });
    }
    const accountantusername = req.decodedUsername?.username;

    if (!accountantusername) {
      return res.status(401).json({ message: 'accountant not found' });
    }

    const existingProduct = await prisma.product.findUnique({
      where: { prod_code: productcode },
      include: { accountant: true },
    });

    if (!existingProduct ) {
      return res.status(404).json({ message: 'Product not found or unauthorized to edit' });
    }
    const updatedProduct = await prisma.product.update({
      where: { prod_code: productcode },
      data: {
        prod_sku:Number(prod_sku),
        prod_buyprice,
        prod_totalBP,
      },
    });

    res.status(200).json({
      message: 'Updated product Buy price. Product Code: ' + updatedProduct.prod_code,
      identity: updatedProduct.prod_name,
    });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});




router.delete('/deletebuytracking', verifyToken, checkBlacklist, async (req: CustomRequest, res: Response) => {
  try {
    const accountantUsername = req.decodedUsername?.username;

    if (!accountantUsername) {
      return res.status(401).json({ message: 'Accountant not found' });
    }

    
    await prisma.buyPriceHistory.deleteMany();

    res.json({ message: 'All data deleted successfully' });
  } catch (error) {
    console.error('Error deleting buy tracking data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
router.delete('/deleteproductdata', verifyToken, checkBlacklist, async (req: CustomRequest, res: Response) => {
  try {
    const accountantUsername = req.decodedUsername?.username;

    if (!accountantUsername) {
      return res.status(401).json({ message: 'Accountant not found' });
    }

    
    await prisma.product.deleteMany();

    res.json({ message: 'All data deleted successfully' });
  } catch (error) {
    console.error('Error deleting  data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
router.delete('/deleteselltracking', verifyToken, checkBlacklist, async (req: CustomRequest, res: Response) => {
  try {
    const accountantUsername = req.decodedUsername?.username;

    if (!accountantUsername) {
      return res.status(401).json({ message: 'Accountant not found' });
    }

    
    await prisma.sellPriceHistory.deleteMany();

    res.json({ message: 'All sell data deleted successfully' });
  } catch (error) {
    console.error('Error deleting sell tracking data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/deleteproduct/:productId', verifyToken, checkBlacklist, async (req: CustomRequest, res: Response) => {
  try {
    const productId = parseInt(req.params.productId, 10);


    const existingProduct = await prisma.product.findUnique({
      where: { prod_ID: productId },
      include: { accountant: true },
    });

    if (!existingProduct ) {
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









export default router;