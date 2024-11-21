const typescriptParser = require("@typescript-eslint/parser");

module.exports = [
  {
    files: ["src/**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      parser: typescriptParser, // Use the TypeScript parser for .ts/.tsx files
      ecmaVersion: "latest", // Use the latest ECMAScript version
      sourceType: "module", // Use 'module' for ES module syntax
    },
    plugins: {
      react: require("eslint-plugin-react"),
      "@typescript-eslint": require("@typescript-eslint/eslint-plugin"),
      "react-hooks": require("eslint-plugin-react-hooks"), // Add this plugin for React hooks rules
    },
    rules: {
      "no-unused-vars": "off",
      "react/react-in-jsx-scope": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "off",

      // Enforce camelCase for variables and non-component functions
      camelcase: ["error", { properties: "always" }],
      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "variable",
          format: ["camelCase", "PascalCase"], // Variables should use camelCase
        },
        {
          selector: "function",
          format: ["camelCase", "PascalCase"], // Functions should use camelCase (non-component)
        },
        {
          selector: "typeLike",
          format: ["PascalCase"], // Type aliases, interfaces, classes should use PascalCase
        },
        {
          selector: "variableLike",
          format: ["camelCase", "PascalCase"],
          filter: {
            regex: "^__", // Prevent variables starting with "__"
            match: false,
          },
        },
        {
          // For React component functions (React components should follow PascalCase)
          selector: "function",
          format: ["camelCase", "PascalCase"],
          filter: {
            regex: "^([A-Z])", // This regex checks that function names starting with an uppercase letter are treated as components.
            match: true,
          },
        },
      ],

      // React Hooks naming convention (use<name>)
      "react-hooks/rules-of-hooks": "error", // Add this rule for hooks
      "react-hooks/exhaustive-deps": "warn", // Warn on missing dependency in useEffect

      // Ensure function names are camelCase
      "func-names": ["error", "as-needed"], // Require function names when needed (for clarity)

      // Ensure consistent use of semicolons
      semi: ["error", "always"],

      // Allow underscore dangle on variable names if needed (configurable)
      "no-underscore-dangle": "off",

      // Avoid unnecessary usage of var
      "no-var": "error",
      "prefer-const": "error",
    },
    settings: {
      react: {
        version: "detect", // Automatically detect React version
      },
    },
  },
];
