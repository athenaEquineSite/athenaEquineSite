import PostList from '../components/PostList';
const news = ({posts}) => {
    
    return (
        <div>
            <PostList posts={posts} />
        </div>
    )
}

export const getStaticProps = async () => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=6`)
    const posts = await res.json()
  
    return {
      props: {
        posts
      }
    }
  }

export default news;