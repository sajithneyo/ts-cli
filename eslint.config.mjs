import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';

import jsPlugin from '@eslint/js';
import jsonPlugin from 'eslint-plugin-json';
import pluginJest from 'eslint-plugin-jest';
import eslintPluginImportX from 'eslint-plugin-import-x';
import eslintPrettierPlugin from 'eslint-plugin-prettier/recommended';

const commonRules = {
    // Prettier
    'prettier/prettier': 'error',

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
    'prefer-template': 'off'
};

const tsConfigs = tseslint.config({
    name: 'ts-cli/ts-rules',
    files: ['**/*.ts'],
    extends: [tseslint.configs.recommended],
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
        '@typescript-eslint/require-await': 'warn',

        ...commonRules
    }
});

export default defineConfig([
    eslintPluginImportX.flatConfigs.recommended,
    eslintPluginImportX.flatConfigs.typescript,
    eslintPrettierPlugin,
    {
        name: 'ts-cli/json-rules',
        files: ['**/*.json'],
        extends: [jsonPlugin.configs.recommended]
    },
    {
        name: 'ts-cli/js-rules',
        files: ['**/*.{js,mjs,cjs}'],
        extends: [jsPlugin.configs.recommended],
        languageOptions: {
            globals: {
                ...globals.jest,
                ...globals.node
            },
            ecmaVersion: 'latest',
            sourceType: 'module'
        },
        rules: {
            ...commonRules
        }
    },
    ...tsConfigs,
    {
        files: ['**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}'],
        ignores: ['eslint.config.js', 'webpack.config.js'],
        languageOptions: {
            parser: tseslint.parser,
            ecmaVersion: 'latest',
            sourceType: 'module'
        },
        rules: {
            'no-unused-vars': 'off',
            'import-x/no-dynamic-require': 'warn',
            'import-x/no-nodejs-modules': 'warn'
        }
    },
    {
        files: ['**/*.spec.js', '**/*.test.js', '**/*.spec.ts', '**/*.test.ts'],
        plugins: { jest: pluginJest },
        languageOptions: {
            globals: pluginJest.environments.globals.globals
        },
        rules: {
            'jest/no-disabled-tests': 'warn',
            'jest/no-focused-tests': 'error',
            'jest/no-identical-title': 'error',
            'jest/prefer-to-have-length': 'warn',
            'jest/valid-expect': 'error'
        }
    },
    globalIgnores(['dist', '.yarn', 'eslint.config.mjs', 'jest.config.js'])
]);
