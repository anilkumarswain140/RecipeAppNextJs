module.exports = {
  rules: {
    "type-enum": [
      2,
      "always",
      ["fix", "feat", "docs", "style", "refactor", "test", "chore"],
    ],
    "type-case": [2, "always", "lower-case"], // Enforce lower-case for types
    "type-empty": [2, "never"], // Type cannot be empty
    "subject-empty": [2, "never"], // Subject cannot be empty
    "subject-case": [2, "always", "sentence-case"], // Enforce sentence case for the subject
    "header-max-length": [2, "always", 72], // Limit the header to 72 characters
  },
};
