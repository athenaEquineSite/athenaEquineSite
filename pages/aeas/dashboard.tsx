import stylesDash from '../../styles/Dashboard/Dashboard.module.scss';

const Dashboard = ({test}) => {
    return (
        <div className={stylesDash.dashboard}>
            Dashboard {test}
        </div>
    )
}

export const getServerSideProps = async (ctx) => {
    const {auth} = ctx.req.cookies;
    if(!auth) {
        return {
            redirect: {
                destination: '/aeas',
                permanent: false
            }
        }
    }
    return {
        props: {
            test: 2
        }
    }
}

export default Dashboard;