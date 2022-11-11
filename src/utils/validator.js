export const isValidEmail = (string) => {
  return /^[\w.-]{1,}@[\w-]{2,}(.[\w-]{2,}){1,}$/.test(string);
};

export const isValidAddress = (string) => {
  return /^0x[0-9a-fA-F]{40}$/.test(string);
};

export const isValidTransID = (string) => {
  return /^0x[0-9a-fA-F]{64}$/.test(string);
};
