export function isValidSearchInput(input: string): boolean {
  if (input.match(/[0-9$&+:;=?@#|<>^*()%!~[\]{}\\/]/) || !input) return false;
  else return true;
}

export function isCityBookmarked(bookmarks: string[], city: string): boolean {
  if (bookmarks.find((bookmark) => bookmark.match(new RegExp(city, "i")))) return true;
  else return false;
}

export function getLocalBookmarks(): string[] {
  const bookmarkString = window.localStorage.getItem("stars");
  const bookmarkArray = bookmarkString?.split(";");
  return [...new Set(bookmarkArray)]; // distinct bookmark array
}

export function setLocalBookmarks(bookmarkArray: string[]): void {
  const bookmarkString = bookmarkArray.join(";");
  console.log(bookmarkArray);
  if (bookmarkArray.length > 0) window.localStorage.setItem("stars", bookmarkString);
  else window.localStorage.removeItem("stars");
}
