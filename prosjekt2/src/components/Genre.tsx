import React from "react";

export default function Genre(props: { genre: string }) {
  return <button className="genre">{props.genre}</button>;
}
