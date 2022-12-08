const Proxy_Config = {
    "/Documents/": {
        "secure": false,
        "logLevel": "debug",
        "onProxyRes": function (proxyRes, req, res) {
            proxyRes.headers['Access-Control-Allow-Headers'] = '*';
        }
    }
}

module.exports = Proxy_Config