import { useEffect, useState } from 'react'
import { Issue } from '@/type'

export enum ActionType {
  QUERY_COUNT,
  QUERY_ISSUES,
}

type Action =
  | {
      type: ActionType.QUERY_COUNT
    }
  | {
      type: ActionType.QUERY_ISSUES
      page: number
    }

interface State {
  count: number
  collection: Map<number, Array<Issue>>
}

let memoryState: State = {
  count: 0,
  collection: new Map(),
}

const listeners: Array<(state: State) => void> = []

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.QUERY_COUNT:
      return {
        ...state,
      }
    case ActionType.QUERY_ISSUES:
      return {
        ...state,
      }
  }
}

export const dispatch = (action: Action) => {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

export const useStore = (): State => {
  const [state, setState] = useState<State>(memoryState)

  useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])

  return {
    ...state,
  }
}
