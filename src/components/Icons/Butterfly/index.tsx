import React, { useLayoutEffect } from 'react'
import { useLocalStorage } from '@/utils/hook'
import './index.css'

type ButterflyProps = {}

// 系统主题
const dark = window.matchMedia('(prefers-color-scheme: dark)').matches

const Butterfly: React.FC<ButterflyProps> = () => {
  // 主题过期时间为1天，到期重置
  const [theme, setTheme] = useLocalStorage<string>('theme', dark ? 'dark' : 'light', 24 * 60 * 60 * 1000)

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  useLayoutEffect(() => {
    document.getElementsByTagName('body')[0].className = theme
  }, [theme])

  return (
    <div className="z-10 cursor-pointer flex items-center justify-center mx-3" onClick={toggleTheme}>
      <div className="butterfly"></div>
    </div>
  )
}

export default Butterfly
