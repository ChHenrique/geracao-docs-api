import { UserEntitie } from "./user.entities";

import { prisma } from "src/config/prisma.config";
import { IUserRepository } from "./user.repository";

export class UserPrismaRepository implements IUserRepository {
    async create(data: UserEntitie): Promise<UserEntitie | null> {
        const user = await prisma.user.create({
            data
        });

        return user;
    }

    async update(id: string, data: UserEntitie): Promise<UserEntitie | null> {
        const updatedUser = await prisma.user.update({
            where: { id },
            data
        });

        return updatedUser;
    }

    async delete(id: string): Promise<void> {
        await prisma.user.delete({
            where: { id }
        });
    }

    async getById(id: string): Promise<UserEntitie | null> {
        const user = await prisma.user.findUnique({
            where: { id },
            include: {
                role: true,
                AuditLog: true,
                templates: true
            }
        });

        return user;
    }

    async getAll(): Promise<UserEntitie[] | null> {
        const user = await prisma.user.findMany({
            include: {
                role: true,
                AuditLog: true,
                templates: true
            }
        });

        return user;
    }
}
