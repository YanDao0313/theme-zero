import React from 'react'
import { Link } from 'react-router-dom'
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

const { github, twitter, telegram, email, music } = config.contact

type SideProps = {}

const Side: React.FC<SideProps> = () => {
  return (
    <div className="side fixed top-0 left-0 h-full overflow-hidden flex flex-col justify-between">
      <ShootingStar />

      {/* side menu */}
      <div className="w-full h-2/3 flex justify-end pb-10">
        <nav className="nav nav-y flex flex-col justify-end items-center w-12">
          <Link to="/">
            <Villa />
          </Link>
          <Link to="/archive">
            <Inbox />
          </Link>
          <Link to="/book">
            <Book />
          </Link>
          <Link to="/inspiration">
            <Message />
          </Link>
          <Link to="/friend">
            <Heart />
          </Link>
          <Link to="/about">
            <User />
          </Link>
        </nav>
        <div className="flex flex-col justify-end pl-5 pb-3 w-2/3 select-text">
          <h3 className="title text-6xl tracking-wider">蟬時雨</h3>
          <span className="subtitle pt-2 pb-8 pl-1 text-xl tracking-wider">蝉鸣如雨 花宵道中</span>
          <Poetry />
        </div>
      </div>

      {/* footer menu */}
      <div className="flex justify-end py-12">
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
          <a href={github} rel="noopener noreferrer" target="_blank">
            <Moon />
          </a>
        </div>
      </div>
    </div>
  )
}

export default Side
