import { ArgumentMetadata, BadRequestException, ForbiddenException, HttpException, HttpStatus, PayloadTooLargeException, PipeTransform } from "@nestjs/common";
import { ZodType } from "zod";
import { AnyZodObject } from "zod/v3";

// Class Pipe de validação do zod
export class ZodValiditionPipe implements PipeTransform {
    // DI do schema
    constructor(private schema: ZodType | AnyZodObject) { }

    // Método que vem do pipeTransform
    transform(value: any, metadata: ArgumentMetadata) {
        try {
            // Valido qualquer tipo de dado que vim do zod, com claro o tipo que eu mandei
            const parsedValue = this.schema.parse(value);
            return parsedValue
        } catch {
            // Erro de bad request
            throw new BadRequestException("Bad Request")
        }
    }
}
