import { useEffect } from 'react';


const EditPost = ({post}) => {

    useEffect(() => {
        if(document.body.classList.contains('solbergBackground')) {
          document.body.classList.remove('solbergBackground')    
        }
        if(document.body.classList.contains('kolbjornrudBackground')) {
            document.body.classList.remove('kolbjornrudBackground')    
        }
      });

    return (
        <div>{post.postId}</div>
    )
}

export const getServerSideProps = (context) => {
    return {
        props: {post: JSON.parse(context.query.data)}
    }
}

export default EditPost;