module.exports = {
  singleQuote: false,
  semi: true,
  tabWidth: 2,
  useTabs: false,
  trailingComma: 'none',
  printWidth: 120,
  overrides: [
    {
      files: ['*.html'],
      options: {
        useTabs: true,
        tabWidth: 4,
      },
    },
    {
      files: ['*.js'],
      options: {
        trailingComma: 'es5',
        singleQuote: true,
      },
    },
    {
      files: ['*.ts'],
      options: {
        parser: 'typescript',
        singleQuote: true,
      },
    },
    {
      files: ['*.json'],
      options: {
        parser: 'json',
        tabWidth: 4,
      },
    },
    {
      files: ['*.yml'],
      options: {
        parser: 'yaml',
        tabWidth: 4,
      },
    },
    {
      files: ['*.scss'],
      options: {
        parser: 'scss',
        tabWidth: 4,
      },
    },
  ],
};
