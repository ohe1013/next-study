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




[OHK 투표 사이트](https://next-study-y6ub.vercel.app/)

`next.js`를 학습할 목표로 만들었습니다.

`notion database`로 `db`를 구성하였고 `notion api`로 `crud`를 진행하였습니다.

데이터 캐싱 및 실시간 데이터를 chart로 보여주기 위해 mutation을 통한 선언형 처리를 위해 'react-query'를 도입하였습니다.

notion api의 불편한 부분이 많아 react-query의 도움을 통해 해결하고자 하였습니다.

내부 전역 state관리는 recoil , 서버 state관리는 react-query 구조로 하였습니다.

간단하지만, `chart.js`로 결과를 보여줄 수 있도록 하였습니다. 

관리자 기능을 통해 새롭게 데이터를 추가할 수 있도록 진행하였습니다.

관리자 기능을 추가하는 과정을 'toss'의 'use-funnel'과 같은 구조로 진행하고자하여, 커스텀하여 구현하였습니다.

기존의 페이지 구조에서 feature를 사용한 page 구조로 구현을 변경중에 있습니다. 

feature 내부에 component, query, api, hook 까지 넣어 하나의 'feature' 로 구분하는 형식을 취하도록 변경하고 있습니다.

이 형식의 장점은 next.js 는 하나의 page를 하나의 feature로 생각하고 접근한다면, 구조화 하기 편하다고 생각했습니다.

기존 폴더 구조가 component, api, service, hook 등 다양한 폴더에 각각 feature를 넣어 접근했다면, 이걸 역으로 feature하나에 넣는 방식으로 페러다임을 변경한 것 입니다.

next.js 구조와 잘 맞는다고 생각하여 도입하였고 이는 잘 맞는 것 같습니다.

## 진행중

### TODO LIST

- 새롭게 만들어진 투표내용 출력하도록 수정
    - 기존에 만들어진 페이지는 특정 페이지를 보여주기 위한 기능을 통해 구현되어 있었기 때문에 수정이 필요합니다.
- db 이전 (notion → whatever)
    - 현재 notion database와 notion api로 접속하고 있지만 수정이 필요해보임

## 사용한 언어 및 라이브러리

- 프로그래밍언어 : `typescript` `javacript`
- 프레임워크: `next.js`
- 라이브러리 : `React` `notion/client`  `lottiefiles/lottie-player` `chart.js` `react-query` `Tailwind CSS` `axios`
- 배포 환경 : `vercel`
- 기타 : `ESLint` `Prettier`
