import NewsList from '../../components/NewsList';

const news = ({posts}) => {
    
    return (
        <div>
            <NewsList posts={posts} />
        </div>
    )
}

export const getStaticProps = async () => {
    const res = await fetch(`http://localhost:3000/api/posts`)
    const posts = await res.json()
  
    return {
      props: {
        posts
      }
    }
  }

export default news;