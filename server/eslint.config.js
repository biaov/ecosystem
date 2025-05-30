import eslint from '@eslint/js'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import { FlatCompat } from '@eslint/eslintrc'

const developmentOff = process.env.NODE_ENV === 'development' ? 'off' : 'error'
const compat = new FlatCompat()

export default tseslint.config(
  {
    ignores: ['eslint.config.js', 'node_modules', 'dist']
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  ...compat.config({ extends: ['./typings/.eslintrc-auto-import.json'] }),
  {
    languageOptions: {
      globals: {
        ...globals.node
      },
      sourceType: 'commonjs',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname
      }
    }
  },
  {
    rules: {
      'no-unused-vars': developmentOff,
      'no-console': developmentOff,
      // '@typescript-eslint/no-unused-expressions': 'off',
      // '@typescript-eslint/no-unsafe-function-type': 'off',
      // '@typescript-eslint/no-namespace': 'off',
      // '@typescript-eslint/no-empty-object-type': 'off',
      // '@typescript-eslint/no-non-null-asserted-optional-chain': 'off'
    }
  }
)
