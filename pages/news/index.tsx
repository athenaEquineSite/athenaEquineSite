import NewsList from '../../components/NewsList';
import { server } from '../../utils/env';

const news = ({posts}) => {
    
    return (
        <div>
            <NewsList posts={posts} />
        </div>
    )
}

export const getStaticProps = async () => {
    const res = await fetch(`${server}/api/posts`)
    const posts = await res.json()
  
    return {
      props: {
        posts
      }
    }
  }

export default news;