import React, { useState } from 'react';
import TopBar from '../components/TopBar';
import SideBar from '../components/SideBar';
import SongFeed from '../components/SongFeed';
import SongDisplay from '../components/SongDisplay';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const updateSearchTerm = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <div>
      <TopBar setGlobalSearchTerm={updateSearchTerm} />
      <SideBar />
      <SongFeed />
      <SongDisplay />
    </div>
  );
}
