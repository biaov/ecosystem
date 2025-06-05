import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import prettier from 'eslint-plugin-prettier'
import { FlatCompat } from '@eslint/eslintrc'

const developmentOff = process.env.NODE_ENV === 'development' ? 'off' : 'error'
const compat = new FlatCompat()

export default [
  {
    files: ['src/**/*.{js,ts,vue}'],
    plugins: {
      prettier
    }
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      },
      parserOptions: {
        parser: tseslint.parser
      }
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  ...compat.config({ extends: ['./types/.eslintrc-auto-import.json'] }),
  {
    rules: {
      'no-unused-vars': developmentOff,
      'no-console': developmentOff,
      'no-unused-expressions': ['error', { allowShortCircuit: true, allowTernary: true }],
      'import/prefer-default-export': 'off',
      'import/no-unresolved': 'off',
      'import/extensions': 'off',
      'no-param-reassign': 'off',
      'no-plusplus': 'off',
      'no-nested-ternary': 'off',
      'no-bitwise': 'off',
      'no-multi-assign': 'off',
      'no-restricted-exports': 'off',
      'vue/multi-word-component-names': 'off',
      'import/no-extraneous-dependencies': 'off',
      'vue/valid-attribute-name': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-unsafe-function-type': 'off',
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-non-null-asserted-optional-chain': 'off'
    }
  },
  {
    files: ['**/components/*.vue'],
    rules: {
      'vue/multi-word-component-names': 'error'
    }
  },
  {
    files: ['**/types.ts', '**/*.d.ts'],
    rules: {
      'no-unused-vars': 'off',
      'no-shadow': 'off',
      '@typescript-eslint/no-explicit-any': 'off'
    }
  },
  {
    ignores: ['node_modules', 'dist']
  }
]
