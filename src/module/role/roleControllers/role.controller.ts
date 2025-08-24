import {
  Body,
  Controller,
  Delete,
  Get,
  Injectable,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { Permissions } from 'src/decorators/permissions.decorator';
import { PermissionGuard } from 'src/guards/permissions.guards';
import { RoleCreateUseCase } from '../roleUseCases/role.create.useCase';
import { RoleUpdateUseCase } from '../roleUseCases/role.update.useCase';
import { RoleDeleteUseCase } from '../roleUseCases/role.delete.useCase';
import { RoleGetUniqueUseCase } from '../roleUseCases/role.getUnique.useCase';
import { RoleGetAllUseCase } from '../roleUseCases/role.getAll.useCase';
import {
  roleSchema,
  roleSchemaUpdate,
  type roleSchemaUpdateDTO,
  type roleSchemaDTO,
} from 'src/schemas/role.schema';
import { ZodValiditionPipe } from 'src/pipes/zod.validation.pipe';
import type { Response } from 'express';
import { ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Roles')
@Controller('roles')
@UseGuards(PermissionGuard)
@Permissions('MANAGE_ROLES', 'MANAGE_USERS')
export class RoleController {
  constructor(
    private createUseCase: RoleCreateUseCase,
    private updateUseCase: RoleUpdateUseCase,
    private deleteUseCase: RoleDeleteUseCase,
    private getUniqueUseCase: RoleGetUniqueUseCase,
    private getAllUniqueUseCase: RoleGetAllUseCase,
  ) {}

  @Post()
  @UsePipes(new ZodValiditionPipe(roleSchema))
  @ApiBody({ schema: { $ref: '#/components/schemas/RoleCreate' } })
  @ApiResponse({ status: 201, description: 'Role created successfully' })
  async create(@Body() data: roleSchemaDTO, @Res() res: Response) {
    const roleCreated = await this.createUseCase.execute(data);
    res
      .status(201)
      .send({ Message: 'Role created successfully', data: roleCreated });
  }

  @Put(':id')
  @UsePipes(new ZodValiditionPipe(roleSchemaUpdate))
  @ApiParam({ name: 'id', description: 'Role ID' })
  @ApiBody({ schema: { $ref: '#/components/schemas/RoleUpdate' } })
  @ApiResponse({ status: 200, description: 'Role updated successfully' })
  async update(
    @Body() data: roleSchemaUpdateDTO,
    @Res() res: Response,
    @Param('id') id: string,
  ) {
    const roleUpdated = await this.updateUseCase.execute(data, id);
    res
      .status(200)
      .send({ Message: 'Role updated successfully', data: roleUpdated });
  }

  @Delete(':id')
  @ApiParam({ name: 'id', description: 'Role ID' })
  @ApiResponse({ status: 200, description: 'Role deleted successfully' })
  async remove(@Res() res: Response, @Param('id') id: string) {
    await this.deleteUseCase.execute(id);
    res.status(200).send({ Message: 'Role deleted successfully' });
  }

  @Get(':id')
  @ApiParam({ name: 'id', description: 'Role ID' })
  @ApiResponse({ status: 200, description: 'Role found' })
  async getUnique(@Res() res: Response, @Param('id') id: string) {
    const role = await this.getUniqueUseCase.execute(id);
    res.status(200).send({ Message: 'Role found', role: role });
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Roles found' })
  async getAll(@Res() res: Response) {
    const roles = await this.getAllUniqueUseCase.execute();
    res.status(200).send({ Message: 'Roles found', roles: roles });
  }
}
