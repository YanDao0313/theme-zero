import React, { useLayoutEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
// // @ts-ignore
// import Zooming from 'zooming'
import Heading from './Heading'
import Link from './Link'
// import Image from './Image'
// import Code from './Code'
import styles from './index.module.css'

type MarkdownProps = {
  content: string
}

// const zooming = new Zooming({
//   bgColor: 'var(--black)',
//   enableGrab: false,
// })

const Markdown: React.FC<MarkdownProps> = ({ content }) => {
  // useLayoutEffect(() => {
  //   zooming.listen('.img-zoomable')
  // }, [])

  return (
    <div className="text-justify leading-relaxed">
      <ReactMarkdown
        className={styles.markdown}
        children={content}
        remarkPlugins={[remarkGfm]}
        components={{
          h1: Heading,
          h2: Heading,
          h3: Heading,
          h4: Heading,
          h5: Heading,
          h6: Heading,
          a: Link,
        }}
      />
    </div>
  )
}

export default Markdown
