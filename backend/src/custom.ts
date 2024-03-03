
import { DecodedAccountantid, DecodedAccountantusername } from './types'; 
import { Request as ExpressRequest } from 'express';

interface CustomRequest extends ExpressRequest {
  decodedUser?: DecodedAccountantid;
  decodedUsername?:DecodedAccountantusername;
 
  userId?: number; 
  username?: String;
  
 
}

export { CustomRequest };

