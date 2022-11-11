export const formatNumber = (number, prefix) =>{
  const beforeDecimalPoint = number.toString().split('.')[0];
  const afterDecimalPoint = number.toString().split('.')[1];
  const hasAfterDecimalPoint = !!afterDecimalPoint;
  const localeBeforeDecimalPoint = Number(beforeDecimalPoint).toLocaleString()
  return (!prefix ? localeBeforeDecimalPoint: `${prefix}${localeBeforeDecimalPoint}`) + (hasAfterDecimalPoint ? `.${afterDecimalPoint}` : '');
}

export const shorten = (address, head = 6, tail = 6) => {
  if (typeof address !== 'string') return address;
  return address.slice(0, head) + '...' + address.slice(address.length - tail);
};

export * from './formatTwoDigits';
export * from './isNumeric';
