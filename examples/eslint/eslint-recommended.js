module.exports = {
  rules: {
    "constructor-super": "error", // ts(2335) & ts(2377)
    "for-direction": "error",
    "getter-return": "error", // ts(2378)
    "no-async-promise-executor": "error",
    "no-case-declarations": "error",
    "no-class-assign": "error",
    "no-compare-neg-zero": "error",
    "no-cond-assign": "error",
    "no-const-assign": "error", // ts(2588)
    "no-constant-condition": "error",
    "no-control-regex": "error",
    "no-debugger": "error",
    "no-delete-var": "error",
    "no-dupe-args": "error", // ts(2300)
    "no-dupe-class-members": "error", // ts(2393) & ts(2300)
    "no-dupe-else-if": "error",
    "no-dupe-keys": "error", // ts(1117)
    "no-duplicate-case": "error",
    "no-empty": "error",
    "no-empty-character-class": "error",
    "no-empty-pattern": "error",
    "no-ex-assign": "error",
    "no-extra-boolean-cast": "error",
    "no-extra-semi": "error",
    "no-fallthrough": "error",
    "no-func-assign": "error", // ts(2539)
    "no-global-assign": "error",
    "no-import-assign": "error", // ts(2539) & ts(2540)
    "no-inner-declarations": "error",
    "no-invalid-regexp": "error",
    "no-irregular-whitespace": "error",
    "no-loss-of-precision": "error",
    "no-misleading-character-class": "error",
    "no-mixed-spaces-and-tabs": "error",
    "no-new-symbol": "error", // ts(2588)
    "no-nonoctal-decimal-escape": "error",
    "no-obj-calls": "error", // ts(2349)
    "no-octal": "error",
    "no-prototype-builtins": "error",
    "no-redeclare": "error", // ts(2451)
    "no-regex-spaces": "error",
    "no-self-assign": "error",
    "no-setter-return": "error", // ts(2408)
    "no-shadow-restricted-names": "error",
    "no-sparse-arrays": "error",
    "no-this-before-super": "error", // ts(2376)
    "no-undef": "error", // ts(2304)
    "no-unexpected-multiline": "error",
    "no-unreachable": "error", // ts(7027)
    "no-unsafe-finally": "error",
    "no-unsafe-negation": "error", // ts(2365) & ts(2360) & ts(2358)
    "no-unsafe-optional-chaining": "error",
    "no-unused-labels": "error",
    "no-unused-vars": "error",
    "no-useless-backreference": "error",
    "no-useless-catch": "error",
    "no-useless-escape": "error",
    "no-with": "error",
    "require-yield": "error",
    "use-isnan": "error",
    "valid-typeof": "error",
    // "no-var": "error", // ts transpiles let/const to var, so no need for vars any more
    // "prefer-const": "error", // ts provides better types with const
    // "prefer-rest-params": "error", // ts provides better types with rest args over arguments
    // "prefer-spread": "error", // ts transpiles spread to apply, so no need for manual apply
    // "valid-typeof": "off" // ts(2367)
  },
};
