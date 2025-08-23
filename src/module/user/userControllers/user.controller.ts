import {
  Body,
  Controller,
  Delete,
  Get,
  Injectable,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { Permissions } from 'src/decorators/permissions.decorator';
import { PermissionGuard } from 'src/guards/permissions.guards';
import { ZodValiditionPipe } from 'src/pipes/zod.validation.pipe';
import {
  userSchema,
  userSchemaLogin,
  type userSchemaLoginDTO,
  type userSchemaDTO,
  userSchemaUpdate,
  type userSchemaUpdateDTO,
} from 'src/schemas/user.schema';
import { UserCreateUseCase } from '../userUseCases/user.create.useCase';
import type { Request, Response } from 'express';
import { UserUpdateUseCase } from '../userUseCases/user.update.useCase';
import { UserDeleteUseCase } from '../userUseCases/user.delete.useCase';
import { UserGetUniqueUseCase } from '../userUseCases/user.getUnique.useCase';
import { UserGetAllUseCase } from '../userUseCases/user.getAll.useCase';
import { UserloginUseCase } from '../userUseCases/user.login.useCase';

@Injectable()
@Controller('users')
export class UserController {
  constructor(
    private createUseCase: UserCreateUseCase,
    private updateUseCase: UserUpdateUseCase,
    private deleteUseCase: UserDeleteUseCase,
    private getUniqueUseCase: UserGetUniqueUseCase,
    private getAllUseCase: UserGetAllUseCase,
    private loginUseCase: UserloginUseCase,
  ) {}

  @Post()
  @UseGuards(PermissionGuard)
  @Permissions('MANAGE_USERS')
  @UsePipes(new ZodValiditionPipe(userSchema))
  async create(@Body() data: userSchemaDTO, @Res() res: Response) {
    const userCreated = await this.createUseCase.execute(data);
    res.status(201).send({ Message: 'User Created', data: userCreated });
  }

  @Put()
  @UsePipes(new ZodValiditionPipe(userSchemaUpdate))
  async update(
    @Body() data: userSchemaUpdateDTO,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    await this.updateUseCase.execute(data, req);
    res.status(200).send({ Message: 'User Updated' });
  }

  @Delete(':id')
  async remove(@Req() req: Request, @Res() res: Response) {
    await this.deleteUseCase.execute(req);
    res.status(200).send({ Message: 'User Deleted' });
  }

  @Get(':id')
  async getUnique(@Req() req: Request, @Res() res: Response) {
    const user = await this.getUniqueUseCase.execute(req);
    res.status(200).send({ Message: 'User found', user });
  }

  @Get()
  @UseGuards(PermissionGuard)
  @Permissions('MANAGE_USERS')
  async getAll(@Res() res: Response) {
    const users = await this.getAllUseCase.execute();
    res.status(200).send({ Message: 'Users found', users: users });
  }

  @Post('/login')
  @UsePipes(new ZodValiditionPipe(userSchemaLogin))
  async login(@Body() data: userSchemaLoginDTO, @Res() res: Response) {
    await this.loginUseCase.execute(data);
    res.status(200).send({ Message: 'Logado com sucesso!' });
  }
}
