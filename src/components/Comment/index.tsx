import React, { useEffect } from 'react'
import './index.css'

type CommentProps = {
  title: string
}

const Comment: React.FC<CommentProps> = ({ title }) => {
  useEffect(() => {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = 'https://utteranc.es/client.js'
    script.async = true
    script.crossOrigin = 'anonymous'
    script.setAttribute('repo', 'chanshiyucx/aurora')
    script.setAttribute('theme', 'github-dark')
    script.setAttribute('issue-term', title)

    const dom = document.querySelector('.comment')
    dom?.appendChild(script)
    return () => {
      dom?.removeChild(script)
    }
  }, [title])

  return <div className="comment"></div>
}

export default Comment
