import { UserEntitie } from './user.entities';
import { prisma } from 'src/config/prisma.config';
import { IUserRepository } from './user.repository';

export class UserPrismaRepository implements IUserRepository {
  async create(data: UserEntitie): Promise<UserEntitie | null> {
    const user = await prisma.user.create({
      data,
    });
    return user;
  }

  async update(id: string, data: UserEntitie): Promise<UserEntitie | null> {
     const { name, lastname, email, cpf, cnpj, password, roleId } = data;

    const updatedUser = await prisma.user.update({
      where: { id },
      data:  {
      name,
      lastname,
      email,
      cpf,
      cnpj,
      password,
      ...(roleId && { roleId }), 
    },
    });
    return updatedUser;
  }

  async delete(id: string): Promise<void> {
    await prisma.user.delete({
      where: { id },
    });
  }

  async getById(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        role: {
          include: {
            permissions: { include: { permission: true }},
          },
        },
        AuditLog: true,
        templates: true,
      },
    });


    return user;
  }

  async getAll(){
    const users = await prisma.user.findMany({
      include: {
        role: true,
        AuditLog: true,
        templates: true,
      },
    });
    return users;
  }

  async getByEmail(email: string): Promise<UserEntitie | null> {
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        role: {
          include: {
            permissions: { include: { permission: true }}
          }
        },
        AuditLog: true,
        templates: true,
      },
    });
    return user;
  }

  async getByCPF(cpf: string): Promise<UserEntitie | null> {
    const user = await prisma.user.findUnique({
      where: { cpf },
      include: {
        role: {
          include: {
            permissions: { include: { permission: true } }
          }
        },
        AuditLog: true,
        templates: true,
      },
    });
    return user;
  }

  async getByCNPJ(cnpj: string): Promise<UserEntitie | null> {
    const user = await prisma.user.findUnique({
      where: { cnpj },
      include: {
         role: {
          include: {
            permissions: { include: { permission: true } }
          }
        },
        AuditLog: true,
        templates: true,
      },
    });
    return user;
  }
}
