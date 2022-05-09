/**
 * 生成范围内随机整数
 */
export const random = (a: number, b: number): number => Math.floor(Math.random() * (b - a))

/**
 * Fisher–Yates Shuffle 洗牌算法
 */
export const shuffle = (array: any) => {
  let m = array.length
  let i
  while (m) {
    i = Math.floor(Math.random() * m--)
    ;[array[m], array[i]] = [array[i], array[m]]
  }
  return array
}

/**
 *  延时函数
 */
export const delay = <T>(time: number): Promise<T> => new Promise((r) => setTimeout(r, time))
