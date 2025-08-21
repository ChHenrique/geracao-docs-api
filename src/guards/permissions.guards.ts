import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { PERMISSION_KEYS } from "src/decorators/permissions.decorator";
import { IUserJWT } from "src/interfaces/user.interface";
import { permissionType } from "src/types/permissions.type";

// Decorator que faz o DI (Dependecy Injection)
@Injectable()
export class PermissionGuard implements CanActivate {
    // Atributo reflector (sendo possível pegar o valor dentro da rota)
    constructor(private reflector: Reflector){}

    // Método que verifica se no user tem a permissão
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        // Ler metadata
        const requiredPermissions = this.reflector.getAllAndOverride(PERMISSION_KEYS, [context.getHandler(), context.getClass()]);
        if (!requiredPermissions) return true;

        // req.user
        const req = context.switchToHttp().getRequest();
        const user: IUserJWT = req.user

        // Verifica se a permissão existe
        return requiredPermissions.some((perm: permissionType) => user?.permissions.includes(perm))
    }
}