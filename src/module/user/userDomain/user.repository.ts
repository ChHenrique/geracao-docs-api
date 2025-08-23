import { UserEntitie } from './user.entities';

export interface IUserRepository {
  create(data: UserEntitie): Promise<UserEntitie | null>;
  update(id: string, data: UserEntitie): Promise<UserEntitie | null>;
  delete(id: string): Promise<void>;
  getById(id: string): Promise<UserEntitie | null>;
  getAll(): Promise<UserEntitie[] | null>;
  getByEmail(email: string): Promise<UserEntitie | null>;
  getByCPF(cpf: string): Promise<UserEntitie | null>;
  getByCNPJ(cnpj: string): Promise<UserEntitie | null>;
}
