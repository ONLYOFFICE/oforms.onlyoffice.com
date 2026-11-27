// Aliased as `next/router` for onlyoffice-react-ui-kit. It only subscribes to
// route events to close its menus, and this page never changes route.
const noop = () => {};

const router = {
  get locale() {
    return document.documentElement.lang;
  },
  get pathname() {
    return location.pathname;
  },
  get asPath() {
    return location.pathname + location.search;
  },
  get query() {
    return Object.fromEntries(new URLSearchParams(location.search));
  },
  push(url) {
    location.assign(url);
    return Promise.resolve(true);
  },
  events: { on: noop, off: noop, emit: noop },
};

module.exports = { useRouter: () => router, default: router };
