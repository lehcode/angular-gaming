module.exports = {
  root: true,
  ignorePatterns: ['coverage/**/*', 'src/assets/fonts', 'src/locale', 'node_modules', '**/*.js', ".eslintrc.js"],
  plugins: ['html'],
  settings: {
    'html/html-extensions': ['.html'],
    'html/indent': '0',
    'html/report-bad-indent': 'error',
  },
  rules: {
    "array-bracket-newline": ["warn", "consistent"],
    "array-bracket-spacing": ["warn", "never"],
    "array-element-newline": ["warn", "consistent"],
    "computed-property-spacing": ["error", "never", { enforceForClassMembers: true }],
    "function-call-argument-newline": ["warn", "consistent"],
    "function-paren-newline": ["warn", "consistent"],
    "id-length": ["warn", { min: 2 }],
    "indent": ["error", 2, {
      CallExpression: { "arguments": "first" },
      FunctionDeclaration: { "body": 1, "parameters": 2 },
      FunctionExpression: { "body": 1, "parameters": 2 },
      // SwitchCase: 1
    }],
    "keyword-spacing": ["warn", { before: true, after: true }],
    "lines-between-class-members": "off",
    "max-lines": [
      "error",
      {
        max: 500,
        skipBlankLines: true,
        skipComments: true,
      },
    ],
    "newline-per-chained-call": ["warn", { ignoreChainWithDepth: 1 }],
    "object-curly-spacing": ["warn", "always", {
      arraysInObjects: false,
      objectsInObjects: false
    }],
    "object-property-newline": ["warn", { allowAllPropertiesOnSameLine: true }],
    "quotes": ["error", "double"],
    "quote-props": ["error", "consistent"],
    "semi": "error",
    "space-before-blocks": ["warn", "always"]
  },
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended"
  ],
  parser: "@typescript-eslint/parser",
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
        'plugin:@angular-eslint/template/process-inline-templates'
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
        "no-multiple-empty-lines": ["warn", { "max": 2,
          "maxBOF": 0,
          "maxEOF": 1 }],
        "quotes": ["error", "single"],
        "@typescript-eslint/ban-ts-comment": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/explicit-module-boundary-types": "warn",
        "@typescript-eslint/lines-between-class-members": "warn",
        "@typescript-eslint/quotes": ["warn", "single", { allowTemplateLiterals: true }],
        "@typescript-eslint/type-annotation-spacing": ["warn", {
          "before": false,
          "after": true,
          "overrides": {
            arrow: {
              before: true,
              after: true
            }
          }
        }]
      },
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
        project: 'tsconfig.spec.json',
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
