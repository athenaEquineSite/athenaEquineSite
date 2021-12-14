import News from './News';
import styles from '../styles/News.module.scss';

export interface IPost {
    cloudinaryId?: String;
    cloudinaryUrl?: String;
    date: Date;
    eng: {
        title: String;
        postBody: String;
    }
    nor: {
        title: String;
        postBody: String;
    }
    postId: String;
}

const NewsList = ({posts}) => {

    const sortWithDate = (posts: IPost[]) => {
        return posts.sort((a, b) => {
            const date1 = new Date(a.date);
            const date2 = new Date(b.date);
            return date2.getTime() - date1.getTime();
        })
    }

    const sortedPosts = sortWithDate(posts);
    return (
        <div className={`${styles.newsList}`}>
        {sortedPosts.map((post, i) => (
            <News key={i} news={post}/>
        ))}
        </div>
    )
}

export default NewsList;