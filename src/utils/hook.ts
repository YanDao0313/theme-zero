import { useState } from 'react'

/**
 * Page Loading
 */
export const useLoading = (duration: number = 1000) => {
  const [startTime] = useState(new Date().getTime())

  const loading = () =>
    new Promise<void>((resolve) => {
      const interval = duration - (new Date().getTime() - startTime)
      if (interval > 0) {
        setTimeout(resolve, interval)
      } else {
        resolve()
      }
    })

  return loading
}

/**
 * 本地缓存
 */
export const useLocalStorage = <T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.log(error)
      return initialValue
    }
  })

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.log(error)
    }
  }

  return [storedValue, setValue]
}
