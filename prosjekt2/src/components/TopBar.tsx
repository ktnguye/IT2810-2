import React, { useState } from 'react';
import Genre from './Genre';
import '../css/TopBar.css';

export default function TopBar(props: {
  setGlobalSearchTerm: (searchTerm: string) => void;
}) {
  const [searchTerm, setSearchTerm] = useState('');

  const updateSearchTerm = (newSearchTerm: string) => {
    props.setGlobalSearchTerm(newSearchTerm);
    setSearchTerm(newSearchTerm);
  };

  return (
    <div className="top-bar">
      <input
        className="search-bar"
        type="text"
        placeholder="Search for Artists or Songs"
        value={searchTerm}
        onChange={(event) => updateSearchTerm(event.target.value)}
      />
    </div>
  );
}
