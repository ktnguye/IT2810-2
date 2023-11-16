import { useState } from 'react';
import '../css/SideBar.css';
import Tag from './Tag';
import songifyLogo from '../assets/songify-logo.png';
import { Link, useNavigate } from 'react-router-dom';

export default function SideBar(props: {
  tags: string[];
  setTag: (tag: string) => void;
  currentTags: string[];
}) {
  const [selectedTag, setSelectedTag] = useState<string>('');

  const setTag = (tag: string) => {
    setSelectedTag(tag);
    props.setTag(tag);
  };

  const navigate = useNavigate();

  return (
    <div className="side-bar">
      <Link
        to="/project2"
        onClick={(e) => {
          e.preventDefault();
          navigate('/project2');
          window.location.reload();
        }}
      >
        <img src={songifyLogo} className="side-bar-logo" alt="songify logo" />
      </Link>
      <h2>Tag</h2>
      <div className="tags-display">
        {props.tags.map((tag, index) => (
          <Tag
            key={index}
            tag={tag}
            isSelected={tag === selectedTag}
            selectTag={setTag}
            isActive={props.currentTags.includes(tag)}
          />
        ))}
      </div>
    </div>
  );
}
