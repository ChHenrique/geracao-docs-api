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

import { ApiTags } from '@nestjs/swagger';
import { CreateTemplateUseCase } from '../TemplateUseCases/template.create.useCase';
import { UpdateTemplateUseCase } from '../TemplateUseCases/template.update.useCase';
import { DeleteTemplateUseCase } from '../TemplateUseCases/template.delete.useCase';
import { GetUniqueTemplateUseCase } from '../TemplateUseCases/template.findUnique.useCase';
import { GetAllTemplateUseCase } from '../TemplateUseCases/template.getAll.useCase';
import { templateSchema, updateTemplateSchema } from 'src/schemas/template.schema';
import type { templateSchemaDTO, templateUpdateSchemaDTO } from 'src/schemas/template.schema';
import type { Request, Response } from 'express';

@ApiTags('Users')
@Injectable()
@Controller('users')
export class UserController {
    constructor(
        private createUseCase: CreateTemplateUseCase,
        private updateUseCase: UpdateTemplateUseCase,
        private deleteUseCase: DeleteTemplateUseCase,
        private getUniqueUseCase: GetUniqueTemplateUseCase,
        private getAllUseCase: GetAllTemplateUseCase,

    ) { }

    @Post()
    @UseGuards(PermissionGuard)
    @Permissions('MANAGE_USERS')
    @UsePipes(new ZodValiditionPipe(templateSchema))
    async create(@Req() req: Request, @Body() data: templateSchemaDTO) {
        const templateCreated = await this.createUseCase.execute(data, req);
        return { message: 'Template Created', data: templateCreated };
    }


    @Put(':id')
    @UsePipes(new ZodValiditionPipe(updateTemplateSchema))
    async update(
        @Param('id') id: string,
        @Body() data: templateUpdateSchemaDTO,

    ) {
        await this.updateUseCase.execute(id, data);
        return { message: 'Template Updated' };
    }

    @Delete(':id')
    async remove(@Param('id') id: string, @Res() res: Response) {
        await this.deleteUseCase.execute(id);
        res.status(200).send({ Message: 'Template Deleted' });
    }

    @Get(':id')
    async getUnique(@Param('id') id: string, @Res() res: Response) {
        const template = await this.getUniqueUseCase.execute(id);
        res.status(200).send({ Message: 'Template found', template });
    }

    @Get()
    @UseGuards(PermissionGuard)
    @Permissions('MANAGE_USERS')
    async getAll(@Res() res: Response) {
        const templates = await this.getAllUseCase.execute();
        res.status(200).send({ Message: 'Templates found', templates: templates });
    }

}