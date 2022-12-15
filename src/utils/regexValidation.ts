/* eslint-disable no-useless-escape */
export const cardHolder = "[a-z A-Z- .]+";
export const cardNumberWhiteSpaces = "[0-9| ]{17,19}";
export const cardNumber = "[0-9| ]{14,19}";
export const expDate = "^(0[1-9]|1[0-2])\/?([[2][0][2-9][0-9])$";
export const cvc = "[0-9]{3,4}";
