
import { DecodedAccountantid,  } from './types'; 
import { Request as ExpressRequest } from 'express';

interface CustomRequest extends ExpressRequest {
  decodedUser?: DecodedAccountantid;
  userId?: number; 
}

export { CustomRequest };

