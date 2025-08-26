import type { ITemplateRepository } from "../templateDomain/template.repository";
import { BadRequestException, Inject, Injectable, NotFoundException, } from "@nestjs/common";

@Injectable()
export class GetUniqueTemplateUseCase {
    constructor(
        @Inject('ITemplateRepository') private repo: ITemplateRepository
    ) { }

    async execute(id: string) {
        if (!id) throw new BadRequestException('Id is required')
        const template = await this.repo.getUnique({id})

        if (!template) throw new NotFoundException('Templates not found');

        return template
    }
}