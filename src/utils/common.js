export const toTitleCaseFromSnakeCase = (str) => {
  return str
    .split('_') // Split the string at each underscore
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
    .join(' '); // Join the words with spaces
};

export const debounce = (func, delay) => {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

export const currencyFormatter = (amount, options = {}) => {
  const { currencySymbol = '$', decimalPlaces = 1, useGrouping = true } = options;

  if (typeof amount !== 'number') {
    throw new TypeError('Amount must be a number');
  }

  // Check if the number has decimal places
  const hasDecimalPlaces = amount % 1 !== 0;
  const effectiveDecimalPlaces = hasDecimalPlaces ? decimalPlaces : 0;

  // Format the number to the specified decimal places
  const fixedAmount = amount.toFixed(effectiveDecimalPlaces);

  // Split into integer and decimal parts
  const [integerPart, decimalPart] = fixedAmount.split('.');

  // Format integer part with grouping (e.g., 1,234,567)
  const formattedInteger = useGrouping ? integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : integerPart;

  // Combine the formatted integer and decimal part
  return decimalPart ? `${currencySymbol}${formattedInteger}.${decimalPart}` : `${currencySymbol}${formattedInteger}`;
};
