import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { useQuery } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import css from "./App.module.css";
import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";
import NoteList from "../NoteList/NoteList";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import { fetchNotes } from "../../services/noteService";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

export default function App() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [debouncedSearch] = useDebounce(search, 500);
 
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch]);

  const {
    data,
    isLoading,
    isError,
    error,
    isFetching
  } = useQuery({
    queryKey: ["notes", debouncedSearch, currentPage],
    queryFn: () => fetchNotes({
      search: debouncedSearch,
      page: currentPage,
      perPage: 12,
    }),
   placeholderData: (previousData) => previousData,
});
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={setSearch} />
        {data?.totalPages && data.totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={data.totalPages}
            onPageChange={setCurrentPage}
          />
        )}
        <button className={css.button} onClick={handleOpenModal}>
          Create note +
        </button>
      </header>

      <Toaster position="top-left" />

      {(isLoading || isFetching) && <Loader/>}

      {isError && <ErrorMessage error={error as Error} />}
      
      {data?.data && data.data.length > 0 && (
        <NoteList notes={data.data}/>
      )}

      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <NoteForm onClose={handleCloseModal} />
        </Modal>
      )}
    </div>
  );
}
