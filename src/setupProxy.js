const proxy = require("http-proxy-middleware")

module.exports = function (app) {
    app.use(
        proxy("/angel", {
            target: "http://127.0.0.1:1024/",
            changeOrigin: true,
            pathRewrite: {"^/angel": ""}
        }),
        proxy("/github", {
            target: "https://api.github.com/",
            changeOrigin: true,
            pathRewrite: {"^/github": ""}
        })
    )
}