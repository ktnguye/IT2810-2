import React, { useState } from 'react';
import TopBar from '../components/TopBar';
import SideBar from '../components/SideBar';
import SongFeed from '../components/SongFeed';
import SongDisplay from '../components/SongDisplay';
import '../css/Home.css';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const updateSearchTerm = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <div className='home'>
      <SideBar />
      <div className='home-page-content'>
        <TopBar setGlobalSearchTerm={updateSearchTerm} />
        <div className='home-page-song-content'>
          <SongFeed />
          <SongDisplay />
        </div>
      </div>
    </div>
  );
}
