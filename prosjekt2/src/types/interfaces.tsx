export interface SongInterface {
  id: number;
  title: string;
  artist: string;
  genres: string[];
  year: number;
  album: string;
  length: number;
  rating: number;
  cover: string;
}

export interface OptionInterface {
  value: string;
  label: string;
}
