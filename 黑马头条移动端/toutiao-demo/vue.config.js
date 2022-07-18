const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/', // 开发环境下默认变成相对路径
  productionSourceMap: false // 去掉map文件，加快压缩速度，减少文件体积
})
