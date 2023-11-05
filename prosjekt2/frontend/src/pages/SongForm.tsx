import { useState } from 'react';
import '../css/SongForm.css';

interface SongFormProps {
  closePopup: () => void;
}

export default function SongForm({ closePopup }: SongFormProps) {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const genres = [
    'Rap',
    'Pop',
    'Rock',
    'Country',
    'Jazz',
    'Classical',
    'Metal',
  ];

  return (
    <div className="song-form-page">
      <div className="song-form">
        <button className="close-songform-button" onClick={closePopup}>
          X
        </button>
        <h1>Add New Song</h1>
        <form action="">
          <label>
            Title <input name="title" type="text" required />
          </label>
          <br /> <br />
          <label>
            Artist <input name="artist" type="text" required />
          </label>
          <br /> <br />
          <label>
            Description: <input name="description" type="text" />
          </label>
          <br /> <br />
          <label>
            Genre:{' '}
            <select name="genre">
              <option value="Pop">Pop</option>
              <option value="Pop">Pop</option>
              <option value="Pop">Pop</option>
            </select>
          </label>
          <button className="add-song-button" type="submit">
            Add song
          </button>
        </form>
      </div>
    </div>
  );
}
