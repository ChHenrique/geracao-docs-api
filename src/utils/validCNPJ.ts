export function isValidCNPJ(cnpj: string): boolean {
  cnpj = cnpj.replace(/\D/g, ''); // remove tudo que não é número
  if (cnpj.length !== 14) return false;
  if (/^(\d)\1+$/.test(cnpj)) return false; // rejeita números repetidos

  const calcDigit = (cnpj: string, factors: number[]) => {
    let total = 0;
    for (let i = 0; i < factors.length; i++) {
      total += parseInt(cnpj[i]) * factors[i];
    }
    const mod = total % 11;
    return mod < 2 ? 0 : 11 - mod;
  };

  const factors1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const factors2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  const digit1 = calcDigit(cnpj, factors1);
  const digit2 = calcDigit(cnpj, factors2);

  return digit1 === parseInt(cnpj[12]) && digit2 === parseInt(cnpj[13]);
}
