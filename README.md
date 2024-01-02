# next - 투표

---

## 개요

신입이던 시절.. 회사에서 **회식장소**를 정해야 했습니다..

이 중압감이 장난 아니더라구요.. 그냥 정하고 갔을때 후 폭풍이 좀 걱정됐어요!

투표 앱들을 찾아보는데 **메뉴 정보**를 넣고, **가는 길**을 넣고, **블로그 후기**도 넣고 하고 싶은데.. 

커스텀으로 만들 수 있는.. 그런 앱은 없는 것 같았어요.

이런 기능을 넣은 **간단하게 투표**할 수 있는 **앱**이 있으면 좋겠다고 생각했습니다.

그럼 제가 만들면 되지 않겠습니까? 

그래서 만들었습니다. 커스텀 투표 앱!


https://github.com/ohe1013/next-study/assets/84114149/bb1d8ffb-666d-4590-9648-d30d03d444b7




[OHK 투표 사이트](https://next-study-ochre.vercel.app/)

`next.js`를 학습할 목표로 만들었습니다.

`notion database`로 `db`를 구성하였고 `notion api`로 `crud`를 진행하였습니다.

`react-query`를 추가적으로 학습할 목적으로 추가되었습니다.

간단하지만, `chart.js`로 결과를 보여줄 수 있도록 하였습니다. 

## 진행중

### TODO LIST

- 관리자 기능
    - 관리자가 각자의 팀이나 회사가 커스텀하여 쓸 수 있도록 index 수정
- 회사나 팀 코드로 관리할 수 있게 수정
    - 관리자 기능과 비슷하게 각 code로 접속가능 하도록 수정
- db 이전 (notion → whatever)
    - 현재 notion database와 notion api로 접속하고 있지만 수정이 필요해보임

## 사용한 언어 및 라이브러리

- 프로그래밍언어 : `typescript` `javacript`
- 프레임워크: `next.js`
- 라이브러리 : `React` `notion/client`  `lottiefiles/lottie-player` `chart.js` `react-query` `Tailwind CSS` `axios`
- 배포 환경 : `vercel`
- 기타 : `ESLint` `Prettier`
