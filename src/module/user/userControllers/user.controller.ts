import {
  Body,
  Controller,
  Delete,
  Get,
  Injectable,
  Param,
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
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserDTO } from '../dtoTypeRoutes/user.schema.dto.swagger';
import { UpdateUserDTO } from '../dtoTypeRoutes/user.update.schema.dto.swagger';
import { LoginUserDTO } from '../dtoTypeRoutes/user.login.dto.swagger';

@ApiTags('Users')
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
  @UsePipes(new ZodValiditionPipe(userSchema))
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: UserDTO, description: 'User data to create' })
  @ApiResponse({ status: 201, description: 'User created', type: UserDTO })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async create(@Body() data: userSchemaDTO, @Res() res: Response) {
    const userCreated = await this.createUseCase.execute(data);
    res.status(201).send({ Message: 'User Created', data: userCreated });
  }

  @Put(':id')
  @UsePipes(new ZodValiditionPipe(userSchemaUpdate))
  @ApiOperation({ summary: 'Update an existing user' })
  @ApiBody({ type: UpdateUserDTO, description: 'User data to update' })
  @ApiResponse({
    status: 200,
    description: 'User updated',
    type: UpdateUserDTO,
  })
  @ApiParam({ name: 'id', type: String, description: 'User id' })
  @ApiResponse({ status: 400, description: 'Invalid data' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async update(
    @Param('id') id: string,
    @Body() data: userSchemaUpdateDTO,
    @Req() req: Request,
  ) {
    await this.updateUseCase.execute(data, req, id);
    return { Message: 'User Updated' };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user' })
  @ApiParam({ name: 'id', type: String, description: 'User id' })
  @ApiResponse({ status: 200, description: 'User deleted' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async remove(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id') id: string,
  ) {
    await this.deleteUseCase.execute(req, id);
    res.status(200).send({ Message: 'User Deleted' });
  }

  @Get('/all')
  @UseGuards(PermissionGuard)
  @Permissions('MANAGE_USERS')
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'List of users', type: UserDTO })
  async getAll(@Res() res: Response) {
    const users = await this.getAllUseCase.execute();
    res.status(200).send({ Message: 'Users found', users: users });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiParam({ name: 'id', type: String, description: 'User id' })
  @ApiResponse({ status: 200, description: 'User found', type: UserDTO })
  @ApiResponse({ status: 404, description: 'User not found' })
  async getUnique(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id') id: string,
  ) {
    const user = await this.getUniqueUseCase.execute(req, id);
    res.status(200).send({ Message: 'User found', user });
  }

  @Post('/login')
  @UsePipes(new ZodValiditionPipe(userSchemaLogin))
  @ApiOperation({ summary: 'Login a user' })
  @ApiBody({
    type: Object,
    description: 'Login data (email/cpf/cnpj + password)',
  })
  @ApiResponse({
    status: 200,
    description: 'Login successful',
    type: LoginUserDTO,
  })
  @ApiResponse({ status: 400, description: 'Invalid credentials' })
  async login(
    @Req() req: Request,
    @Res() res: Response,
    @Body() data: userSchemaLoginDTO,
  ) {
    const token = await this.loginUseCase.execute(data, req);
    res
      .cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      })
      .send({ Message: 'Login successful' });
  }
}
