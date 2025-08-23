import { NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { env } from 'src/config/dotenv.config';
import { IUserJWT } from 'src/interfaces/user.interface';

export class AuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.token;
    if (!token) throw new UnauthorizedException('Unathorized');

    try {
      const decoded = jwt.verify(token, env.JWT_SECRET) as IUserJWT;
      req.user = decoded;

      next();
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
