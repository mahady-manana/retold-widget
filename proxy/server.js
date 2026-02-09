const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
require("dotenv").config();

const app = express();
const PORT = process.env.PROXY_PORT || 5000;
const TARGET = process.env.API_TARGET || "http://localhost:3000";

app.use(
  "/api",
  createProxyMiddleware({
    target: TARGET,
    changeOrigin: true,
    pathRewrite: {
      "^/api": "", // Remove /api prefix when forwarding
    },
    onProxyReq: (proxyReq, req, res) => {
      // Add any additional headers if needed
      proxyReq.setHeader("Accept", "application/json");
    },
    onProxyRes: (proxyRes, req, res) => {
      // Add CORS headers to response
      proxyRes.headers["Access-Control-Allow-Origin"] = "*";
      proxyRes.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS";
      proxyRes.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization";
    },
  })
);

// Handle preflight requests
app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(\`CORS proxy server running on port \${PORT}\`);
  console.log(\`Proxying requests to: \${TARGET}\`);
});

