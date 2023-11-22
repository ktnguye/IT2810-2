import { useState } from 'react';
import { useDispatch } from 'react-redux';
import './SideBar.css';
import Tag from './Tag';
import songifyLogo from '../../assets/songify-logo.png';
import { Link } from 'react-router-dom';

export default function SideBar(props: {
  tags: string[];
  currentTags: string[];
}) {
  const [selectedTag, setSelectedTag] = useState<string>('');
  const dispatch = useDispatch();

  const setTag = (tag: string) => {
    setSelectedTag(tag);
    dispatch({ type: 'SET_TAG', payload: tag });
  };

  return (
    <header className="side-bar">
      <Link
        to="/project2/"
        onClick={() => {
          window.location.href = '/project2/';
        }}
      >
        <h1>
          <img src={songifyLogo} className="side-bar-logo" alt="songify logo" />
        </h1>
      </Link>
      <h2>Tag</h2>
      <section className="tags-display">
        {props.tags.map((tag, index) => (
          <Tag
            key={index}
            tag={tag}
            isSelected={tag === selectedTag}
            selectTag={setTag}
            isActive={props.currentTags.includes(tag)}
          />
        ))}
      </section>
    </header>
  );
}
