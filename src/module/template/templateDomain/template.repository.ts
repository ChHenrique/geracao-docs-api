import { TemplateEntity } from "./template.entities";
import { Prisma } from "@prisma/client";

export interface ITemplateRepository {
    getUnique(where: Prisma.TemplateWhereUniqueInput): Promise<TemplateEntity | null>;
    getAll(): Promise<TemplateEntity[]>;
    create(data: TemplateEntity): Promise<TemplateEntity>;
    update(id: string, data: Partial<TemplateEntity>): Promise<TemplateEntity | null>;
    delete(id: string): Promise<void>;
}