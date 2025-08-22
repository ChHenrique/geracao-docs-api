import { Role } from "@prisma/client";

export interface IRoleRepository {
    create(name: string): Promise<Role | null>
    update(id: string, name: string): Promise<Role | null>
    delete(id: string): Promise<void>
    getById(id: string): Promise<Role | null>
    getAll(): Promise<Role[] | null> 
    getByName(name: string): Promise<Role | null>
}