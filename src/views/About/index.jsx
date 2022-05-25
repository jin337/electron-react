import { useEffect, useState } from 'react'

// 页面样式
import styles from './index.module.scss'

// logo
import logo from 'assets/image/favicon.png'

const { ipcRenderer } = require('electron')

const Index = () => {
  const [version, setVersion] = useState(null)

  useEffect(() => {
    // 获取版本号
    ipcRenderer.invoke('version').then(res => {
      setVersion(res)
    })
  }, [])

  // 检查更新
  const update = () => {
    // ipcRenderer.invoke('checkForUpdate')
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.close} onClick={close}>&#xd7;</div>
      <img className={styles.logo} src={logo} alt="" />
      <div className={styles.version}>Windows客户端 {version}</div>
      <div className={styles.btn}><button onClick={update}>检查更新</button></div>
    </div>
  )
}
export default Index
