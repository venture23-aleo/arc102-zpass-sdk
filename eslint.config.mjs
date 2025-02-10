import globals from "globals";
import eslint from '@eslint/js';
import tseslint from "typescript-eslint";

export default [
    {
        languageOptions: { globals: { ...globals.browser, ...globals.node } },
    },
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
];