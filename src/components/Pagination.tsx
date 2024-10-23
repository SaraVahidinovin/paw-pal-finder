import GlobalStateContext from '../context/GlobalStateContext';
import { useContext } from 'react';
import '../styles/pagination.css'

const Pagination = ({ dataSource }: { dataSource: any[] }) => {
    const { currentPage, setCurrentPage, itemsPerPage } = useContext(GlobalStateContext);

    const totalPages = Math.ceil(dataSource.length / itemsPerPage);

    // Don't render the pagination if there are no pages
    if (totalPages === 0) return null;

    const goToPage = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="pagination">
            <button onClick={() => goToPage(1)} disabled={currentPage === 1}>First</button>
            <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>Previous</button>

            <span className="page-indicator">
                {currentPage} of {totalPages}
            </span>
            
            <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
            <button onClick={() => goToPage(totalPages)} disabled={currentPage === totalPages}>Last</button>
        </div>
    );
};

export default Pagination;
