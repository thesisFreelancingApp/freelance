export const encodeHelper = (str: string) => {
  // console.log("------------", str);
  return encodeURIComponent(str);
};

export const decodeHelper = (str: string) => {
  return decodeURIComponent(str);
};
