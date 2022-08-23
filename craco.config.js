const CracoLessPlugin = require('craco-less');

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: {
                            '@link-color': '#5030e5', // 链接色
                            '@success-color': '#5030e5', // 成功色
                            '@warning-color': '#faad14', // 警告色
                            '@error-color': '#f5222d', // 错误色
                            '@font-size-base': '14px', // 主字号
                            '@heading-color': 'rgba(0, 0, 0, 0.85)', // 标题色
                            '@text-color': 'rgba(0, 0, 0, 0.75)', // 主文本色
                            '@text-color-secondary': 'rgba(0, 0, 0, 0.45)', // 次文本色
                            '@disabled-color': 'rgba(0, 0, 0, 0.25)',// 失效色
                            '@border-radius-base': '5px',// 组件/浮层圆角
                            '@border-color-base': '#dbdbdb', // 边框色
                            '@box-shadow-base': '0 2px 8px rgba(0, 0, 0, 0.15)' // 浮层阴影
                        },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};