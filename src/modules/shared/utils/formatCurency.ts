export const formatCurrency = (value: number) => {
  return value === 0
    ? "Grátis"
    : new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
}