import { verify } from 'jsonwebtoken';
import { jwtSecret } from '../../../utils/env';
import User from '../../../models/User';
import ImageContainer from '../../../components/ImageContainer';

export default function Gallery() {
    return (
        <div className={`row`}>
            <div className={`col-6`}>
                <h1>Stable1</h1>
                <ImageContainer />
            </div>
            <div className={`col-6`}>
                <h1>Stable2</h1>
                <ImageContainer />
            </div>
        </div>
    )
}

export const getServerSideProps = async (context) => {
    const {auth} = context.req.cookies;

    if(!auth) {
        return {
            redirect: {
                destination: '/aeas',
                permanent: false
            }
        }
    }
    const match = await verify(auth, jwtSecret);
    const user = await User.findOne({userId: match.sub});
    if(!user) {
        return {
            redirect: {
                destination: '/aeas',
                permanent: false
            }
        }
    }

    

    return {
        props: {}
    }
}
