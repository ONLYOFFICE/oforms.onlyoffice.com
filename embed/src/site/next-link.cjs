// Aliased as `next/link` for onlyoffice-react-ui-kit, which renders the module
// itself as a component, so this has to stay CommonJS.
const { createElement } = require("react");

module.exports = function Link({
  href,
  locale,
  prefetch,
  scroll,
  shallow,
  replace,
  passHref,
  legacyBehavior,
  ...rest
}) {
  return createElement("a", { href: String(href ?? ""), ...rest });
};
