const { resolve } = require('path');
/**
 * @see https://www.electron.build/configuration/configuration
 */
module.exports = {
  productName: 'rebuff',
  appId: 'org.your.rebuff',
  electronDownload: {
    mirror: 'https://npm.taobao.org/mirrors/electron/',
  },
  asarUnpack: ['node_modules'],
  directories: {
    output: resolve(__dirname, './release'),
    app: resolve(__dirname, './dist'),
  },
  win: {
    icon: resolve(__dirname, 'src/assets/icons/logo.png'),
    requestedExecutionLevel: 'requireAdministrator',
    artifactName: 'rebuff_${os}_${version}_${env.ARCH}.${ext}',
    target: [
      {
        target: 'nsis',
      },
    ],
  },
  extraResources: [
    {
      from: resolve(__dirname, 'dependencies/redbuff.exe'),
      to: './dependencies/redbuff.exe',
    },
  ],
  nsis: {
    oneClick: false,
    allowToChangeInstallationDirectory: true,
    perMachine: true,
    allowElevation: true,
    packElevateHelper: true,
  },
};
