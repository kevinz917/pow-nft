module.exports = {
  printWidth: 120,
  singleQuote: true,
  trailingComma: 'es5',
  jsxBracketSameLine: false,
  semi: true,
  arrowParens: 'always',
  overrides: [
    {
      files: '*.scss',
      options: {
        singleQuote: false,
      },
    },
  ],
};
