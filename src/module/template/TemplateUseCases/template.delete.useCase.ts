import type { ITemplateRepository } from "../templateDomain/template.repository";
import { BadRequestException, Inject, Injectable, NotFoundException, } from "@nestjs/common";

@Injectable()
export class DeleteTemplateUseCase {
    constructor(
        @Inject('ITemplateRepository') private repo: ITemplateRepository
    ) { }

    async execute(id: string) {
        if (!id) throw new BadRequestException('Id is required')

        const template = await this.repo.getUnique({ id });
        if (!template) throw new NotFoundException(`Template with id ${id} not found`);

        await this.repo.delete(id)
    }
}