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

export const isExpired = (issuedAt, expiresIn) => {
  const currentTime = Math.floor(Date.now() / 1000);
  const expirationTime = issuedAt + expiresIn; // 15 second to expire
  // const expirationTime = issuedAt + expiresIn / 2 / 262800 / 4; // 15 second to expire
  return currentTime >= expirationTime;
};

export const decodeJWT = (token) => {
  const payload = token.split('.')[1];
  const decodedPayload = atob(payload);
  return JSON.parse(decodedPayload);
};
