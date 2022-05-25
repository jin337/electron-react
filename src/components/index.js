const modulesFiles = import.meta.globEager('./**/*.{js,jsx}')

const modules = Object.keys(modulesFiles).reduce((modules, path) => {
  const moduleName = path.replace(/^.\/(.*)\/index.jsx/, '$1')
  modules[moduleName] = modulesFiles[path]?.default
  return modules
}, {})

export const { AppMenu } = modules
