import React, { useState, useEffect } from 'react'
import { CustomIssue } from '@/type'
import { queryIssueByLabel } from '@utils/service'
import { formatPage } from '@/utils/format'
import { useLoading } from '@/utils/hook'
import Loading from '@components/Loading'

type FriendProps = {}

const Friend: React.FC<FriendProps> = () => {
  const loading = useLoading()
  const [list, setList] = useState<Array<CustomIssue>>([])

  const handleQuery = () => {
    queryIssueByLabel('Friend')
      .then(async (data) => {
        await loading()
        const list = formatPage(data[0])
        setList(list)
      })
      .catch(console.error)
  }

  useEffect(() => {
    handleQuery()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="page">
      {list.length ? (
        <div className="fade select-text mb-10">
          <ul>
            {list.map((item) => {
              return (
                <li key={item.name} className="inline-block mb-4 w-1/4">
                  <a className="link link-defalut" href={item.link} target="_blank" rel="noopener noreferrer">
                    {item.name}
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  )
}

export default Friend
