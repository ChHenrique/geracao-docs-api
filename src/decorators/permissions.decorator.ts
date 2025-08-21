import { SetMetadata } from "@nestjs/common"
import { permissionType } from "src/types/permissions.type"

// Chave da permissão
export const PERMISSION_KEYS = 'permissions'
// Decorator da permissão
export const Permissions = (...permissions: permissionType[]) => SetMetadata(PERMISSION_KEYS, permissions)