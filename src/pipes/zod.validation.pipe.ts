import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
  UnsupportedMediaTypeException,
} from '@nestjs/common';
import { ZodType } from 'zod';
import { AnyZodObject } from 'zod/v3';

// Class Pipe de validação do zod
export class ZodValiditionPipe implements PipeTransform {
  // DI do schema
  constructor(private schema: ZodType | AnyZodObject) {}

  // Método que vem do pipeTransform
  transform(value: any, metadata: ArgumentMetadata) {
     if (metadata.type !== 'body') return value;

    const parsed = this.schema.safeParse(value);
    console.log("parsedData: ", parsed.error)
    if (!parsed.success) throw new BadRequestException('Bad Request');
    
    return parsed.data;
  }
}
