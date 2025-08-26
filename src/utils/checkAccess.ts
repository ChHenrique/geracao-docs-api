import {
  ForbiddenException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

export async function checkAccess(req: Request, getUserById: Function, id: string) {
  const user = req.user;
  if (!user) throw new UnauthorizedException('Unauthorized');

  const permission = user.permissions.includes('MANAGE_USERS');
  const isSelfDelete = !id || id === user.id;

  if (!permission && !isSelfDelete)
    throw new ForbiddenException('Access Denied');
  const targetId = permission ?  (id === 'me' ? user.id : id ) : user.id

  const isUser = await getUserById(targetId);
  if (!isUser) throw new NotFoundException('This user does not exist');

  return isUser;
}
