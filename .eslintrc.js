module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ["eslint:recommended", "plugin:react/recommended"],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: "module",
    },
    plugins: ["react"],
    rules: {
        "no-unreachable-loop": "error",
        "block-scoped-var": "error",
        "dot-location": [1, "property"],
        "no-empty-function": 1,
        "no-multi-spaces": 1,
        "no-undef": 0,
        "brace-style": [1, "1tbs", { allowSingleLine: true }],
        "comma-spacing": [1, { before: false, after: true }],
        "space-before-blocks": 1,
        "func-call-spacing": [1, "never"],
        indent: [1, 4],
        "key-spacing": [1, { beforeColon: false }],
        "arrow-spacing": [1, { before: true, after: true }],
        // suppress errors for missing 'import React' in files
        "react/react-in-jsx-scope": "off",
        // allow jsx syntax in js files (for next.js project)
        "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }], //should add ".ts" if typescript project
    },
};
