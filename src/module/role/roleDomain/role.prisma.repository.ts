import { Role } from "@prisma/client";
import { IRoleRepository } from "./role.repository";
import { prisma } from "src/config/prisma.config";
import { insensitiveUserData } from "src/interfaces/insensitive.userData";

export class IRolePrismaRepository implements IRoleRepository {
    async create(name: string): Promise<Role | null> {
        const role = await prisma.role.create({
            data: {name},
        })
    
        return role;
    }

    async update(id: string, name: string): Promise<Role | null> {
        const updatedRole = await prisma.role.update({
            where: {id},
            data: {name}
        })

        return updatedRole;
    }

    
    async delete(id: string): Promise<void> {
        await prisma.role.delete({
            where: {id}
        });
    }

    async getById(id: string): Promise<Role | null> {
        const role = await prisma.role.findUnique({
            where: { id },
            include: {
                users: {
                    select: insensitiveUserData
                },
                permissions: true
            }
        })

        return role
    }

    async getByName(name: string): Promise<Role | null> {
        const role = await prisma.role.findUnique({
            where: { name },
            include: {
                users: {
                    select: insensitiveUserData
                },
                permissions: true
            }
        })

        return role
    }

    async getAll(): Promise<Role[] | null> {
        const roles = await prisma.role.findMany({
             include: {
                users: {
                    select: insensitiveUserData
                },
                permissions: true
            }
        });

        return roles
    }
}
