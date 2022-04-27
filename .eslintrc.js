module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: [
        'plugin:vue/vue3-essential',
        'eslint:recommended',
        '@vue/prettier',
        'prettier',
    ],
    plugins: ['prettier'],
    parserOptions: {
        parser: 'babel-eslint',
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'prettier/prettier': [
            'warn',
            {
                trailingComma: 'all',
                tabWidth: 4,
                singleQuote: true,
                bracketSpacing: true,
                eslintIntegration: true,
                plugins: ['@prettier/plugin-pug'],
                pugWrapAttributesThreshold: 0,
                pugAttributeSeparator: 'none',
                pugFramework: 'vue',
                pugSingleQuote: false,
                pugEmptyAttributes: 'none',
            },
        ],
    },
    overrides: [
        {
            files: [
                '**/__tests__/*.{j,t}s?(x)',
                '**/tests/unit/**/*.spec.{j,t}s?(x)',
            ],
            env: {
                jest: true,
            },
        },
    ],
};
