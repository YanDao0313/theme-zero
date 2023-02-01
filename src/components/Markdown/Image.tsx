import React, { useState, useLayoutEffect } from 'react'
import { ComponentPropsWithoutRef, ComponentType, ReactMarkdownProps } from 'react-markdown/lib/ast-to-react'
import Spinner from '@/components/Spinner'
import { fileCDN } from '@/utils'
import { useLoading } from '@/utils/hook'

type ImageProps = ComponentPropsWithoutRef<'img'> & ReactMarkdownProps

type ImageComponent = ComponentType<ImageProps>

const Image: ImageComponent = ({ src = '', alt = '' }) => {
  const [cdnSrc] = useState<string>(() => fileCDN(src))
  const [loading, setloading] = useState(true)
  const delay = useLoading()

  useLayoutEffect(() => {
    const img = new window.Image()
    img.onload = async () => {
      await delay()
      setloading(false)
    }
    img.src = cdnSrc
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cdnSrc])

  return (
    <>
      {loading ? <Spinner /> : <img className="img-zoomable m-auto fade rounded shadow-md" src={cdnSrc} alt={alt} />}
      {alt && <span className="block mt-2 text-center italic">◭ {alt}</span>}
    </>
  )
}

export default Image
