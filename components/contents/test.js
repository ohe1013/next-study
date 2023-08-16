// function check(word, index, len) {
//   const halfLen = Math.floor(len / 2)
//   let leftA = 0
//   let rightA = 0
//   for (let i = index - 1; i > index - halfLen - 1; i--) {
//     if (i < 0) {
//       if (word[i + len] === 'A') leftA++
//     } else {
//       if (word[i] === 'A') leftA++
//     }
//   }

//   for (let i = index + 1; i < index + halfLen + 1; i++) {
//     if (i > len - 1) {
//       if (word[i - len] === 'A') rightA++
//     } else {
//       if (word[i] === 'A') rightA++
//     }
//   }
//   // 왼쪽이면 return left
//   return leftA <= rightA ? 'left' : 'right'
// }
function make(asIs, toBe) {
  if (asIs.charCodeAt() - toBe.charCodeAt() < 13)
    return asIs.charCodeAt() - toBe.charCodeAt()
  else {
    return 'Z'.charCodeAt() - asIs.charCodeAt() + 1
  }
}
// function solution(word) {
//   const len = word.length
//   let defaultWord = ''
//   for (let i = 0; i < len; i++) {
//     defaultWord = defaultWord + 'A'
//   }
//   let index = 0
//   let count = -1
//   while (defaultWord != word) {
//     count++
//     count += make(word[index], defaultWord[index])
//     word = word.slice(0, index) + 'A' + word.slice(index + 1)
//     if (check(word, index, len) === 'left') {
//       if (index === 0) index = len - 1
//       else index--
//     } else {
//       if (index === len - 1) index = 0
//       else index++
//     }
//   }
//   return count
// }
// 원래 나와야할 정답이랑 같으면 count arr에 적립

function solution(word) {
  let defaultWord = ''
  let answer = 10000
  let bin = []
  for (let i = 0; i < word.length; i++) {
    defaultWord += 'A'
    if (!word[i]) bin.push([1,-1])
  }
  function findRight(word, index, count) {
    const len = word.length
    if (word[index] !== 'A') {
      count = count + make(word[index], 'A')
      word = word.slice(0, index) + 'A' + word.slice(index + 1)
      return { word, index, count }
    }
    for (let i = index + 1; i < index + len; i++) {
      if (i > len - 1) {
        if (word[i - len] === 'A') count++
        else {
          index = i - len
          count = count + make(word[index], 'A') + 1
          word = word.slice(0, index) + 'A' + word.slice(index + 1)
          break
        }
      } else {
        if (word[i] === 'A') count++
        else {
          index = i
          count = count + make(word[index], 'A') + 1
          word = word.slice(0, index) + 'A' + word.slice(index + 1)
          break
        }
      }
    }
    return { word, index, count }
  }
  function findLeft(word, index, count) {
    if (word[index] !== 'A') {
      count = count + make(word[index], 'A')
      word = word.slice(0, index) + 'A' + word.slice(index + 1)
      return { word, index, count }
    }
    const len = word.length
    for (let i = index - 1; i > index - len; i--) {
      if (i < 0) {
        if (word[i + len] === 'A') count++
        else {
          index = i + len
          count = count + make(word[index], 'A') + 1
          word = word.slice(0, index) + 'A' + word.slice(index + 1)
          break
        }
      } else {
        if (word[i] === 'A') count++
        else {
          index = i
          count = count + make(word[index], 'A') + 1
          word = word.slice(0, index) + 'A' + word.slice(index + 1)
          break
        }
      }
    }
    return { word, index, count }
  }
  function dfs(word, index, count) {
    if (word === defaultWord) {
      answer = answer < count ? answer : count
      return
    }
    //find
    let { word: w, index: i, count: c } = findLeft(word, index, count)

    //진행된 양 만큼 다시 원복해야된다. word 되돌리고, index되돌리고, count 되돌리고, visited 되돌리고
    dfs(w, i, c)
    let { word: _w, index: _i, count: _c } = findRight(w, i, c)
    dfs(_w, _i, _c)
  }
  function dfs2(word, index, count) {
    if (word === defaultWord) {
      answer = answer < count ? answer : count
      return
    }
    //find
    let { word: w, index: i, count: c } = findRight(word, index, count)
    //진행된 양 만큼 다시 원복해야된다. word 되돌리고, index되돌리고, count 되돌리고, visited 되돌리고
    dfs2(w, i, c)
    console.log(w, i, c)
    let { word: _w, index: _i, count: _c } = findLeft(w, i, c)
    console.log(_w, _i, _c)
    dfs2(_w, _i, _c)
  }
  dfs(word, 0, 0)
  dfs2(word, 0, 0)
  return answer
}

