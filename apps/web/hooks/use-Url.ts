export const encodeHelper = (str: string) => {
  // console.log("------------", str);
  return encodeURIComponent(str.replace(/\s+/g, "-"));
};

export const decodeHelper = (str: string) => {
  return decodeURIComponent(str).replace(/-/g, " ");
};
