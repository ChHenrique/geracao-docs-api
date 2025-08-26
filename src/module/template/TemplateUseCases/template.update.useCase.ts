import { templateUpdateSchemaDTO, updateTemplateSchema } from "src/schemas/template.schema";
import type { ITemplateRepository } from "../templateDomain/template.repository";
import { BadRequestException, Inject, Injectable, NotFoundException, } from "@nestjs/common";

@Injectable()
export class UpdateTemplateUseCase {
    constructor(
        @Inject('ITemplateRepository') private repo: ITemplateRepository
    ) { }

    async execute(id: string, data: templateUpdateSchemaDTO) {
        if (!id) throw new BadRequestException('Id is required')
        
        const isTemplateExists = await this.repo.getUnique({id})
        if (!isTemplateExists) throw new NotFoundException('Template not found')

        const parsedData = updateTemplateSchema.safeParse(data)
        if (!parsedData.success) throw new BadRequestException("Bad Request")

        const updatedTemplate = await this.repo.update(id, {
            name: parsedData.data.name,
            contentHTML: parsedData.data.contentHTML
        });

        return updatedTemplate;
    }
}