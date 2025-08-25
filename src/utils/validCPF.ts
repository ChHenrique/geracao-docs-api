export function isValidCPF(cpf: string): boolean {
  cpf = cpf.replace(/\D/g, '')

  if (cpf.length !== 11) return false;
  if (/^(\d)\1+$/.test(cpf)) return false;

  const calcDigit = (cpf: string, factor: number) => {
    let total = 0;
    for (let i = 0; i < factor - 1; i++) {
      total += parseInt(cpf[i]) * (factor - i);
    }
    const mod = (total * 10) % 11;
    return mod === 10 ? 0 : mod;
  };

  const digit1 = calcDigit(cpf, 10);
  const digit2 = calcDigit(cpf, 11);

  return digit1 === parseInt(cpf[9]) && digit2 === parseInt(cpf[10]);
}
