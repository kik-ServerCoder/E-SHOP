import  { PrismaClient } from '@prisma/client';
import regroutes from './api/registration'
import productroutes from './api/product'
import accountantroutes from './api/accountant';
import express from 'express';

import cors from 'cors';

const prisma = new PrismaClient();
const app = express();

app.use(express.json());
const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
app.use(cors({
  origin:  ['http://35.177.104.174:7000', 'http://localhost:7000'],
}));
app.use(express.json());

app.use('/reg', regroutes);
app.use('/product', productroutes);
app.use('/accountant', accountantroutes);



const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
server.on('close', async () => {
  console.log('Server closed. Disconnecting Prisma.');
  await prisma.$disconnect();
});
