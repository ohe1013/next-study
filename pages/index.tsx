import Head from 'next/head'
import Layout from 'components/layout'
import Programmer from 'components/programmer'
import { Client } from '@notionhq/client'
import { TOKEN, DATABASE_ID, DATABASE_ID_USER } from '../config/index'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
type User = {
  [name: string]: {
    up: number
  }
}
import Input from 'components/basic/Input'

export default function Home({ users }: { users: User }) {
  const uesrNameArr = Object.keys(users)
  const [userName, setUserName] = useState<string>('')
  const onChangeUserName = (e: any) => {
    setUserName(e.target.value)
  }
  const validName = (name: string) => {
    return uesrNameArr.includes(name)
  }

  return (
    <div className="bg-primary">
      <Layout>
        <Head>
          <title>회식 투표 앱</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Wrapper>
          <Container>
            <ContainerWrapper>
              <Programmer></Programmer>
              <MainContents>
                <h1>정도유아이티 솔루션개발본부 회식</h1>
                <div className="leading-relaxed">
                  추천 1회, 비추천 1회 가능합니다.
                </div>
                <div className="mb-8 leading-relaxed text-red-300">
                  *추천은 필수지만, 비추천은 안하셔도 괜찮습니다.
                </div>
                <FormContainer>
                  <Input
                    labelName="이름"
                    id="hero-field"
                    type="text"
                    value={userName}
                    onChange={onChangeUserName}
                  />
                  <Link
                    className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                    rel="preload"
                    style={
                      validName(userName)
                        ? {}
                        : { pointerEvents: 'none', backgroundColor: 'gray' }
                    }
                    href={{
                      pathname: './main',
                      query: { name: userName, up: users[userName]?.up },
                    }}
                  >
                    입장
                  </Link>
                </FormContainer>
              </MainContents>
            </ContainerWrapper>
          </Container>
        </Wrapper>
      </Layout>
    </div>
  )
}

const Wrapper = styled.section`
  display: flex;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  color: rgb(75, 85, 99);
`
const Container = styled.div`
  padding: 100px 20px;
  margin: 0 auto;
`
const ContainerWrapper = styled(Container)`
  display: flex;
  align-items: center;
`
const MainContents = styled.div`
  align-items: center;
  h1 {
    color: rgb(17, 24, 39);
    font-weight: 500;
    margin-bottom: 16px;
    font-size: 36px;
    line-height: 40px;
  }
`
const FormContainer = styled.div`
  justify-content: flex-start;
  align-items: flex-end;
  width: 100%;
  display: flex;
`

export async function getServerSideProps() {
  const notion = new Client({ auth: TOKEN })
  const result = await notion.databases.query({
    database_id: DATABASE_ID_USER!,
  })
  const _users = result.results
  const users: User = {}
  _users.forEach((_user: any) => {
    users[_user.properties.name.title[0].plain_text] = {
      up: _user.properties.up.number,
    }
  })
  return {
    props: {
      users,
    },
  }
}
