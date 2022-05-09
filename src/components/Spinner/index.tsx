import React from 'react'
import './index.css'

type SpinnerProps = {}

const Spinner: React.FC<SpinnerProps> = () => {
  const spinnerArr = new Array(10).fill(0)
  const branchArr = new Array(3).fill(0)
  return (
    <div className="flex justify-center items-center mt-28 mb-24">
      {spinnerArr.map((_, i) => {
        return (
          <div key={i} className="spinner">
            <div className="spin">
              {branchArr.map((_, j) => {
                return <div key={j} className="branch"></div>
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Spinner
