export function setCookie(name, value, options = {}) {
  let cookieStr = `${encodeURIComponent(name)}=${encodeURIComponent(
    value,
  )}; path=${options.path || "/"}`;

  if (options.sameSite) {
    cookieStr += `; SameSite=${options.sameSite}`;
  }

  if (options.secure) {
    cookieStr += `; Secure`;
  }

  if (options.expires) {
    cookieStr += `; Expires=${options.expires.toUTCString()}`;
  }

  document.cookie = cookieStr;
}

export function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
}

export function deleteCookie(name) {
  document.cookie = `${name}=; Max-Age=0; path=/`;
}
