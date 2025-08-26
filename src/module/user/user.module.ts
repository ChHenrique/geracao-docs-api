import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UserController } from './userControllers/user.controller';
import { UserCreateUseCase } from './userUseCases/user.create.useCase';
import { UserUpdateUseCase } from './userUseCases/user.update.useCase';
import { UserDeleteUseCase } from './userUseCases/user.delete.useCase';
import { UserloginUseCase } from './userUseCases/user.login.useCase';
import { UserGetAllUseCase } from './userUseCases/user.getAll.useCase';
import { UserGetUniqueUseCase } from './userUseCases/user.getUnique.useCase';
import { UserPrismaRepository } from './userDomain/user.prisma.repository';
import { IRolePrismaRepository } from '../role/roleDomain/role.prisma.repository';

@Module({
  controllers: [UserController],
  providers: [
    // use cases
    UserCreateUseCase,
    UserUpdateUseCase,
    UserDeleteUseCase,
    UserloginUseCase,
    UserGetAllUseCase,
    UserGetUniqueUseCase,

    // repositories
    {
      provide: 'IUserRepository',
      useClass: UserPrismaRepository,
    },
    {
      provide: 'IRoleRepository',
      useClass: IRolePrismaRepository,
    },
  ],
  exports: [
    UserCreateUseCase,
    UserUpdateUseCase,
    UserDeleteUseCase,
    UserloginUseCase,
    UserGetAllUseCase,
    UserGetUniqueUseCase,
  ],
})
export class UserModule {}
