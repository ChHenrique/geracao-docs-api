import { UserEntitie } from "./user.entities";

export interface IUserRepository {
    create(data: UserEntitie): Promise<UserEntitie | null>
    update(id: string, data: UserEntitie): Promise<UserEntitie | null>
    delete(id: string): Promise<void>
    getById(id: string): Promise<UserEntitie | null>;
    getAll(): Promise<UserEntitie[] | null> 
}