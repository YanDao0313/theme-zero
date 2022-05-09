import React from 'react'
import './index.css'
import Loading from '@/assets/images/loading.png'

type GenshinProps = {}

const Genshin: React.FC<GenshinProps> = () => {
  return (
    <div className="loading">
      <img src={Loading} alt="Loading..."></img>
    </div>
  )
}

export default Genshin
