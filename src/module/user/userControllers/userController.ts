import { Body, Controller, Injectable, Post, Req, Res, UseGuards, UsePipes } from "@nestjs/common";
import { Permissions } from "src/decorators/permissions.decorator";
import { PermissionGuard } from "src/guards/permissions.guards";
import { ZodValiditionPipe } from "src/pipes/zod.validation.pipe";
import { userSchema, type userSchemaDTO } from "src/schemas/user.schema";
import { UserCreateUseCase } from "../userUseCases/user.create.useCase";
import type { Response } from "express";

@Injectable()
@Controller('user')
export class UserController {
    constructor(
        private createUseCase: UserCreateUseCase
    ){}

    @Post()
    @UseGuards(PermissionGuard)
    @Permissions('MANAGE_USERS')
    @UsePipes(new ZodValiditionPipe(userSchema))
    async create(@Body() data: userSchemaDTO, @Res() res: Response){
        const userCreated = await this.createUseCase.execute(data)
        res.status(201).send({Message: "User Created", data: userCreated})
    }
}