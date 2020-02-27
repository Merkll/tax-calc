const calculateTaxByRate = (amount, rate) => {
  return (amount * (rate / 100)).toFixed(2);
};

export const calculateTaxFromDagrations = (amount: number, dagrations) => {
  const calculatedTax = dagrations.reduce((acc, dagration) => {
    const { balance, tax } = acc;
    const { monthlyAmount, rate } = dagration;

    const tmpBalance = balance - monthlyAmount;

    if (tmpBalance < 0) return acc;
    return { balance: tmpBalance, tax: calculateTaxByRate(monthlyAmount, rate) }

  }, { balance: amount, tax: 0 })

  return calculatedTax
};
