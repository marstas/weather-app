export function isValidSearchInput(input: string): boolean {
  if (input.match(/[0-9$&+:;=?@#|<>^*()%!~[\]{}\\/]/) || !input) return false;
  else return true;
}

export function isCityBookmarked(bookmarks: string[], city: string): boolean {
  if (bookmarks.find((bookmark) => bookmark.match(new RegExp(city, "i")))) return true;
  else return false;
}

export function getLocalBookmarks(): string[] {
  if (storageAvailable("localStorage")) {
    const bookmarkString = window.localStorage.getItem("stars");
    const bookmarkArray = bookmarkString?.split(";");
    return [...new Set(bookmarkArray)]; // distinct bookmark array
  } else {
    return [];
  }
}

export function setLocalBookmarks(bookmarkArray: string[]): void {
  const bookmarkString = bookmarkArray.join(";");
  if (storageAvailable("localStorage")) {
    if (bookmarkArray.length > 0) window.localStorage.setItem("stars", bookmarkString);
    else window.localStorage.removeItem("stars");
  }
}

// source: https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API#testing_for_availability
export function storageAvailable(type: string): boolean {
  let storage;
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    storage = (window as { [key: string]: any })[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      // everything except Firefox
      (e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === "QuotaExceededError" ||
        // Firefox
        e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}
