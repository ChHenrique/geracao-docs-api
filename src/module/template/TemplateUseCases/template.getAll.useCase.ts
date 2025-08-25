import type { ITemplateRepository } from "../templateDomain/template.repository";
import { Injectable, NotFoundException, } from "@nestjs/common";

@Injectable()
export class GetAllTemplateUseCase {
    constructor(
        private repo: ITemplateRepository
    ) { }

    async execute() {
        const templates = await this.repo.getAll()

        if (!templates || templates.length <= 0) throw new NotFoundException('No templates were created');

        return templates
    }
}