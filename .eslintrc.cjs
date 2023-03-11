module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        // "eslint:recommended",
        "plugin:vue/essential",
        "@vue/eslint-config-airbnb",
        "plugin:@typescript-eslint/recommended"
    ],
    "parserOptions": {
        "ecmaVersion": 13,
        "parser": "@typescript-eslint/parser",
        "sourceType": "module"
    },
    "plugins": [
        "vue",
        "@typescript-eslint"
    ],
    "rules": {
        "vue/no-multiple-template-root": "off",
        // This rule enforces a maximum line length to increase code readability
        // and maintainability. The length of a line is defined as the number of Unicode characters in the line.
        "max-len": [ "error", { "code": 120, "tabWidth": 4, "ignoreUrls": true } ],
        // This rule enforces the consistent use of either backticks, double, or single quotes.
        "quotes": [ "warn", "double", { allowTemplateLiterals: true } ],
        // This rule enforces a consistent indentation style.
        "indent": [ "error", 4, { "ignoredNodes": ['JSXElement' ] } ],
        // This rule will warn when it encounters a reference to an identifier that has not yet been declared.
        "no-use-before-define": "off",
        // This rule aims to eliminate shadowed variable declarations. Shadowing is the process by
        // which a local variable shares the same name as a variable in its containing scope.
        "no-shadow": "off",
        // This rule is aimed at eliminating unused variables, functions, and function parameters.
        "no-unused-vars": "warn", // changed
    },
    settings: {
        "import/resolver": {
            node: {
                extensions: [".ts",".vue"]
            }
        }
    },
    "parser": "vue-eslint-parser",
    "globals": {
        "defineProps": "readonly"
    }
}
