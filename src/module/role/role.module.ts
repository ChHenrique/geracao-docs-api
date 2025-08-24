import { Module } from '@nestjs/common';
import { RoleController } from './roleControllers/role.controller';
import { RoleCreateUseCase } from './roleUseCases/role.create.useCase';
import { RoleUpdateUseCase } from './roleUseCases/role.update.useCase';
import { RoleDeleteUseCase } from './roleUseCases/role.delete.useCase';
import { RoleGetUniqueUseCase } from './roleUseCases/role.getUnique.useCase';
import { RoleGetAllUseCase } from './roleUseCases/role.getAll.useCase';
import { IRolePrismaRepository } from './roleDomain/role.prisma.repository';

@Module({
  controllers: [RoleController],
  // use cases
  providers: [
    RoleCreateUseCase,
    RoleUpdateUseCase,
    RoleDeleteUseCase,
    RoleGetUniqueUseCase,
    RoleGetAllUseCase,
    // repositories
    {
      provide: 'IRoleRepository',
      useClass: IRolePrismaRepository,
    },
  ],
  exports: [
    RoleCreateUseCase,
    RoleUpdateUseCase,
    RoleDeleteUseCase,
    RoleGetUniqueUseCase,
    RoleGetAllUseCase,
  ],
})
export class RoleModule {}
