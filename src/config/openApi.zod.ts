import { OpenApiGeneratorV3 } from '@asteasolutions/zod-to-openapi';
import { OpenAPIObject } from '@nestjs/swagger';
import { ComponentsObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { roleSchema, roleSchemaUpdate } from 'src/schemas/role.schema';
import { userSchema, userSchemaLogin } from 'src/schemas/user.schema';

export function configOpenAPIZod(): () => Pick<OpenAPIObject, 'components'> {
  const generator = new OpenApiGeneratorV3([
    userSchema,
    userSchemaLogin,
    userSchemaLogin,
    roleSchema,
    roleSchemaUpdate,
  ]);
  return () => ({
    components: generator.generateComponents as ComponentsObject,
  });
}
