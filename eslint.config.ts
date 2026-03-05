import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

export default [
  js.configs.recommended,

  ...tseslint.configs.recommended, // ✅ correct way

  {
    files: ['**/*.{ts,tsx}'],
    ignores: ['dist', 'node_modules'],

    languageOptions: {
      parser: tseslint.parser,
      globals: globals.browser,
    },

    plugins: {
      react,
      'react-hooks': reactHooks,
    },

    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,

      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
    },

    settings: {
      react: {
        version: 'detect',
      },
    },
  },

  prettier,
];
