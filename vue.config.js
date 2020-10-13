module.exports = {
    devServer: {
        overlay: {
            warnings: false,
            errors: false
        },
        open: true,
        host: "localhost",
        port: '8081',
        https: false,
        hotOnly: false,
        proxy: {
            '/api': {
                target: 'http://downlod-file.mgtx.com.cn',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
    lintOnSave: false
}