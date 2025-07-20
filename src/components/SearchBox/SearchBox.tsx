import css from "./SearchBox.module.css";
import { useState } from "react";

interface SearchBoxProps {
  onSearch: (query: string) => void;
}

export default function SearchBox({ onSearch }: SearchBoxProps) {
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      name="query"
      autoComplete="off"
      autoFocus
      value={query}
      onChange={handleChange}
    />
  );
}