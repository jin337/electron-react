import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

// 样式
import styles from './index.module.scss'

// logo
import logo from 'assets/image/favicon.png'

// electron
const { ipcRenderer } = require('electron')

const AppMenu = () => {
  const [full, setFull] = useState(false)
  const common = useSelector((state) => state.common)

  // 监控是否全屏
  const changeScreen = () => {
    if (window.outerWidth === screen.availWidth && window.outerHeight === screen.availHeight) {
      setFull(true)
    } else {
      setFull(false)
    }
  }
  // 默认事件
  useEffect(() => {
    window.addEventListener('resize', changeScreen)
    return () => window.removeEventListener('resize', changeScreen)
  }, [])

  // 刷新
  const reload = () => {
    ipcRenderer.invoke('reloadApp')
  }
  // 最小化
  const minimize = () => {
    ipcRenderer.invoke('minApp')
  }
  // 全屏
  const fullscreen = () => {
    ipcRenderer.invoke('maxApp')
  }
  // 隐藏
  const hide = () => {
    ipcRenderer.invoke('hideApp')
  }

  return (
    <div className={styles['app-menu']}>
      <div className={styles.header}>
        <div className={styles['app-header']}>
          <img src={logo} alt="logo" />
          <span>{common.projectName}</span>
        </div>
        <div className={styles.handler}>
          <span onClick={reload}>&#x21bb;</span>
          <span onClick={minimize}>&#x2212;</span>
          {full ? <span onClick={fullscreen}>&#x274F;</span> : <span onClick={fullscreen}>&#x2610;</span>}
          <span className={styles.close} onClick={hide}>&#xd7;</span>
        </div>
      </div>
    </div>
  )
}
export default AppMenu
