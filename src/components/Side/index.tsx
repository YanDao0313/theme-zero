import React, { useState, useLayoutEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import clsx from 'clsx'
import { random } from '@/utils'
import { useLocalStorage } from '@/utils/hook'
import ShootingStar from '@components/ShootingStar'
import Panel from '@components/Panel'
import Poetry from '@components/Poetry'
import { Theme, ThemeType } from '@/type'
import './index.css'
import {
  Home,
  Inbox,
  Book,
  Message,
  Moon,
  Heart,
  User,
  Github,
  Twitter,
  Telegram,
  Mail,
  Music,
  Butterfly,
} from '@components/Icons'
import config from '@/config'

const { github, twitter, telegram, email, music, blog } = config.contact

type SideProps = {}

const list: Theme[] = [
  { type: 'Hutao', name: '雪霁梅香' },
  { type: 'Keqing', name: '霆霓快雨' },
  { type: 'Ganyu', name: '循循守月' },
  { type: 'Beelzebul', name: '一心净土' },
  { type: 'Ayaka', name: '白鹭霜华' },
  { type: 'Yoimiya', name: '琉焰华舞' },
  { type: 'Kokomi', name: '真珠之智' },
  { type: 'Nahida', name: '白草净华' },
]
const randomTheme = list[random(0, list.length)]

const Side: React.FC<SideProps> = () => {
  const [showPanel, setShowPanel] = useState(false)
  const [lastUpdateAt, setLastUpdateAt] = useState(Date.now())
  const location = useLocation()
  const pathname = location.pathname
  const togglePanle = () => setShowPanel((c) => !c)

  // 主题过期时间为1天，到期重置
  const [theme, setTheme] = useLocalStorage<ThemeType>('theme', randomTheme.type, 24 * 60 * 60 * 1000)

  const toggleTheme = (theme: ThemeType) => {
    const now = Date.now()
    if (now - lastUpdateAt < 1000) return
    setLastUpdateAt(now)
    setTheme(theme)
  }

  useLayoutEffect(() => {
    document.getElementsByTagName('body')[0].className = theme
  }, [theme])

  return (
    <div className="side fixed top-0 left-0 h-full overflow-hidden hidden lg:flex flex-col justify-between">
      <ShootingStar />
      {showPanel && <Panel list={list} theme={theme} toggleTheme={toggleTheme} togglePanle={togglePanle} />}

      {/* side menu */}
      <div className="w-full h-1/2 flex justify-end z-10">
        <nav className="nav nav-y flex flex-col justify-end items-center w-12">
          <Link className={clsx(pathname === '/' && 'active')} to="/" data-name="首页">
            <Home />
          </Link>
          <Link className={clsx(pathname === '/inspiration' && 'active')} to="/inspiration" data-name="灵感">
            <Message />
          </Link>
          <Link className={clsx(pathname === '/project' && 'active')} to="/project" data-name="项目">
            <Inbox />
          </Link>
          <Link className={clsx(pathname === '/book' && 'active')} to="/book" data-name="书单">
            <Book />
          </Link>
          <Link className={clsx(pathname === '/friend' && 'active')} to="/friend" data-name="友邻">
            <Heart />
          </Link>
          <Link className={clsx(pathname === '/about' && 'active')} to="/about" data-name="自述">
            <User />
          </Link>
        </nav>
        <div className="head flex flex-col justify-end pl-3 pb-3 w-2/3">
          <h3 className="title text-6xl tracking-wider">蟬時雨</h3>
          <span className="subtitle pt-2 pb-8 pl-1 text-xl tracking-wider">蝉鸣如雨 花宵道中</span>
          <Poetry />
        </div>
      </div>

      {/* footer menu */}
      <div className="flex justify-end py-12">
        <div className="translate-y-3" onClick={togglePanle}>
          <Butterfly />
        </div>
        <div className="nav nav-x flex items-center w-2/3 h-12 ">
          <a href={github} rel="noopener noreferrer" target="_blank">
            <Github />
          </a>
          <a href={twitter} rel="noopener noreferrer" target="_blank">
            <Twitter />
          </a>
          <a href={telegram} rel="noopener noreferrer" target="_blank">
            <Telegram />
          </a>
          <a href={email} rel="noopener noreferrer" target="_blank">
            <Mail />
          </a>
          <a href={music} rel="noopener noreferrer" target="_blank">
            <Music />
          </a>
          <a href={blog} rel="noopener noreferrer" target="_blank">
            <Moon />
          </a>
        </div>
      </div>
    </div>
  )
}

export default Side
