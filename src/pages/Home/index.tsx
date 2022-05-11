import React, { useState, useEffect, useRef, MouseEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import clsx from 'clsx'
import { Issue } from '@/type'
import Loading from '@components/Loading'
import Markdown from '@/components/Markdown'
import { Calendar, Bookmark, Tag } from '@components/Icons'
import { queryIssuesCount, queryIssues } from '@utils/service'
import { formatIssue } from '@utils/format'
import { useLoading } from '@/utils/hook'
import { dispatch, ActionType, useStore } from '@utils/store'
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
  const loadingRef = useRef<boolean>(false)
  const [maskHeight, setMaskHeight] = useState(0)
  const [maskTop, setMaskTop] = useState(0)

  const { count, collection } = useStore()

  const handleQueryCount = () => {
    if (count > 0) return
    queryIssuesCount().then((data) => {
      dispatch({
        type: ActionType.SET_COUNT,
        count: data.data.repository.issues.totalCount,
      })
    })
  }

  const handleQueryIssues = () => {
    loadingRef.current = true

    if (collection.has(page)) {
      setIssues(collection.get(page)!)
      refreshMask()
    } else {
      queryIssues(page)
        .then(async (data) => {
          if (page === 1) {
            await loading()
          }

          data = data.map(formatIssue)
          setIssues(data)
          dispatch({
            type: ActionType.SET_ISSUES,
            page: page,
            issues: data,
          })
          refreshMask()
        })
        .finally(() => {
          loadingRef.current = false
        })
    }
  }

  useEffect(() => {
    handleQueryCount()
  }, [])

  useEffect(() => {
    handleQueryIssues()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  const refreshMask = () => {
    setTimeout(() => {
      const target = listRef.current?.firstChild
      if (target) {
        calcMaskPos(target)
      }
    }, 100)
  }

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
                      <span className="mr-2" key={label.id}>
                        {label.name}
                      </span>
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
