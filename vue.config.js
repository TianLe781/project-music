const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    lintOnSave: false,
    //配置代理
    devServer: {
        proxy: 'http://localhost:3000',
    }

})