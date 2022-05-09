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

/**
 * 图片处理
 */
export const formatImg = (href: string) => {
  const urlParams = new URLSearchParams(href.split('?')[1])
  const vw = Number(urlParams.get('vw'))
  const vh = Number(urlParams.get('vh'))
  const clientWidth = document.querySelector('.page')!.clientWidth

  // 是否预设尺寸
  let width = vw
  let height = vh
  if (width > 0) {
    if (width > clientWidth) {
      width = clientWidth
    }

    if (height) {
      height = (height * width) / vw
    }
  }

  return { width: width ? `${width}px` : '', height: height ? `${height}px` : '' }
}
