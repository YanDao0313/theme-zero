import { Cloud, Issue, GraphQLModel, GraphQLResponse } from '@/type'
import config from '@/config'
import documents from './documents'

const GITHUB_API = 'https://api.github.com/repos'
const GRAPHQL_API = 'https://api.github.com/graphql'
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

const createCall = async <T>(document: string): Promise<T> => {
  try {
    const payload = JSON.stringify({ query: document })
    const response = await fetch(GRAPHQL_API, {
      method: 'POST',
      headers: { Authorization: access_token },
      body: payload,
    })
    if (response.ok) {
      const result = await response.json()
      return result
    } else {
      const error = new Error(response.statusText)
      return Promise.reject(error)
    }
  } catch (error) {
    return Promise.reject(error)
  }
}

export const queryIssuesCount = (): Promise<GraphQLResponse> =>
  createCall(documents.queryIssuesCount({ username, repository }))

export const queryInspirationCount = (): Promise<GraphQLResponse> =>
  createCall(documents.queryInspirationCount({ username, repository }))

export const queryFilterIssuesCount = ({ label, milestone }: GraphQLModel): Promise<GraphQLResponse> =>
  createCall(documents.queryFilterIssuesCount({ username, repository, label, milestone }))

export const queryIssues = async (
  page: number = 1,
  pageSize: number = 10,
  filter: string = '',
): Promise<Array<Issue>> => {
  const api = `${blog}/issues?state=open&page=${page}&per_page=${pageSize}${filter}`
  return githubQuery(api)
}

export const queryIssue = async (number: string): Promise<Issue> => {
  const api = `${blog}/issues/${number}?state=open`
  return githubQuery(api)
}

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
