import { useState } from 'react';
import '../css/TopBar.css';

export default function SearchBar({ search }: any) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    search(newSearchTerm);
  };

  return (
    <input
      className="search-bar"
      type="text"
      placeholder="Search for song"
      value={searchTerm}
      onChange={handleChange}
    />
  );
}
