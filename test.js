const works = [1, 2, 3, 4, 5]
const n = 5
const result = 22

/**
 *
 * @param {Array} arr
 */
function findMax12(arr) {
  let max1IdxList = []
  let max1 = 0
  let max2 = 0
  let maxCount = 0
  arr.forEach((val, idx) => {
    if (val > max1) {
      max1 = val
    }
  })
  arr.forEach((val, idx) => {
    if (val === max1) return
    if (val > max2) {
      max2 = val
      max2Idx = idx
    }
  })
  arr.forEach((val, idx) => {
    if (val === max1) {
      max1IdxList.push(idx)
      maxCount++
    }
  })
  return [max1, max1IdxList, max2, maxCount]
}

function solution(n, works) {
  let answer = 0
  let count = n
  let workList = [...works]

  while (count > 0) {
    const [max1, max1IdxList, max2, maxCount] = findMax12(workList)
    const _val = maxCount * (max1 - max2)
    if (_val === count) {
      max1IdxList.forEach((idx) => {
        workList[idx] = workList[idx] - (max1 - max2)
      })
      count = 0
    } else if (_val > count) {
      max1IdxList.forEach((idx) => {
        if (count === 0) return
        workList[idx] = workList[idx] - 1
        count--
      })
    } else {
      max1IdxList.forEach((idx) => {
        workList[idx] = workList[idx] - (max1 - max2)
      })
      count -= _val
    }
  }
  answer = workList.reduce((prev, cur) => prev + Math.pow(cur, 2), 0)

  return answer
}
if (solution(n, works) === result) console.log(1)
