import React from "react";
import yellowStar from "../assets/star_yellow.svg";

type BookmarkProps = {
  bookmark: string;
  onBookmarkClick: (bookmark: string) => void;
  onStarClick: (bookmark: string, remove: boolean) => void;
};

export default function Bookmark({
  bookmark,
  onBookmarkClick,
  onStarClick
}: BookmarkProps): JSX.Element {
  return (
    <div className="bookmark">
      <button className="bookmark-search" onClick={() => onBookmarkClick(bookmark)}>
        {bookmark}
      </button>
      <img
        alt="remove bookmark"
        className="bookmark-remove"
        title="Remove from bookmarks"
        src={yellowStar}
        onClick={() => onStarClick(bookmark, true)}
      />
    </div>
  );
}
