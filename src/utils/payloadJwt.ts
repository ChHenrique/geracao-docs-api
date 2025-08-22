import { IUserJWT } from "src/interfaces/user.interface";

export function payloadJWT(user: any): IUserJWT {
    return {
        id: user.id,
        email: user.email,
        role: user.role,           
        permissions: user.permissions 
    };
}
