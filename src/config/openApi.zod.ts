import { OpenApiGeneratorV3 } from '@asteasolutions/zod-to-openapi';
import { registry } from './registryOpenApi';

export function configOpenAPIZod() {
  const generator = new OpenApiGeneratorV3(registry.definitions);

  // gera o documento openapi3-ts
  const document = generator.generateDocument({
    openapi: '3.0.0',
    info: {
      title: 'Document Generation API',
      version: '1.0.0',
    },
  });

  return document as unknown as import('@nestjs/swagger').OpenAPIObject;
}
