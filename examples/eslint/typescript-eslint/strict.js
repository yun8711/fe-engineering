/**
 * 继承了源码中的 base.js + eslint-recommended.js
 * strict.js 中的规则包含了recommended.js 的全部，还增加了一些，所以它更严格
 * strict-type-checked.js 中，除了strict.js，还包含了 recommended-type-checked，然后增加了一些规则
 */

module.exports = {
  // base.js
  parser: "@typescript-eslint/parser",
  parserOptions: { sourceType: "module" },
  plugins: ["@typescript-eslint"],
  rules: {
    // recommended.js 中的规则集
    "@typescript-eslint/ban-ts-comment": "error",
    "@typescript-eslint/ban-types": "error",
    "no-array-constructor": "off",
    "@typescript-eslint/no-array-constructor": "error",
    "@typescript-eslint/no-duplicate-enum-values": "error",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-extra-non-null-assertion": "error",
    "no-loss-of-precision": "off",
    "@typescript-eslint/no-loss-of-precision": "error",
    "@typescript-eslint/no-misused-new": "error",
    "@typescript-eslint/no-namespace": "error",
    "@typescript-eslint/no-non-null-asserted-optional-chain": "error",
    "@typescript-eslint/no-this-alias": "error",
    "@typescript-eslint/no-unnecessary-type-constraint": "error",
    "@typescript-eslint/no-unsafe-declaration-merging": "error",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-var-requires": "error",
    "@typescript-eslint/prefer-as-const": "error",
    "@typescript-eslint/triple-slash-reference": "error",

    // strict.js 中比recommended.js增加的规则
    "@typescript-eslint/no-dynamic-delete": "error",
    "@typescript-eslint/no-extraneous-class": "error",
    "@typescript-eslint/no-invalid-void-type": "error",
    "@typescript-eslint/no-non-null-asserted-nullish-coalescing": "error",
    "@typescript-eslint/no-non-null-assertion": "error",
    "no-useless-constructor": "off",
    "@typescript-eslint/no-useless-constructor": "error",
    "@typescript-eslint/prefer-literal-enum-member": "error",
    "@typescript-eslint/prefer-ts-expect-error": "error",
    "@typescript-eslint/unified-signatures": "error",

    // recommended-type-checked.js 新增的规则(包含recommended.js)
    "@typescript-eslint/await-thenable": "error",
    "@typescript-eslint/no-base-to-string": "error",
    "@typescript-eslint/no-duplicate-type-constituents": "error",
    "@typescript-eslint/no-floating-promises": "error",
    "@typescript-eslint/no-for-in-array": "error",
    "no-implied-eval": "off",
    "@typescript-eslint/no-implied-eval": "error",
    "@typescript-eslint/no-misused-promises": "error",
    "@typescript-eslint/no-redundant-type-constituents": "error",
    "@typescript-eslint/no-unnecessary-type-assertion": "error",
    "@typescript-eslint/no-unsafe-argument": "error",
    "@typescript-eslint/no-unsafe-assignment": "error",
    "@typescript-eslint/no-unsafe-call": "error",
    "@typescript-eslint/no-unsafe-enum-comparison": "error",
    "@typescript-eslint/no-unsafe-member-access": "error",
    "@typescript-eslint/no-unsafe-return": "error",
    "require-await": "off",
    "@typescript-eslint/require-await": "error",
    "@typescript-eslint/restrict-plus-operands": "error",
    "@typescript-eslint/restrict-template-expressions": "error",
    "@typescript-eslint/unbound-method": "error",

    // strict-type-checked.js 又增加的规则(包含recommended-type-checked.js)
    "@typescript-eslint/no-confusing-void-expression": "error",
    "@typescript-eslint/no-meaningless-void-operator": "error",
    "@typescript-eslint/no-mixed-enums": "error",
    "no-throw-literal": "off",
    "@typescript-eslint/no-throw-literal": "error",
    "@typescript-eslint/no-unnecessary-boolean-literal-compare": "error",
    "@typescript-eslint/no-unnecessary-condition": "error",
    "@typescript-eslint/no-unnecessary-type-arguments": "error",
    "@typescript-eslint/prefer-includes": "error",
    "@typescript-eslint/prefer-reduce-type-parameter": "error",
    "@typescript-eslint/prefer-return-this-type": "error",
  },
};
