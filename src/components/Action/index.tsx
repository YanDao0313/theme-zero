import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Send } from '@components/Icons'
import './index.css'

type ActionProps = {}

const Action: React.FC<ActionProps> = () => {
  const navigate = useNavigate()
  const timerRef = useRef<number>()
  const [showAction, setShowAction] = useState(false)

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleScroll = () => {
    clearTimeout(timerRef.current)
    timerRef.current = window.setTimeout(() => {
      const showBackTop = window.pageYOffset >= 200
      setShowAction(showBackTop)
    }, 100)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, false)
    return () => window.removeEventListener('scroll', handleScroll, false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="fixed bottom-4 right-4 flex items-center">
      <div className="action">
        <Send onClick={scrollToTop} />
      </div>
    </div>
  )
}

export default Action
