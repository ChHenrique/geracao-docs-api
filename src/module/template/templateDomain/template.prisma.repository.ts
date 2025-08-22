import { Prisma } from "@prisma/client";
import { TemplateEntity } from "./template.entities";
import { ITemplateRepository } from "./template.repository";
import { prisma } from "src/config/prisma.config";


export class TemplatePrismaRepository implements ITemplateRepository {

    // get unique aceita id ou nome
    async getUnique(whereUniqueInput: Prisma.TemplateWhereUniqueInput): Promise<TemplateEntity | null> {
        const template = await prisma.template.findUnique({
            where: whereUniqueInput,
        });

        return template;
    }

    async getAll(): Promise<TemplateEntity[]> {
        const templates = await prisma.template.findMany()

        return templates;
    }

    async create(data: TemplateEntity): Promise<TemplateEntity> {
        const template = await prisma.template.create({
            data: data
        })

        return template;
    }

    async update(id: string, data: Partial<TemplateEntity>): Promise<TemplateEntity | null> {
        const updatedTemplate = await prisma.template.update({
            where: { id },
            data: {
                ...data
            }
        });

        return updatedTemplate
    }

    async delete(id: string): Promise<void> {
        await prisma.template.delete({
            where: { id }
        })
    }
}