const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        createProxyMiddleware('/local', {
            target: 'http://localhost:8000',
            changeOrigin: true,
            pathRewrite: {
                '^/local': ''
            }
        })
    )
    app.use(
        createProxyMiddleware(
            '/socket.io', 
            {
                target: 'http://localhost:5000',
                changeOrigin: true,
                ws: true,
                //router: {
                //    '/socket.io/real': 'http://ec2-3-138-140-195.us-east-2.compute.amazonaws.com:5000'
                //}
            }
        )
    )
}