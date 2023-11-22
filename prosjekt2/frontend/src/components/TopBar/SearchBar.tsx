import { useState, useEffect } from 'react';
import './TopBar.css';

export default function SearchBar(props: { search: (term: string) => void }) {
  const [searchTerm, setSearchTerm] = useState('');

  // Searches for the song when the search term changes or when the timer runs out
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      props.search(searchTerm);
    }, 300);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchTerm]);

  // Updates the search term when the user types
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
  };

  // Searches for the song when the user presses enter
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
      name="search-bar"
      placeholder="Search for song"
      value={searchTerm}
      onChange={handleChange}
      onKeyDown={handleKeyPress}
    />
  );
}
