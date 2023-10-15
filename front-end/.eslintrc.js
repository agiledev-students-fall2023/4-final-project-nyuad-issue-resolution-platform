module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'standard',
    'plugin:react/recommended'
  ],
  overrides: [
    {
      env: {
        node: true
      },
      files: [
        '.eslintrc.{js,cjs}'
      ],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'react'
  ],
  rules: {
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    'semi': [
      'error',
      'always'
    ],
    'no-var': [
      'error',
    ],
    'prefer-const': ['warn', {
      'destructuring': 'any',
      'ignoreReadBeforeAssign': false
    }],
    'curly': ['warn'],
    'eqeqeq': ['error'],
    'no-multi-spaces': ['warn'],
    'no-lone-blocks': ['error'],
    'no-self-compare': ['error'],
    'no-unused-expressions': ['error'],
    'no-useless-call': ['error'],
    'no-use-before-define': ['warn'],

    'camelcase': ['warn', { properties: 'never' }],
    'func-call-spacing': ['off'],
    'no-lonely-if': ['off'],
    'array-bracket-spacing': ['warn'],

    'no-console': ['off'],
    "space-before-function-paren": ["warn"],
    "quotes": ["off"],
    "indent": "off"
  }
}
