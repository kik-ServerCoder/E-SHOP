import { Request } from 'express';
import { DecodedAccountant } from './types'; 

interface CustomRequest extends Request {
  decodedUser?: DecodedAccountant;
}

export { CustomRequest };