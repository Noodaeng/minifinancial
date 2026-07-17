import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import eslintConfigPrettier from 'eslint-config-prettier'
import pluginPrettier from 'eslint-plugin-prettier'

export default tseslint.config(
  // 1. Files to ignore completely
  {
    ignores: ['.quasar/**', 'dist/**', 'node_modules/**', 'src-quasar/**']
  },

  // 2. Base Configurations
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/recommended'],

  // 3. Setup Project Configuration
  {
    files: ['**/*.js', '**/*.ts', '**/*.vue'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        parser: tseslint.parser,
        extraFileExtensions: ['.vue']
      }
    },
    plugins: {
      prettier: pluginPrettier
    },
    rules: {
      // Integrate Prettier formatting into ESLint
      'prettier/prettier': 'error',

      // Quasar specific overrides (allows single-word page names like Index.vue)
      'vue/multi-word-component-names': 'off'
    }
  },

  // 4. Turns off all ESLint rules that might conflict with Prettier
  eslintConfigPrettier
)
