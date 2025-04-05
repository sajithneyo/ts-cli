import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';

import jsPlugin from '@eslint/js';
import jsonPlugin from 'eslint-plugin-json';
import importPlugin from 'eslint-plugin-import';
import eslintPrettierPlugin from 'eslint-plugin-prettier/recommended';

const tsConfigs = tseslint.config({
    name: 'ts-cli/ts-rules',
    files: ['**/*.ts'],
    extends: [tseslint.configs.recommended, importPlugin.flatConfigs.typescript, eslintPrettierPlugin],
    languageOptions: {
        globals: {
            ...globals.jest,
            ...globals.node
        },
        parser: tseslint.parser,
        ecmaVersion: 'latest',
        sourceType: 'module',
        parserOptions: {
            project: ['./tsconfig.json']
        }
    },
    rules: {
        // Prettier
        'prettier/prettier': 'error',

        // Import rules
        'import/no-unresolved': 'error',
        'import/default': 'off',
        'import/no-extraneous-dependencies': 'off',

        // General JS/TS rules
        'no-underscore-dangle': 'off',
        'max-len': [
            'warn',
            {
                code: 120,
                tabWidth: 4,
                comments: 120,
                ignoreComments: false,
                ignoreTrailingComments: true,
                ignoreUrls: true,
                ignoreStrings: true,
                ignoreTemplateLiterals: true,
                ignoreRegExpLiterals: true
            }
        ],
        'class-methods-use-this': 'warn',
        'require-await': 'off',
        indent: 'off',
        'prefer-template': 'off',

        // TypeScript-specific rules
        '@typescript-eslint/indent': ['off', 4],
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/ban-types': 'off',
        '@typescript-eslint/naming-convention': [
            'error',
            {
                selector: 'variableLike',
                format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
                leadingUnderscore: 'allow'
            }
        ],
        '@typescript-eslint/restrict-template-expressions': [
            'error',
            {
                allowNumber: true,
                allowBoolean: false,
                allowAny: true,
                allowNullish: false
            }
        ],
        '@typescript-eslint/require-await': 'warn'
    }
});

export default defineConfig([
    importPlugin.flatConfigs.recommended,

    eslintPrettierPlugin,
    {
        name: 'ts-cli/json-rules',
        files: ['**/*.json'],
        extends: [jsonPlugin.configs.recommended]
    },
    {
        name: 'ts-cli/js-rules',
        files: ['**/*.{js,mjs,cjs}'],
        extends: [jsPlugin.configs.recommended, importPlugin.flatConfigs.recommended],
        languageOptions: {
            globals: {
                ...globals.jest,
                ...globals.node
            },
            ecmaVersion: 'latest',
            sourceType: 'module'
        }
    },
    ...tsConfigs,
    globalIgnores(['dist', '.yarn', 'eslint.config.mjs', 'jest.config.js'])
]);
