import { useState } from 'react'
// 全局组件
import { AppMenu } from 'components'
// 样式
import styles from './index.module.scss'

import logo from 'assets/image/logo.svg'

const Index = () => {
  const [count, setCount] = useState(0)

  return (
    <>
      <AppMenu />
      <div className={styles.wrap}>
        <div className={styles.main}>
          <img src={logo} className={styles.logo} alt='logo' />
          <p>Hello Elctron + Vite + React!</p>
          <p>
            <button className={styles.button} type='button' onClick={() => setCount((count) => count + 1)}>count is: {count}</button>
          </p>
        </div>
      </div>
    </>
  )
}

export default Index
