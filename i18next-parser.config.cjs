const path = require('path');

module.exports = {
  // 扫描文件
  input: ['src/**/*.{js,jsx,ts,tsx}'],

  // 输出路径，{{lng}} 和 {{ns}} 会被替换
  output: './public/locales/$LOCALE/$NAMESPACE.json',

  // 语言
  locales: ['en', 'zh-CN'],

  // 默认语言
  defaultLocale: 'zh-CN',

  // 默认命名空间
  defaultNamespace: 'common',

  // 自定义命名空间生成规则，按文件目录自动设置
  keySeparator: '.', // key 分割符，默认.
  namespaceSeparator: ':',

  // 自定义命名空间函数，用文件路径决定命名空间名
  namespace: (file) => {
    // file 是完整路径，比如 /Users/you/project/src/components/Header/Header.tsx
    // 取文件所在目录名作为 namespace
    return path.basename(path.dirname(file));
  },

  // 其他选项
  verbose: true,
  sort: false,
  indentation: 2,
};
