/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  overrides: [
    {
      files: ['**/*.ts'],
      plugins: ['eslint-plugin-tsdoc'],
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
      ],
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/ban-ts-comment': 'warn',
        'tsdoc/syntax': 'warn',
      },
      parser: '@typescript-eslint/parser',
    },
    {
      files: ['**/__tests__/**/*.[tj]s', '**/*.{spec,test}.[tj]s'],
      env: {
        jest: true,
      },
      rules: {
        '@typescript-eslint/ban-ts-comment': 'off',
      },
    },
  ],
}
