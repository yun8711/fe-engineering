/**
 * typescript-eslint 推荐的配置中，都继承了下面的配置，它们是由源码中的 base.js+eslint-recommended 组成，作用：
 * 1、指定parser为@typescript-eslint/parser
 * 2、plugins: ['@typescript-eslint']，让eslint 能识别ts 规则
 * 3、关闭部分与eslint 冲突的规则
 */

module.exports = {
  // base.js
  parser: "@typescript-eslint/parser",
  parserOptions: { sourceType: "module" },
  plugins: ["@typescript-eslint"],
  // 在 eslint-recommended.js 中提供
  overrides: [
    {
      files: ["*.ts", "*.tsx", "*.mts", "*.cts"],
      rules: {
        // 关闭 eslint 中与@typescript-eslint和ts 冲突的规则
        "constructor-super": "off",
        "getter-return": "off",
        "no-const-assign": "off",
        "no-dupe-args": "off",
        "no-dupe-class-members": "off",
        "no-dupe-keys": "off",
        "no-func-assign": "off",
        "no-import-assign": "off",
        "no-new-symbol": "off",
        "no-obj-calls": "off",
        "no-redeclare": "off",
        "no-setter-return": "off",
        "no-this-before-super": "off",
        "no-undef": "off",
        "no-unreachable": "off",
        "no-unsafe-negation": "off",
        "no-var": "error",
        "prefer-const": "error",
        "prefer-rest-params": "error",
        "prefer-spread": "error", // ts transpiles spread to apply, so no need for manual apply
      },
    },
  ],
};
