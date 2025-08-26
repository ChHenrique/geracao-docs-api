import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UserModule } from './module/user/user.module';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { RoleModule } from './module/role/role.module';
import { TemplateModule } from './module/template/template.module';

@Module({
  imports: [UserModule, RoleModule, TemplateModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude({ path: 'users/login', method: RequestMethod.POST })
      .forRoutes('users', 'roles', 'templates');
  }
}
