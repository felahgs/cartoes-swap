export const toKebabCase = (str: string) => str
  .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
  ?.join("-")
  .toLowerCase();

export const toCamelCase = (str: string) => str.trim()
  .replace(/[-_\s]+(.)?/g, (_, c) => c ? c.toUpperCase() : "");

export const formatCardNumber = (value: string | number) => {
  const str = value.toString()
    .replace(/\s+/g, "")
    .replace(/[^0-9]/gi, "");
  const matches = str.match(/\d{4,16}/g);
  const match = matches && matches[ 0 ] || "";
  const parts = [];

  for (let i=0, len=match.length; i<len; i+=4) {
    parts.push(match.substring(i, i+4));
  }

  if (parts.length) {
    return parts.join(" ");
  } else {
    return str;
  }
};

export const hideCardNumber = (card: string) => {
  const hideNum = [];
  for(let i = 0; i < card.length; i++){
    if(i < card.length-4){
      hideNum.push("*");
    }else{
      hideNum.push(card[ i ]);
    }
  }
  return hideNum.join("");
};

export const formatExpirationDate = (value = "") => {
  const clearValue = value.replace(/\D+/g, "");

  if (clearValue.length >= 3) {
    return `${clearValue.slice(0, 2)}/${clearValue.slice(2, 6)}`;
  }

  return clearValue;
};

export const formatToNumberOnly = (value: string) => value.replace(/[^0-9]/gi, "");

export const removeWhiteSpaces = (str: string) => {
  return str.trim().replace(/\s+/g, "");
};