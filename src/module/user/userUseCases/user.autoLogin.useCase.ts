import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import jwt from 'jsonwebtoken'

@Injectable()
export class UserAutologinUseCase {
    async execute(req: Request) {
        const user = req.user
        if (!user) throw new UnauthorizedException()

        const token = jwt.sign(user, process.env.JWT_SECRET)
        return token
    }

}