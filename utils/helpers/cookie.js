const setCookie = (cookieName, cookieValue, hourToExpire) => {
  let date = new Date();
  date.setTime(date.getTime() + hourToExpire * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  const tmpCookie =
    cookieName + "=" + cookieValue + "; " + expires + "; path=/";
  document.cookie = tmpCookie;
};

const getCookie = (name) => {
  let matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

const setLngCookie = (name, value, options = null) => {
  options = {
    path: "/",
    ...options,
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie =
    encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
};

export { getCookie, setCookie, setLngCookie };
