import { useEffect, useState } from 'react'
// 全局组件
import { AppMenu } from 'components'
// 样式
import styles from './index.module.scss'
// 接口
import Http from 'service/index'

import logo from 'assets/image/logo.svg'
import { useDispatch } from 'react-redux'

const Index = () => {
  const [count, setCount] = useState(0)
  const dispatch = useDispatch()

  useEffect(() => {
    Http.get('/api/getProjectName').then(({ code, data }) => {
      if (code === '200') {
        dispatch({ type: 'PROJECTNAME', input: data.projectName })
      }
    })
  }, [])

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
