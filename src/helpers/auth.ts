import fs from 'fs';
import Models from '@models/index';

const { Users } = Models;

import jwt from 'jsonwebtoken';

const privateKey = fs.readFileSync('./zenith');
const publicKey = fs.readFileSync('./zenith_key.pub'); 

declare const debug;

export const generateToken = (userId: string) => {
  return jwt.sign({ userId }, privateKey, { algorithm: 'RS256', expiresIn: '1h' });
};

export const verifyToken = async (token: string) => {
  const decoded: any = jwt.verify(token, publicKey, { algorithms: ['RS256'] });
  const { userId } = decoded;
  const userExist = await Users.findByPk(userId);

   if (!userExist) return { valid: false };

  return { valid: true, userId };
}

