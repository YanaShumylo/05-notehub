import ReactPaginate from 'react-paginate';
import css from "./Pagination.module.css";

interface PaginationProps{
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({
    currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

    const handlePageClick = ({ selected }: { selected: number }) => {
        onPageChange(selected + 1);
    };
    return (
<ReactPaginate
        pageCount={totalPages}
      pageRangeDisplayed={3}
      marginPagesDisplayed={1}
      onPageChange={handlePageClick}
      forcePage={currentPage - 1}
      containerClassName={css.pagination}
      activeClassName={css.active}
      previousLabel="←"
      nextLabel="→"
/>        
    )
} 