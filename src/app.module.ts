import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UserModule } from './module/user/user.module';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { RoleModule } from './module/role/role.module';

@Module({
  imports: [UserModule, RoleModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude({ path: 'users/login', method: RequestMethod.POST })
      .forRoutes('users');
  }
}
