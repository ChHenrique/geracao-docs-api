import {
  ForbiddenException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

export async function checkAccess(req: Request, getUserById: Function) {
  const user = req.user;
  if (!user) throw new UnauthorizedException('Unauthorized');

  const { id } = req.params as { id: string }

  const permission = user.permissions.includes('MANAGE_USERS');
  const isSelfDelete = !id || id === user.id;

  if (!permission && !isSelfDelete)
    throw new ForbiddenException('Acess Denied');
  const targetId = permission ? id || user.id : user.id;

  const isUser = await getUserById(targetId);
  if (!isUser) throw new NotFoundException('This user does not exist');

  return isUser;
}
