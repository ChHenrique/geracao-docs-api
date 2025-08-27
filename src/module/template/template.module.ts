import { Module } from '@nestjs/common';
import { TemplateController } from './templateControllers/template.controller';
import { CreateTemplateUseCase } from './TemplateUseCases/template.create.useCase';
import { UpdateTemplateUseCase } from './TemplateUseCases/template.update.useCase';
import { GetAllTemplateUseCase } from './TemplateUseCases/template.getAll.useCase';
import { GetUniqueTemplateUseCase } from './TemplateUseCases/template.findUnique.useCase';
import { DeleteTemplateUseCase } from './TemplateUseCases/template.delete.useCase';
import { TemplatePrismaRepository } from './templateDomain/template.prisma.repository';

@Module({
  controllers: [TemplateController],
  providers: [
    // use cases
    CreateTemplateUseCase,
    UpdateTemplateUseCase,
    GetAllTemplateUseCase,
    GetUniqueTemplateUseCase,
    DeleteTemplateUseCase,
    // repositories
    {
      provide: 'ITemplateRepository',
      useClass: TemplatePrismaRepository,
    },
  ],
  exports: [
    CreateTemplateUseCase,
    UpdateTemplateUseCase,
    GetAllTemplateUseCase,
    GetUniqueTemplateUseCase,
    DeleteTemplateUseCase,
  ],
})
export class TemplateModule {}
