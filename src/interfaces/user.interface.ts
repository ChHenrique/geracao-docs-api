export interface IUserJWT {
    id: string,
    email: string,
    role: string[],
    permissions: string[]
}