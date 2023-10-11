import { useState } from "react";
import '../css/SongForm.css'

export default function SongForm() {
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    return (
        <div className="song-form-page">
            <div className="song-form">
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
                        Genre: <select name="genre" >
                            <option value="Pop">Pop</option>
                        </select>
                </label>
                    <label>
                        Cover:<input type="file" accept="image/*" required onChange={handleFileChange} />
                    </label>
                    <br /> <br />
                <button className="button green" type="submit">
                        Add song
                </button>
                </form>
            </div>
        </div>
    );
}