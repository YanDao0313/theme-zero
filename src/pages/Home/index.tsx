import React, { useState, useEffect, useRef, MouseEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import clsx from 'clsx'
import { Issue } from '@/type'
import Loading from '@components/Loading'
import Markdown from '@/components/Markdown'
import { Calendar, Bookmark, Tag } from '@components/Icons'
import { queryIssues } from '@utils/service'
import { formatIssue } from '@utils/format'
import { useLoading } from '@/utils/hook'
import styles from './index.module.css'

type HomeProps = {}

const Home: React.FC<HomeProps> = () => {
  const navigate = useNavigate()
  const loading = useLoading()
  const [page, setPage] = useState(1)
  const [issues, setIssues] = useState<Array<Issue>>([])
  const maskRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const hoverRef = useRef<any>(null)
  const timerRef = useRef<number>()
  const loadingRef = useRef<boolean>(false)
  const finishedRef = useRef<boolean>(false)
  const [maskHeight, setMaskHeight] = useState(0)
  const [maskTop, setMaskTop] = useState(0)

  const handleQuery = () => {
    loadingRef.current = true
    queryIssues(page)
      .then(async (data) => {
        if (page === 1) {
          await loading()
        }

        if (data.length) {
          data = data.map(formatIssue)
          setIssues([...issues, ...data])
        } else {
          finishedRef.current = true
        }

        if (maskHeight === 0) {
          setTimeout(() => {
            const target = listRef.current?.firstChild
            if (target) {
              calcMaskPos(target)
            }
          }, 100)
        }
      })
      .finally(() => {
        loadingRef.current = false
      })
  }

  useEffect(() => {
    handleQuery()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  const calcMaskPos = (target: any) => {
    const { clientHeight, offsetTop } = target
    const realTop = offsetTop + 3 * 16 // 3rem padding
    if (maskHeight === clientHeight && maskTop === realTop) return
    setMaskHeight(clientHeight)
    setMaskTop(realTop)
  }

  const handleMask = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault()
    hoverRef.current = e.currentTarget
    calcMaskPos(e.currentTarget)
  }

  const handleScroll = () => {
    clearTimeout(timerRef.current)
    timerRef.current = window.setTimeout(() => {
      if (hoverRef.current) {
        calcMaskPos(hoverRef.current)
      }
    }, 100)

    // load more
    if (loadingRef.current || finishedRef.current) return
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement
    if (scrollTop + clientHeight > scrollHeight - 100) {
      setPage((page) => page + 1)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, false)
    return () => window.removeEventListener('scroll', handleScroll, false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="page">
      {issues.length === 0 ? (
        <Loading />
      ) : (
        <div className="fade select-text">
          <div
            ref={maskRef}
            className={clsx(
              styles.mask,
              'pointer-events-none absolute top-0 left-0 w-full rounded transform transition-all ease-in-out duration-300',
            )}
            style={{
              height: `${maskHeight}px`,
              transform: `translateY(${maskTop}px)`,
            }}
          ></div>
          <div ref={listRef} className="relative z-10 space-y-4">
            {issues.map((issue) => {
              return (
                <article
                  key={issue.id}
                  className="cursor-pointer p-4 tracking-wide"
                  onClick={() => navigate(`/post/${issue.number}`)}
                  onMouseOver={handleMask}
                  onMouseEnter={handleMask}
                >
                  <h3 className="text-xl italic mb-2">{issue.title}</h3>
                  <Markdown content={issue.description} />
                  <div className="flex justify-start mt-2">
                    <Calendar className="mr-0.5" />
                    {issue.created_at}
                    <Bookmark className="ml-4 mr-0.5" />
                    {issue.milestone ? issue.milestone.title : '未分类'}
                    <Tag className="ml-4 mr-0.5" />
                    {issue.labels.map((label) => (
                      <span key={label.id}>{label.name}</span>
                    ))}
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
export default Home
