module.exports = {
  packagerConfig: {},
  rebuildConfig: {},
  makers: [
    {
      name: "@electron-forge/maker-squirrel",
      config: {
        name: "your_app_name",
        setupExe: "YourAppSetup.exe",
        setupMsi: "YourAppSetup.msi"
      }
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
    {
      name: "@electron-forge/maker-portable",
      config: {
        name: "your_app_name",
        arch: "ia32"
      }
    }
  ],
};
