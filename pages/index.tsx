import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Date from '../components/date'
import React from 'react'
import Layout, {siteTitle} from '../components/layout'
import { getSortedPostsData } from '../lib/fetchposts'
import utilStyles from '../styles/utils.module.css'
import { randomUUID } from 'crypto'

type PostT = {
  id:string,
  title:string,
  date:string
}

type PostsT = {
  allPostsData: PostT[]
}

const Home: React.FC<PostsT> = ({allPostsData}) => {

  return (
    <Layout home>
      <Head>
        {siteTitle}
      </Head>
      <div className={utilStyles.container}>
      <>
      {allPostsData.map((Post) => {
      const items = [<ul className={utilStyles.list} key={randomUUID()}></ul>]
      items.push(
        <li className={utilStyles.listItem} key={Post.id}>
          <Link href={`/posts/${Post.id}`}>
            <a>{Post.title}</a>
          </Link>
          <br />
          <small className={utilStyles.lightText}>
            <Date dateString={Post.date} />
          </small>
        </li>)
      return items
    })}
      </>
    </div>
    </Layout>
  )
}

export default Home

export const getStaticProps: GetStaticProps<PostsT> = async() => {

  const allPostsData = getSortedPostsData()
  // console.log(allPostsData)

  return {
    props: {
      allPostsData
    }
  }
}