console.log(solution('ABAAAABABA'))
/*
    잘 생각해보자, 어떻게 할까?
    A가 아닌걸 잘 풀어서 놓은다음에, 완전탐색을하자 DFS로
    예를들어 DDDDDD를 풀려면 왼, 우, 왼, 우, A가 아닌걸 찾아서 움직이기만 하면된다.
    그리고 찾으면, 바꾸고나서 왼, 우, 왼, 우 로해서 또 찾는다.
    1.visited에는 A가 아닌걸 1 A이면 0으로 해놓고 돌아다닌다.
    2.방문해서 A로 바꾸고나면, visited를 0으로 바꾼다.
    3.찾는다.
    4.return 조건은 모두 A이면 return이다.
    5.visited를 복원 방문했을때 들어가고나서 돌아올때, 복원
/* 
BAAABAABCCD
내가 서있는 위치에서 왼쪽으로 가는게 이득인지 오른쪽으로 가는게 이득인지
우측을 가다가 좌측으로 가야할 필요가 있을까? 있다
BBBBAACAADA(X)AAABAAA
이런형식이면 우측으로 4칸하고 좌측으로 가는게 이득이다.
A의 갯수가 내 기준점으로 어디가 더 많은지가 기준점이다. 
그냥 우측 A 가 좌측 A 보다 적으면 거기로 가면된다.

근데 문제가 생기는건 토요일이다. 


문제 설명
조이스틱으로 알파벳 이름을 완성하세요. 맨 처음엔 A로만 이루어져 있습니다.
ex) 완성해야 하는 이름이 세 글자면 AAA, 네 글자면 AAAA

조이스틱을 각 방향으로 움직이면 아래와 같습니다.

▲ - 다음 알파벳
▼ - 이전 알파벳 (A에서 아래쪽으로 이동하면 Z로)
◀ - 커서를 왼쪽으로 이동 (첫 번째 위치에서 왼쪽으로 이동하면 마지막 문자에 커서)
▶ - 커서를 오른쪽으로 이동 (마지막 위치에서 오른쪽으로 이동하면 첫 번째 문자에 커서)
예를 들어 아래의 방법으로 "JAZ"를 만들 수 있습니다.

- 첫 번째 위치에서 조이스틱을 위로 9번 조작하여 J를 완성합니다.
- 조이스틱을 왼쪽으로 1번 조작하여 커서를 마지막 문자 위치로 이동시킵니다.
- 마지막 위치에서 조이스틱을 아래로 1번 조작하여 Z를 완성합니다.
따라서 11번 이동시켜 "JAZ"를 만들 수 있고, 이때가 최소 이동입니다.
만들고자 하는 이름 name이 매개변수로 주어질 때, 이름에 대해 조이스틱 조작 횟수의 최솟값을 return 하도록 solution 함수를 만드세요.

제한 사항
name은 알파벳 대문자로만 이루어져 있습니다.
name의 길이는 1 이상 20 이하입니다.
입출력 예
name	return
"JEROEN"	56
"JAN"	23
출처

※ 공지 - 2019년 2월 28일 테스트케이스가 추가되었습니다.
※ 공지 - 2022년 1월 14일 지문 수정 및 테스트케이스가 추가되었습니다. 이로 인해 이전에 통과하던 코드가 더 이상 통과하지 않을 수 있습니다.
*/
