const path = require('path');
const fs = require('fs');

function getConfig() {
  const script = path.resolve(__dirname, '../dist/standalone.js');
  const configPath = process.env.CONFIG_PATH;
  console.log(`starting ${script} by pm2: CONFIG_PATH=${configPath}`);
  const config = loadConfig(configPath);
  let instances = 'max';
  if (!configPath) {
    instances = 1;
  } else if (!config) {
    instances = 1;
  } else if (config && config.sqlLite) {
    instances = 1;
  }
  return {
    apps: [{
      name: 'xform-stand-alone',
      script,
      args: 'one two',
      instances,
      autorestart: false,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        CONFIG_PATH: process.env.CONFIG_PATH
      }
    }]
  }
}

module.exports = getConfig();

function loadConfig(configPath) {
  let config = null;
  if (configPath) {
    try {
      const configFile = fs.readFileSync(configPath);
      config = JSON.parse(configFile);
    } catch (e) {
      config = null;
    }
  }
  return config;
}
