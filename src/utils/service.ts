import { Cloud, Issue, QueryParams, IssueLabel } from '@/type'
import config from '@/config'

const GITHUB_API = 'https://api.github.com/repos'
const CLOUD_API = 'https://service-05sqjlii-1306208233.gz.apigw.tencentcs.com/cloud'

const { username, repository, token } = config.github
const blog = `${GITHUB_API}/${username}/${repository}`
const access_token = `token ${token.join('')}`

const githubQuery = async <T>(api: string): Promise<T> => {
  try {
    const response = await fetch(api, {
      method: 'GET',
      headers: { Authorization: access_token },
    })
    if (response.ok) {
      const data = await response.json()
      return data
    } else {
      const error = new Error(response.statusText)
      return Promise.reject(error)
    }
  } catch (error) {
    return Promise.reject(error)
  }
}

export const queryIssues = async ({
  page = 1,
  pageSize = 10,
  state = 'open',
  filter = '',
}: QueryParams): Promise<Array<Issue>> => {
  const api = `${blog}/issues?state=${state}&page=${page}&per_page=${pageSize}${filter}`
  return githubQuery(api)
}

export const queryIssue = async (number: string): Promise<Issue> => {
  const api = `${blog}/issues/${number}?state=open`
  return githubQuery(api)
}

export const queryIssueByLabel = async (label: IssueLabel): Promise<Array<Issue>> => {
  const api = `${blog}/issues?state=closed&labels=${label}`
  return githubQuery(api)
}

export const queryArchive = async (page: number = 1): Promise<Array<Issue>> => queryIssues({ page, state: 'open' })

export const queryInspiration = async (page: number = 1): Promise<Array<Issue>> =>
  queryIssues({ page, state: 'closed', filter: '&labels=inspiration' })

export const queryCloud = async (): Promise<Cloud> => {
  try {
    const response = await fetch(CLOUD_API)
    if (response.ok) {
      const data: Cloud = await response.json()
      return data
    } else {
      const error = new Error(response.statusText)
      return Promise.reject(error)
    }
  } catch (error) {
    return Promise.reject(error)
  }
}
