import { GraphQLModel } from '@/type'

export default {
  queryIssuesCount: ({ username, repository }: GraphQLModel) => `
    query { 
      repository(owner:"${username}", name: "${repository}") {
        issues(states:OPEN) {
          totalCount
        }
      }
    }
  `,
  queryInspirationCount: ({ username, repository }: GraphQLModel) => `
    query {
      repository(owner:"${username}", name: "${repository}") {
        issues(states:CLOSED, labels: ["Inspiration"]) {
          totalCount
        }
      }
    }
  `,
  queryFilterIssuesCount: ({ username, repository, label, milestone }: GraphQLModel) => `
    {
      search(type: ISSUE, query: "
        user:${username}
        repo:${repository}
        state:open
        ${milestone ? 'milestone:' + milestone : ''}
        ${label ? 'label:' + label : ''}
      ") {
        issueCount
      }
    }
  `,
}
