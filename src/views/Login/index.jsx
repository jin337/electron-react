import { } from 'react'

// 页面样式
import styles from './index.module.scss'

const { ipcRenderer } = require('electron')

const Index = () => {
  const login = () => {
    ipcRenderer.invoke('showMain')
  }
  return (
    <div className={styles.wrap}>
      <div className={styles.close} onClick={close}>&#xd7;</div>
      <ul>
        <li><input type="text" /></li>
        <li><input type="password" /></li>
        <li><button onClick={login}>登录</button></li>
      </ul>
    </div>
  )
}
export default Index
