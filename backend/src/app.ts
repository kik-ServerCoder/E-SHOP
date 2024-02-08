import  { PrismaClient } from '@prisma/client';
import routes from './routes'
import express from 'express';
import cors from 'cors';

const prisma = new PrismaClient();
const app = express();

app.use(express.json());
const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
app.use(cors());
app.use('/api', routes);



const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
server.on('close', async () => {
  console.log('Server closed. Disconnecting Prisma.');
  await prisma.$disconnect();
});
