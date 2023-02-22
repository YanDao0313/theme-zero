import React from 'react'
import clsx from 'clsx'
import { Theme, ThemeType } from '@/type'
import styles from './index.module.css'

type PanelProps = {
  theme: ThemeType
  toggleTheme: (theme: ThemeType) => void
}

const list: Theme[] = [
  { type: 'Hutao', name: '雪霁梅香' },
  { type: 'Keqing', name: '霆霓快雨' },
  { type: 'Ganyu', name: '循循守月' },
  { type: 'Kokomi', name: '真珠之智' },
  { type: 'Yoimiya', name: '琉焰华舞' },
  { type: 'Ayaka', name: '白鹭霜华' },
  { type: 'Nilou', name: '莲光落舞筵' },
]

const Panel: React.FC<PanelProps> = ({ theme, toggleTheme }) => {
  return (
    <div className={styles.panel}>
      <div className={styles.mask}></div>
      <div className={styles.main}>
        <div className={styles.wrapper}>
          <div className={styles['short-line']}>
            <div></div>
            <div></div>
          </div>
          <div className={styles.content}>
            <div className={styles.head}>背景主题</div>
            <ul className={styles.body}>
              {list.map((t) => {
                return (
                  <li
                    key={t.name}
                    className={clsx('cursor-pointer', theme === t.type && styles.active)}
                    onClick={() => toggleTheme(t.type)}
                  >
                    {t.name}
                  </li>
                )
              })}
            </ul>
            <div className={styles.foot}></div>
          </div>
          <div className={styles['long-line']}>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Panel
