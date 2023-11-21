export interface SongInterface {
  title: string;
  artist: string;
  tag: string;
  year: number;
  views: number;
  lyrics: string;
  id: number;
}

export interface OptionInterface {
  value: string;
  label: string;
}

export interface ReviewInterface {
  _id: number;
  songId: number;
  name: string;
  rating: number;
  review: string;
  date: Date;
}

export interface Action {
  type: string;
  payload: string;
}
