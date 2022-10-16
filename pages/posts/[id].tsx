import Head from 'next/head'
import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/fetchposts'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'

type PostT = {
    id:string,
    contentHtml:string,
    title:string,
    date:string
}
  
type PostsT = {
    allPostsData: PostT[]
}

export default function Post ({ postData }:{postData:PostT}) {
    return (
        <Layout home={false}>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <article>
                <h1 className={utilStyles.headingXl}>{postData.title}</h1>
                <div className={utilStyles.lightText}>
                    <Date dateString={postData.date}/>
                </div>
                <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }}></div>
            </article>
        </Layout>
    )
}

export async function getStaticPaths() {
    const paths = getAllPostIds()

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }:{params:{id:string}}) {
    const postData = await getPostData(params.id)

    return {
        props:{
            postData,
        },
    }
}