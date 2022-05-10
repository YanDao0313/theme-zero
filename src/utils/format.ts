import { format } from 'timeago.js'
import { Issue } from '@/type'

/**
 * 格式化文章
 */
const regex = /^(.+)?\r\n\s*(.+)?\r\n/
const coverRegex = /^\[(.+)\].*(http.*(?:jpg|jpeg|png|gif|webp))/
export const formatIssue = (issue: Issue): Issue => {
  const { body, created_at } = issue
  const result = regex.exec(body)!
  const cover = coverRegex.exec(result[1])
  if (cover && cover.length === 3) {
    issue.description = result[2]
  } else {
    issue.description = result[1]
  }
  issue.created_at = format(created_at, 'zh_CN').replace(/\s/, '')
  return issue
}

/**
 * 图片 cdn 加速，时雨个人使用
 */
const isMe = window.location.host.includes('chanshiyu.com')
const GithubPrefix = 'raw.githubusercontent.com/chanshiyucx/yoi/master'
const JSDriverPrefix = 'cdn.jsdelivr.net/gh/chanshiyucx/yoi@latest'
export const fileCDN = (url: string) => {
  if (isMe && url.includes(GithubPrefix)) {
    return url.replace(GithubPrefix, JSDriverPrefix)
  }
  return url
}
