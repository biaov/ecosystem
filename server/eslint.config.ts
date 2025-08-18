import eslint from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import { FlatCompat } from '@eslint/eslintrc'
import prettier from 'eslint-plugin-prettier'

const developmentOff = process.env.NODE_ENV === 'development' ? 'off' : 'error'
const compat = new FlatCompat()

export default tseslint.config(
  {
    files: ['./src/**/*.ts'],
    ignores: ['node_modules', 'dist'],
    plugins: {
      prettier
    }
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...compat.config({ extends: ['./typings/.eslintrc-auto-import.json'] }),
  {
    languageOptions: {
      globals: globals.node,
      sourceType: 'module',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname
      }
    }
  },
  {
    rules: {
      'no-console': developmentOff,
      '@typescript-eslint/no-unused-vars': developmentOff,
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-unsafe-function-type': 'off',
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-non-null-asserted-optional-chain': 'off',
      'no-fallthrough': 'off'
    }
  }
)
