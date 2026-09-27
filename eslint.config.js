import globals from "globals";
import pluginJs from "@eslint/js";
import jest from "eslint-plugin-jest";
import jsdoc from 'eslint-plugin-jsdoc';

export default [
  jsdoc.configs['flat/recommended'],
  {
    languageOptions: { 
        globals: {
            ...globals.browser,
            ...globals.node,
            ...globals.jest
        }
    },
    plugins: {
        jest: jest,
        jsdoc: jsdoc
    },
    rules: {
      'jsdoc/require-description': 'warn',
      'jsdoc/check-tag-names': ['error', {
        definedTags: ['jest-environment']
      }]
    }
  },
  {
    files: ['src/**/*.js'],
    rules: {
      'jsdoc/require-throws': 'warn',
      'jsdoc/informative-docs': 'warn',
      'jsdoc/require-jsdoc': ['warn', {
        require: { FunctionDeclaration: true, MethodDefinition: true, ClassDeclaration: true }
      }]
    }
  },
  pluginJs.configs.recommended,
];
