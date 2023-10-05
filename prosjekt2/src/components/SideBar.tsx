import React from "react";
import "../css/SideBar.css";
import Genre from "./Genre";

const genres = ["Rap", "Pop", "Rock", "Country", "Jazz", "Classical"];

export default function SideBar() {
  return (
    <div className="side-bar">
      <h1>SONGIFY</h1>
      <h2>Genre</h2>

      {genres.map((genre) => (
        <Genre genre={genre} />
      ))}
    </div>
  );
}
