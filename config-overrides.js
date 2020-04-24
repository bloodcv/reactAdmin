/*
 * @Description: webpack重写文件
 * @Version: 1.0
 * @Autor: saya
 * @Date: 2020-04-22 16:43:52
 * @LastEditors: saya
 * @LastEditTime: 2020-04-23 17:59:19
 */
const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = function override(config, env) {
  // do stuff with the webpack config...
  return config;
};

module.exports = override(
  // 针对antd按需打包，根据import来打包（使用babel-plugin-import）
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true // 自动打包相关样式
  }),
  //使用less-loader对源码中的less的变量进行重新指定
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { '@primary-color': '#1DA57A' }
  })
);