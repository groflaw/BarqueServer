module.exports = {
    apps: [{
      name: "barqueAdmin",
      script: "./api/index.js",
      instances: "max",
      exec_mode: "cluster",
      env: {
        NODE_ENV: "production",
      }
    }]
  }