import { useState, useEffect } from 'react';
import './TopBar.css';

export default function SearchBar(props: { search: (term: string) => void }) {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      props.search(searchTerm);
    }, 300);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchTerm]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch(searchTerm);
    }
  };

  const handleSearch = (term: string) => {
    props.search(term);
  };

  return (
    <input
      className="search-bar"
      type="text"
      placeholder="Search for song"
      value={searchTerm}
      onChange={handleChange}
      onKeyDown={handleKeyPress}
    />
  );
}
