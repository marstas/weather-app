export function isValidSearchInput(input: string): boolean {
  if (input.match(/[0-9$&+:;=?@#|<>^*()%!~[\]{}\\/]/) || !input) return false;
  else return true;
}

export function isCityBookmarked(bookmarks: string | null, city: string): boolean {
  if (bookmarks?.match(new RegExp(city, "i"))) return true;
  else return false;
}

export function getBookmarks(): string | null {
  return localStorage.getItem("stars");
}
