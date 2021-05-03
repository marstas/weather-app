import React from "react";
import Bookmark from "./Bookmark";

type BookmarksProps = {
  children: string[];
  handleBookmarkClick: (bookmark: string) => void;
  handleStarClick: (bookmark: string, remove?: boolean) => void;
};

export default function Bookmarks({
  children,
  handleBookmarkClick,
  handleStarClick
}: BookmarksProps): JSX.Element {
  return (
    <div className="bookmarks-wrapper">
      {children.map((bookmark) => (
        <Bookmark
          key={bookmark}
          bookmark={bookmark}
          onBookmarkClick={handleBookmarkClick}
          onStarClick={handleStarClick}
        />
      ))}
    </div>
  );
}
