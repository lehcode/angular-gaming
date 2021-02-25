module.exports = {
  root: true,
  ignorePatterns: ['coverage/**/*', 'src/assets/fonts', 'src/locale', 'node_modules'],
  // plugins: ['html'],
  settings: {
    'html/html-extensions': ['.html'],
    'html/indent': '0',
    'html/report-bad-indent': 'error',
  },
  rules: {
    'array-bracket-newline': ['error', { minItems: 2 }],
    'array-element-newline': ['error', { minItems: 2 }],
    'quote-props': ['error', 'consistent-as-needed'],
    semi: 'error',
  },
  extends: [
    "./node_modules/gts/",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended"
  ],
  overrides: [
    {
      files: ['*.ts'],
      parserOptions: {
        project: ['tsconfig.eslint.json'],
        createDefaultProgram: true,
      },
      extends: [
        'plugin:@angular-eslint/ng-cli-compat',
        'plugin:@angular-eslint/ng-cli-compat--formatting-add-on',
        'plugin:@angular-eslint/template/process-inline-templates',
      ],
      rules: {
        'id-length': ['warn', { min: 2 }],
        'newline-per-chained-call': ['error', { ignoreChainWithDepth: 2 }],
        '@angular-eslint/component-selector': [
          'error',
          {
            type: 'element',
            prefix: 'app',
            style: 'kebab-case',
          },
        ],
        '@angular-eslint/directive-selector': [
          'error',
          {
            type: 'attribute',
            prefix: 'app',
            style: 'camelCase',
          },
        ],
        '@typescript-eslint/quotes': ['warn', 'single', { allowTemplateLiterals: true }],
      },
    },
    {
      files: ["*.component.html"],
      extends: ["plugin:@angular-eslint/template/recommended"],
      rules: {
        "max-len": ["error", { "code": 140 }]
      }
    },
    {
      files: ["*.component.ts"],
      extends: ["plugin:@angular-eslint/template/process-inline-templates"]
    },
    {
      files: ['*.js'],
      extends: ['plugin:@angular-eslint/template/recommended'],
      rules: {
        quotes: ['error', 'double'],
      },
    },
    {
      files: ['src/**/*.spec.ts', 'src/**/*.d.ts'],
      parserOptions: {
        project: './src/tsconfig.spec.json',
      },
      extends: ['plugin:jasmine/recommended'],
      plugins: ['jasmine'],
      env: { jasmine: true },
      rules: {
        '@typescript-eslint/no-unused-vars': 'off'
      }
    }
  ],
};
