// 0.00
export function maskCurrency(value: string) {
  const cleanValue = value.replace(/\D/g, '');

  if (!cleanValue || cleanValue.length === 0) {
    return '';
  }

  const floatValue = parseFloat(cleanValue) / 100;

  const formattedValue = floatValue.toLocaleString('pt-BR', {
    currency: 'BRL',
    minimumFractionDigits: 2,
  });

  return formattedValue.replace(",", ".");
};

// 000.000.000-00
export function maskCPF(value: string) {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1")
}

// (00) 00000-0000
export function maskPhone(value: string) {
  return value
    .replace(/\D/g, "")
    .substring(0, 11)
    .replace(/^(\d{2})(\d)/g, "($1) $2")
    .replace(/(\d)(\d{4})$/, "$1-$2");
}

// 00000-000
export function maskCEP(value: string) {
  return value.replace(/\D/g, "").replace(/^(\d{5})(\d{3})+?$/, "$1-$2")
}

// 00/00/0000
export function maskDate(value: string) {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "$1/$2")
    .replace(/(\d{2})(\d)/, "$1/$2")
    .replace(/(\d{4})(\d)/, "$1")
}

// Aceita apenas que letras sejam digitadas
export function maskOnlyLetters(value: string) {
  return value.replace(/[0-9!@#¨$%^&*)(+=._-]+/g, "")
}

// Aceita apenas números
export function maskOnlyNumbers(value: string) {
  return value.replace(/\D/g, "")
}


function RegexNumber(value: string) {
  return value
    .replace(/\D/g, "")
    .replace(/[.,]/g, "")
}