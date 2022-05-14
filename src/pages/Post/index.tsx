import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Issue } from '@/type'
import Loading from '@components/Loading'
import Markdown from '@/components/Markdown'
import { queryIssue } from '@utils/service'
import { formatIssue } from '@utils/format'
import { useLoading } from '@/utils/hook'

type PostParams = {
  num: string
}

type PostProps = {}

const Post: React.FC<PostProps> = () => {
  const delay = useLoading()
  const { num = '129' } = useParams<PostParams>()
  const [loading, setLoading] = useState(false)
  const [issue, setIssue] = useState<Issue>()

  const handleQuery = () => {
    setLoading(true)
    queryIssue(num)
      .then(async (data) => {
        await delay()
        data = formatIssue(data)
        setIssue(data)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    handleQuery()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [num])

  return (
    <div className="page select-text">
      {loading ? (
        <Loading />
      ) : (
        <div className="fade">
          <Markdown content={issue?.body ?? ''} />
        </div>
      )}
    </div>
  )
}

export default Post
