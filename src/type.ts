export type Cloud = {
  ip: string
  location: {
    id: string
    name: string
    country: string
    path: string
    timezone: string
    timezone_offset: string
  }
  now: {
    text: string
    code: string
    temperature: string
  }
  last_update: string
}

export type GraphQLModel = {
  username: string
  repository: string
  label?: string
  milestone?: string
}

export type GraphQLResponse = {
  data: {
    repository: {
      issues: {
        totalCount: number
      }
    }
  }
}

export type Label = {
  id: number
  url: string
  name: string
  description: string
  color: string
}

export type Milestone = {
  id: number
  number: number
  url: string
  title: string
  description: string
  open_issues: number
  updated_at: string
}

export type Issue = {
  id: number
  number: number
  url: string
  title: string
  body: string
  description: string
  created_at: string
  updated_at: string
  milestone: Milestone
  labels: Array<Label>
}
