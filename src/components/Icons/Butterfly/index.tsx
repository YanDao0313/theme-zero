import React from 'react'
import './index.css'

type ButterflyProps = {}

const Butterfly: React.FC<ButterflyProps> = () => {
  return (
    <div className="cursor-pointer flex items-center justify-center mx-2">
      <div className="butterfly"></div>
    </div>
  )
}

export default Butterfly
