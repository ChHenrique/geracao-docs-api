export class UserEntitie {
  constructor(
    public name: string,
    public lastname: string,
    public password: string,
    public email: string,
    public cpf: string,
    public cnpj: string | null,
    public roleId: string,
  ) {}
}
