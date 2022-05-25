import { combineReducers, createStore } from 'redux'

const modulesFiles = import.meta.globEager('./reducers/*.js')
const modules = Object.keys(modulesFiles).reduce((modules, path) => {
  const moduleName = path.replace(/(\.\/reducers\/|\.js)/g, '')
  modules[moduleName] = modulesFiles[path]?.default
  return modules
}, {})

export default createStore(combineReducers({
  ...modules
}))
