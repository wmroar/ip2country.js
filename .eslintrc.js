module.exports = {
    env: {
        node: true,
        commonjs: true,
        es6: true,
    },
    extends: ["eslint:recommended", "prettier"],
    overrides: [],
    parserOptions: {
        ecmaVersion: "latest",
    },
    rules: {
        "wrap-iife": ["error", "any", { functionPrototypeMethods: true }],
        "brace-style": ["error", "1tbs", { allowSingleLine: false }],
        "max-len": ["error", { code: 160, ignoreUrls: true, ignoreStrings: true }],
        "no-mixed-operators": "error",
        "no-unexpected-multiline": "error",
        "quotes": ["error", "double", { avoidEscape: true, allowTemplateLiterals: false }],
        "curly": ["error", "all"],
        // "consistent-return": "error",
        "indent": ["error", 4],
        "semi": ["error", "always"],
        "space-unary-ops": 2,
        "eqeqeq": ["error", "always", {"null": "ignore"}],
        "array-bracket-newline": ["error", { "multiline": true }],
        "array-bracket-spacing": ["error", "never"],
        "block-spacing": ["error", "always"],
        "comma-dangle": ["error", "only-multiline"],
        "comma-spacing": ["error", { "before": false, "after": true }],
        "comma-style": ["error", "last"],
        "dot-location": ["error", "property"],
        "computed-property-spacing": ["error", "never"],
        "function-paren-newline": ["error", { "minItems": 8}],
        "key-spacing": ["error", {"mode": "strict" }],
        "newline-per-chained-call": ["error", { "ignoreChainWithDepth": 4 }],
        "no-whitespace-before-property": "error"
    },
};
// you can find details in below link
// https://eslint.org/docs/latest/rules/
