/**
 * 1、继承了 base.js+eslint-recommended.js，在此基础上，进行了扩展：
 * 2、recommended 规则集增加了一些可能造成逻辑错误的规则
 * 3、recommended-type-checked 规则集增加了一些ts 类型检查相关的规则
 */

module.exports = {
  extends: ["./basic.js"],
  rules: {
    // recommended.js 中提供的规则集
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

    // recommended-type-checked.js 新增的规则
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
  },
};
