import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import clsx from 'clsx'
import './index.css'
import ShootingStar from '@components/ShootingStar'
import Poetry from '@components/Poetry'
import {
  Villa,
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

const Side: React.FC<SideProps> = () => {
  const location = useLocation()
  const pathname = location.pathname

  return (
    <div className="side lg:fixed lg:top-0 lg:left-0 lg:h-full overflow-hidden flex flex-col justify-between">
      <ShootingStar />

      {/* side menu */}
      <div className="w-full h-2/3 flex flex-col-reverse items-center lg:flex-row lg:items-end justify-end pb-4 lg:pb-10">
        <nav className="nav nav-y flex lg:flex-col lg:justify-end justify-center items-center w-12">
          <Link className={clsx(pathname === '/' && 'active')} to="/">
            <Villa />
          </Link>
          <Link className={clsx(pathname === '/project' && 'active')} to="/project">
            <Inbox />
          </Link>
          <Link className={clsx(pathname === '/book' && 'active')} to="/book">
            <Book />
          </Link>
          <Link className={clsx(pathname === '/inspiration' && 'active')} to="/inspiration">
            <Message />
          </Link>
          <Link className={clsx(pathname === '/friend' && 'active')} to="/friend">
            <Heart />
          </Link>
          <Link className={clsx(pathname === '/about' && 'active')} to="/about">
            <User />
          </Link>
        </nav>
        <div className="flex flex-col justify-end pt-6 lg:pb-3 w-full lg:w-2/3 select-text text-center lg:text-left">
          <h3 className="title text-6xl tracking-wider">蟬時雨</h3>
          <span className="subtitle pt-2 pb-2 lg:pb-8 pl-1 text-xl tracking-wider">蝉鸣如雨 花宵道中</span>
          <Poetry />
        </div>
      </div>

      {/* footer menu */}
      <div className="hidden lg:flex justify-end py-12">
        <Butterfly />
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
