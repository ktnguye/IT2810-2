import { useState, useEffect } from 'react';
import '../css/TopBar.css';

export default function SearchBar({
  search,
}: {
  search: (term: string) => void;
}) {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      console.log('searching for', searchTerm);
      search(searchTerm);
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [search, searchTerm]);

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
    search(term);
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
