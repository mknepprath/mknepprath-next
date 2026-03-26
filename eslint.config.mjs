import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import cypressPlugin from "eslint-plugin-cypress";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [{
    ignores: ["**/*.css"],
}, ...fixupConfigRules(compat.extends(
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
)), {
    plugins: {
        cypress: cypressPlugin,
    },
    rules: {
        "cypress/no-assigning-return-values": "error",
        "cypress/no-unnecessary-waiting": "error",
        "cypress/no-async-tests": "error",
        "cypress/unsafe-to-chain-command": "error",
    },
}, {
    plugins: {
        "@typescript-eslint": fixupPluginRules(typescriptEslint),
    },

    languageOptions: {
        globals: {
            ...globals.browser,
            module: "writable",
            process: "writable",
            require: "writable",
            Atomics: "readonly",
            React: "writable",
            SharedArrayBuffer: "readonly",
        },

        parser: tsParser,
        ecmaVersion: 2018,
        sourceType: "module",

        parserOptions: {
            ecmaFeatures: {
                jsx: true,
            },
        },
    },

    settings: {
        react: {
            version: "detect",
        },
    },
}, {
    // React Three Fiber uses custom JSX props (args, attach, etc.)
    files: ["core/404-scene.tsx"],
    rules: {
        "react/no-unknown-property": "off",
        "@typescript-eslint/no-explicit-any": "off",
    },
}];