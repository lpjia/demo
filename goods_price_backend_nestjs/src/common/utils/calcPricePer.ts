import Big from 'big.js';

export function calcPricePerByPrice(spec: string, price: string): string | undefined {
  const match = spec.match(/(\d+\.?\d*)\s*(ml|L|g|kg)/i);
  if (!match) {
    return;
  }

  const value = parseFloat(match[1]);
  const unit = match[2].toLowerCase();
  const priceNum = parseFloat(price);

  if (Number.isNaN(value) || Number.isNaN(priceNum) || value === 0) {
    return;
  }

  let pricePerUnit = 0;
  let unitLabel = '';

  if (unit === 'ml' || unit === 'l') {
    const liters = unit === 'ml' ? value / 1000 : value;
    pricePerUnit = priceNum / liters;
    unitLabel = '元/L';
  }
  else if (unit === 'g' || unit === 'kg') {
    const kgs = unit === 'g' ? value / 1000 : value;
    pricePerUnit = priceNum / kgs;
    unitLabel = '元/kg';
  }

  return new Big(pricePerUnit).toFixed(2) + ' ' + unitLabel;
}