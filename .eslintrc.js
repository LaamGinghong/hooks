module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'plugin:eslint-comments/recommended',
    'plugin:unicorn/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts', '.js', '.json'],
      },
      typescript: {},
    },
  },
  rules: {
    'prettier/prettier': 'error',
    'unicorn/filename-case': ['error', { cases: { camelCase: true, kebabCase: true } }],
    'unicorn/prevent-abbreviations': [
      'error',
      {
        replacements: {
          params: {
            parameters: false,
          },
          dir: {
            directory: false,
            direction: false,
          },
        },
      },
    ],
    'import/extensions': [
      2,
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never',
        json: 'never',
        js: 'never',
      },
    ],
    'no-useless-constructor': 'off',
    '@typescript-eslint/no-useless-constructor': 'error',
  },
  overrides: [
    {
      files: ['**/*.d.ts'],
      rules: {
        'import/no-duplicates': 'off',
      },
    },
    {
      files: ['scripts/**/*.ts'],
      rules: {
        'no-console': 'off',
        'import/no-extraneous-dependencies': 'off',
        'unicorn/no-process-exit': 'off',
        'unicorn/import-style': 'off',
        'unicorn/prevent-abbreviations': 'off',
      },
    },
  ],
}
