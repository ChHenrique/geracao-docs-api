import { NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { IUserJWT } from 'src/interfaces/user.interface';

export class AuthMiddleware implements NestMiddleware {
  async use(req: Request, next: NextFunction) {
    const token = req.cookies.token;
    if (!token) throw new UnauthorizedException('Unathorized');

    const decoded = jwt.verify(token, 'chavejwt') as IUserJWT;
    req.user = decoded;

    next();
  }
}
