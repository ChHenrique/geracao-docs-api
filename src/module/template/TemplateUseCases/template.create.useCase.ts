import { templateSchema, templateSchemaDTO } from "src/schemas/template.schema";
import type { ITemplateRepository } from "../templateDomain/template.repository";
import { BadRequestException, Injectable, } from "@nestjs/common";
import { TemplateEntity } from "../templateDomain/template.entities";
import { Request } from "express";

@Injectable()
export class CreateTemplateUseCase {
    constructor(
        private repo: ITemplateRepository
    ) { }

    async execute(data: templateSchemaDTO, req: Request) {
        const user = req.user

        const parsedData = templateSchema.safeParse(data)
        if (!parsedData.success) throw new BadRequestException("Bad Request")

        const template = new TemplateEntity(parsedData.data.name, parsedData.data.contentHTML, user.id)

        return this.repo.create(template)


    }
}