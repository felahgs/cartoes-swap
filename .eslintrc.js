/* eslint-disable no-useless-escape */
module.exports = {
  env: {
    node: true,
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/jsx-runtime",
  ],
  overrides: [],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint", "eslint-plugin-import-helpers"],
  rules: {
    indent: ["error", 2],
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "object-curly-spacing": ["warn", "always"],
    "import-helpers/order-imports": [
      "warn",
      {
        newlinesBetween: "always",
        groups: [
          ["/^react$/", "/^react-dom/", "/^react-use$/"],
          ["/^react-bootstrap/"],
          ["module"],
          "/services/",
          ["/^pages/", "/^components/"],
          ["/^utils/"],
          ["parent", "sibling", "index"],
          ["/^styles/", "/^types/"],
        ],
        alphabetize: { order: "asc", ignoreCase: true }, // configures imports in alphabetical (ascending) order, ignoring case
      },
    ],
  },
};
