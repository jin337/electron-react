module.exports = {
  packagerConfig: {
    name: 'electron客户端',
    executableName: 'vite-react-app',
    icon: './app/icon/favicon'
  },
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        name: 'vite_react_app'
      }
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: [
        'darwin'
      ]
    },
    {
      name: '@electron-forge/maker-deb',
      config: {}
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {}
    }
  ]
}
