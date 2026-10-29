import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import stylistic from '@stylistic/eslint-plugin'
import imports from 'eslint-plugin-import'
import storybook from 'eslint-plugin-storybook'
import jsxA11y from 'eslint-plugin-jsx-a11y'

export default tseslint.config(
  storybook.configs['flat/recommended'],
  js.configs.recommended,
  tseslint.configs.strict,
  reactHooks.configs.flat.recommended,
  reactRefresh.configs.vite,
  imports.flatConfigs.recommended,
  jsxA11y.flatConfigs.recommended,
  {
    name: 'react-git-log',
    files: ['src/**/*.{ts,tsx}', '.storybook/**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      '@stylistic': stylistic
    },
    rules: {
      'semi': ['error', 'never'],
      '@typescript-eslint/semi': 'off',
      'object-curly-spacing': ['error', 'always'],
      'quotes': ['error', 'single'],
      'quote-props': ['error', 'as-needed'],
      'eqeqeq': ['error', 'always'],
      'no-console': ['error', { allow: ['error'] }],
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          ts: 'never',
          tsx: 'never',
          js: 'never',
          jsx: 'never',
          svg: 'always',
          json: 'always',
          'scss': 'always'
        },
      ]
    },
    ignores: ['**/dist'],
    settings: {
      "import/resolver": {
        typescript: {
          noWarnOnMultipleProjects: true,
          project: [
            './tsconfig.json',
          ]
        }
      }
    }
  },
  {
    name: 'react-git-log-test-overrides',
    files: ['src/**/*.spec.{ts,tsx}', 'src/widgets/git-graph/_test/**/*.{ts,tsx}'],
    rules: {
      'no-console': 'off'
    }
  }
)
