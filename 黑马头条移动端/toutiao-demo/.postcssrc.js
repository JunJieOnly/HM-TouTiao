module.exports = {
    plugins: {
        // postcss-pxtorem 插件的版本需要 >= 5.0.0
        'postcss-pxtorem': {
            rootValue({ file }) {  // 如果是vant的就按照375 尺寸， 如果是其他的就是按照750 
                return file.indexOf('vant') !== -1 ? 37.5 : 75;   // rootValue 的值一般是 设计稿  1/10
            },
            propList: ['*'],
            // .postcssrc.js中配置不要转换样式文件中的字号
            exclude: 'github-markdown'  // 增加这一句！
        },
    },
}