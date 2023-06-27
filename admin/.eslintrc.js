const developmentOff = process.env.NODE_ENV === 'development' ? 'off' : 'error'
// 配置信息
const config = {
  env: {
    browser: true,
    es6: true
  },
  globals: {},
  extends: ['plugin:react/recommended', 'airbnb-base', 'plugin:prettier/recommended', 'plugin:@typescript-eslint/recommended'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 14,
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: ['react', 'react-hooks', '@typescript-eslint'],
  settings: {
    react: {
      version: 'detect'
    }
  },
  rules: {
    'no-unused-vars': developmentOff, // 禁止未使用的变量
    'no-console': developmentOff, // 禁止 console
    'no-unused-expressions': [
      'error',
      {
        allowShortCircuit: true, // 允许短路逻辑
        allowTernary: true // 允许三目运算
      }
    ],
    'import/prefer-default-export': 'off', // 如果只有一个值，要用 default 导出
    'import/no-unresolved': 'off', // import 识别路径，因为 alias 设置
    'import/extensions': 'off', // 扩展简写
    'no-param-reassign': 'off', // 函数参数修改
    'no-plusplus': 'off', // 一元操作符
    'no-nested-ternary': 'off', // 禁用嵌套的三元表达式
    'no-bitwise': 'off', // 禁用按位运算符
    'no-multi-assign': 'off', // 禁止连续赋值
    'no-restricted-exports': 'off', // 禁止默认导出
    'vue/multi-word-component-names': 'off', // 禁止多个单词名称
    'default-case': 'off', // switch...case 一定要有 default
    'react/react-in-jsx-scope': 'off', // 一定要引入 React
    "@typescript-eslint/no-explicit-any": 'off' // display-name 属性
    // 'prettier/prettier': 'error',
    // 'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    // 'react/jsx-props-no-spreading': 'off',
    // 'react/prop-types': 'off',
    // 'react-hooks/rules-of-hooks': 'error',
    // 'react-hooks/exhaustive-deps': 'warn'
  }
}

module.exports = config
