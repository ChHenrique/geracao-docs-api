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
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { Permissions } from 'src/decorators/permissions.decorator';
import { PermissionGuard } from 'src/guards/permissions.guards';
import { ZodValiditionPipe } from 'src/pipes/zod.validation.pipe';
import { ApiTags } from '@nestjs/swagger';
import { CreateTemplateUseCase } from '../TemplateUseCases/template.create.useCase';
import { UpdateTemplateUseCase } from '../TemplateUseCases/template.update.useCase';
import { DeleteTemplateUseCase } from '../TemplateUseCases/template.delete.useCase';
import { GetUniqueTemplateUseCase } from '../TemplateUseCases/template.findUnique.useCase';
import { GetAllTemplateUseCase } from '../TemplateUseCases/template.getAll.useCase';
import {
  templateSchema,
  updateTemplateSchema,
} from 'src/schemas/template.schema';
import type {
  templateSchemaDTO,
  templateUpdateSchemaDTO,
} from 'src/schemas/template.schema';
import type { Request } from 'express';

@Injectable()
@ApiTags('Templates')
@Controller('templates')
@UseGuards(PermissionGuard)
export class TemplateController {
  constructor(
    private createUseCase: CreateTemplateUseCase,
    private updateUseCase: UpdateTemplateUseCase,
    private deleteUseCase: DeleteTemplateUseCase,
    private getUniqueUseCase: GetUniqueTemplateUseCase,
    private getAllUseCase: GetAllTemplateUseCase,
  ) {}

  @Post()
  @Permissions('MANAGE_TEMPLATES')
  @UsePipes(new ZodValiditionPipe(templateSchema))
  async create(@Req() req: Request, @Body() data: templateSchemaDTO) {
    const templateCreated = await this.createUseCase.execute(data, req);
    return {
      success: true,
      message: 'Template created successfully',
      data: templateCreated,
    };
  }

  @Put(':id')
  @Permissions('MANAGE_TEMPLATES')
  @UsePipes(new ZodValiditionPipe(updateTemplateSchema))
  async update(@Param('id') id: string, @Body() data: templateUpdateSchemaDTO) {
    const updatedTemplate = await this.updateUseCase.execute(id, data);
    return {
      success: true,
      message: 'Template updated successfully',
      data: updatedTemplate,
    };
  }

  @Delete(':id')
  @Permissions('MANAGE_TEMPLATES')
  async remove(@Param('id') id: string) {
    await this.deleteUseCase.execute(id);
    return {
      success: true,
      message: 'Template deleted successfully',
    };
  }

  @Get(':id')
  async getUnique(@Param('id') id: string) {
    const template = await this.getUniqueUseCase.execute(id);
    return {
      success: true,
      message: 'Template found',
      data: template,
    };
  }

  @Get()
  async getAll() {
    const templates = await this.getAllUseCase.execute();
    return {
      success: true,
      message: 'Templates found',
      data: templates,
    };
  }
}
