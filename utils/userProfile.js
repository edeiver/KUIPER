const NAME_KEY = "kuiper.user.name.v1";

export function getUserName() {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage.getItem(NAME_KEY);
}

export function setUserName(name) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(NAME_KEY, name);
}
