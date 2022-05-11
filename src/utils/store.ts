import { useEffect, useState } from 'react'
import { Issue } from '@/type'

export enum ActionType {
  SET_COUNT,
  SET_ISSUES,
}

type Action =
  | {
      type: ActionType.SET_COUNT
      count: number
    }
  | {
      type: ActionType.SET_ISSUES
      page: number
      issues: Array<Issue>
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
    case ActionType.SET_COUNT:
      return {
        ...state,
        count: action.count,
      }
    case ActionType.SET_ISSUES:
      const collection = state.collection
      collection.set(action.page, action.issues)
      return {
        ...state,
        collection,
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
