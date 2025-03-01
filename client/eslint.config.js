import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true }
      ],
      '@typescript-eslint/consistent-type-imports': 'error', // Enforces consistent usage of type imports
      '@typescript-eslint/no-explicit-any': 'error', // Disallows usage of the `any` type
      '@typescript-eslint/no-unused-vars': 'error', // Disallows unused variables
      '@typescript-eslint/no-empty-function': 'error', // Disallows empty functions
      'func-style': ['error', 'expression'], // Enforces the use of function expressions for defining functions
      'no-redeclare': 'error',
      'sort-imports': [
        'error',
        {
          ignoreCase: true, // Ignores case while sorting imports
          ignoreDeclarationSort: true, // Ignores sorting of import declarations
          ignoreMemberSort: false // Enforces sorting of members within import declarations
        }
      ]
    }
  }
)
