import Link from 'next/link';
import { useLang } from '../context/LanguageProvider';

const Post = ({post}) => {

    const isNor = useLang();

    return (
        <Link href="/aeas/posts/[id]" as={`/aeas/posts/${post.postId}`} >
            <a>
                <h3>{isNor ? post.nor.title : post.eng.title}</h3>
            </a>
        </Link>
    )
}

export default Post;