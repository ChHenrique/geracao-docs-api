import { templateSchema, templateSchemaDTO } from "src/schemas/template.schema";
import type { ITemplateRepository } from "../templateDomain/template.repository";
import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { TemplateEntity } from "../templateDomain/template.entities";

@Injectable()
export class CreateTemplateUseCase {
    constructor(
        private repo: ITemplateRepository
    ){}

    async execute(data: templateSchemaDTO ){
        const parsedData = templateSchema.safeParse(data)
        if (!parsedData.success) throw new BadRequestException("Bad Request")

        const template = new TemplateEntity(parsedData.data.name, )
    }
}