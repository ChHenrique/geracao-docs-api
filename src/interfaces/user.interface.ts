import { permissionType } from "src/types/permissions.type";

export interface IUserJWT {
    id: string,
    email: string,
    role: string[],
    permissions: permissionType[]
}