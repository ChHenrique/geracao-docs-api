import { IUserJWT } from 'src/interfaces/user.interface';

export function payloadJWT(user: any): IUserJWT {
  return {
    id: user.id,
    email: user.email,
    role: user.role.name,
    permissions: user.role.permissions.map((p) => p.name),
  };
}
