import { } from 'react'

// 页面样式
import styles from './index.module.scss'

// logo
import logo from 'assets/image/favicon.png'

const { ipcRenderer } = require('electron')

const Index = () => {
  const login = () => {
    ipcRenderer.invoke('showMain')
  }
  return (
    <div className={styles.wrap}>
      <div className={styles.close} onClick={close}>&#xd7;</div>
      <ul>
        <li><img className={styles.logo} src={logo} alt="" /></li>
        <li><div className={styles.name}>登录</div></li>
        <li><input type="text" /></li>
        <li><input type="password" /></li>
        <li><button onClick={login}>登录</button></li>
      </ul>
    </div>
  )
}
export default Index
