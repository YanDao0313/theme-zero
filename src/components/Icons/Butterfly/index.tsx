import React from 'react'
import { useLocalStorage } from '@/utils/hook'
import './index.css'

type ButterflyProps = {}

const Butterfly: React.FC<ButterflyProps> = () => {
  const [theme, setTheme] = useLocalStorage<string>('theme', 'light')

  const toggleTheme = () => {    
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    document.getElementsByTagName('body')[0].className = newTheme
  }

  return (
    <div className="z-10 cursor-pointer flex items-center justify-center mx-3" onClick={toggleTheme}>
      <div className="butterfly"></div>
    </div>
  )
}

export default Butterfly
