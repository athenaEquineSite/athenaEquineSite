import styles from '../styles/Pagination.module.scss';

const Pagination = ({newsPerPage, totalNews, paginate}) => {

    const pageNumbers = [];

    for(let i=1; i <= Math.ceil(totalNews/newsPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <nav className={`${styles.paginationContainer}`}>
            <ul>
                {pageNumbers.map(num => (
                    <li key={num} onClick={() => paginate(num)}>
                        <span>{num}</span>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Pagination;