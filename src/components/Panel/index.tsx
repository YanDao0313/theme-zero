import React from 'react'
import clsx from 'clsx'
import color from 'color'
import { Theme, ThemeType } from '@/type'
import styles from './index.module.css'

type PanelProps = {
  list: Theme[]
  theme: ThemeType
  togglePanle: () => void
  toggleTheme: (theme: ThemeType) => void
}

const Panel: React.FC<PanelProps> = ({ list, theme, togglePanle, toggleTheme }) => {
  return (
    <div className={styles.panel}>
      <div className={styles.mask} onClick={togglePanle}></div>
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
                    <span
                      style={{
                        borderColor: t.color,
                        backgroundColor: theme === t.type ? color(t.color).alpha(0.5).string() : 'transparent',
                      }}
                    >
                      {t.name}
                    </span>
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
