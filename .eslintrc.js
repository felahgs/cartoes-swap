module.exports = {
  "env": {
    "node": true,
    "browser": true,
    "es2021": true,
    "jest": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/jsx-runtime"
  ],
  "overrides": [
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": [
    "react",
    "@typescript-eslint",
    "eslint-plugin-import-helpers"
  ],
  "rules": {
    "indent": [
      "error",
      2
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "error",
      "double"
    ],
    "semi": [
      "error",
      "always"
    ],
    "import-helpers/order-imports": [
      "warn",
      { 
        newlinesBetween: "always",
        groups: [
          ["/^react/"],
          "module",
          ["/^pages/", "/^components/"],
          ["parent", "sibling", "index"],
          ["/^styles/", "/^types/"]
        ],
      },
    ],
  }
};
