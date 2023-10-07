export const isNumberString = (value: any) => {
  return /^\d+$/.test(value);
};

export const getHeadersValue = (headers: string[][], key: string) => {
  const header = headers.find((header) => header[0] === key);
  return header ? header[1] : null;
};

