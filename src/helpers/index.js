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

export { getCookie, setCookie };
