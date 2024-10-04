function checkBrowser() {
  if (typeof window === "undefined") {
    return {};
  }

  const userAgent = navigator.userAgent;

  return {
    isOpera: /OPR|Opera/.test(userAgent),
    isFirefox: /Firefox/.test(userAgent),
    isChrome: /Chrome/.test(userAgent) && !/Edge/.test(userAgent),
    isIOS: /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream,
  };
}

function openUriWithTimeoutHack(uri, failCb, successCb) {
  const timeout = setTimeout(() => {
    failCb();
    handler.remove();
  }, 1000);

  const handler = registerEvent(window, "blur", () => {
    clearTimeout(timeout);
    handler.remove();
    successCb();
  });

  window.location = uri;
}

function openUriWithHiddenFrame(uri, failCb, successCb) {
  let handler;

  const timeout = setTimeout(() => {
    failCb();
    handler.remove();
  }, 1000);

  handler = registerEvent(window, "blur", () => {
    clearTimeout(timeout);
    handler.remove();
    successCb();
  });

  const iframe = createHiddenIframe(document.body);
  iframe.src = uri;
}

function registerEvent(target, eventType, cb) {
  target.addEventListener(eventType, cb);
  return {
    remove: () => target.removeEventListener(eventType, cb),
  };
}

function createHiddenIframe(target) {
  const iframe = document.createElement("iframe");
  iframe.style.display = "none";
  target.appendChild(iframe);
  return iframe;
}

function protocolCheck(uri, failCb, successCb, unsupportedCb) {
  const failCallback = () => failCb && failCb();
  const successCallback = () => successCb && successCb();

  if (typeof window !== "undefined" && window.navigator.msLaunchUri) {
    openUriWithTimeoutHack(uri, failCallback, successCallback);
  } else {
    const browser = checkBrowser();
    if (browser.isFirefox || browser.isChrome || browser.isOpera || browser.isSafari) {
      openUriWithTimeoutHack(uri, failCallback, successCallback);
    } else {
      unsupportedCb && unsupportedCb();
    }
  }
}

export function scriptProtocolCheck(uri, failCb, successCb, unsupportedCb) {
  protocolCheck(
    uri,
    function () {
      failCb && failCb();
    },
    function () {
      successCb && successCb();
    },
    function () {
      unsupportedCb && unsupportedCb();
    }
  );
}