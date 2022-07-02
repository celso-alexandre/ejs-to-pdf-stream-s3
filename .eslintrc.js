module.exports = {
  env: {
    es2021: true,
    node: true,
    jest: true,
  },
  extends: ['airbnb-typescript/base', 'plugin:prettier/recommended'],
  plugins: ['deprecation', 'import', '@typescript-eslint', 'eslint-plugin-prettier', 'only-warn'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts', '.d.ts'],
      },
    },
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module',
  },
  ignorePatterns: ['node_modules/*', 'dist/*'],
  rules: {
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        ts: 'never',
        'd.ts': 'never',
      },
    ],
    '@typescript-eslint/dot-notation': 'off',
    '@typescript-eslint/no-implied-eval': 'off',
    '@typescript-eslint/no-throw-literal': 'off',
    '@typescript-eslint/return-await': 'off',

    'import/prefer-default-export': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'import/no-self-import': 'off',
    'class-methods-use-this': 'off',
    'max-len': 'off',
    indent: 'off',
    'eol-last': ['error', 'always'],
    camelcase: 'off',
    'no-restricted-syntax': 'off',
    'no-await-in-loop': 'off',
    'no-bitwise': 'off',
    'deprecation/deprecation': 'warn',
  },
  parserOptions: {
    project: ['./tsconfig.json'],
  },
};
