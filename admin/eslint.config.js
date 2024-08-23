import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginReact from 'eslint-plugin-react'

const developmentOff = process.env.NODE_ENV === 'development' ? 'off' : 'error'

export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  {
    settings: {
      react: {
        version: 'detect'
      }
    },
    languageOptions: {
      globals: { ...globals.browser, ...globals.node }
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
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
      'default-case': 'off',
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': developmentOff,
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-empty-function': developmentOff,
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/no-unused-expressions': 'off'
    }
  },
  {
    files: ['**/types.ts'],
    rules: {
      'no-unused-vars': 'off'
    }
  },
  {
    ignores: ['node_modules', 'dist', '**/fonts/**']
  }
]
