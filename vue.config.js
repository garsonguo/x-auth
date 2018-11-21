module.exports = {
    devServer: {
        port: 8080,
        host: 'localhost',
        open: true,
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:3000',
                changeOrigin: true
            }
        }
    },
    configureWebpack: {
        resolve: {
            alias: {
                'src': '@',
            }
        }
    },
}