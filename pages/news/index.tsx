import NewsList from '../../components/NewsList';
import { server } from '../../utils/env';
import dbConnect from '../../utils/dbConnect';

function Newses({posts}) {
    
    return (
        <div>
            <NewsList posts={posts} />
        </div>
    )
}

export const getStaticProps = async () => {
  await dbConnect();
    const res = await fetch(`${server}/api/posts`)
    const posts = await res.json()
  
    return {
      props: {
        posts
      }
    }
  }

export default Newses;