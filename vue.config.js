const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  chainWebpack(config) {
    // 直接移除 eslint 编译规则
    config.module.rules.delete('eslint');
  }
})
