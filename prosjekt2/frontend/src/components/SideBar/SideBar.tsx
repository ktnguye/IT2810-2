import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './SideBar.css';
import Tag from './Tag';
import songifyLogo from '../../assets/songify-logo.png';
import { Link } from 'react-router-dom';
import { RootState } from '../../store/reducers';

export default function SideBar(props: {
  tags: string[];
  currentTags: string[];
}) {
  const [selectedTag, setSelectedTag] = useState<string>(
    useSelector((state: RootState) => state.sidebar.tag)
  );
  const dispatch = useDispatch();

  const [isShowingFavorites, setIsShowingFavorites] = useState<boolean>(
    useSelector((state: RootState) => state.sidebar.showFavorites)
  );

  const toggleShowFavorites = () => {
    setIsShowingFavorites(!isShowingFavorites);
    dispatch({ type: 'TOGGLE_SHOW_FAVORITES', payload: !isShowingFavorites });
  };

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
      <h2>Favourite</h2>
      <div className="tags-display">
        <Tag
          tag="Favourite"
          isSelected={isShowingFavorites}
          selectTag={toggleShowFavorites}
          isActive={true}
        />
      </div>
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
