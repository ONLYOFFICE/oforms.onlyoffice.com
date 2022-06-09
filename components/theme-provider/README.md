# ThemeProvider

Custom theme provider based on [Theme Provider](https://github.com/callstack/react-theme-provider).

You can change the CSS styles in the theme, and they will be applied to all children components of ThemeProvider

### Usage

```js
import { ThemeProvider } from "../components/theme-provider";
import Themes from "../components/themes";
```

```jsx
const newTheme = { ...Themes.Base, color: "red" };

<ThemeProvider theme={newTheme}>
  <App />
</ThemeProvider>;
```

#### App.js

```js
import { withTheme, useTheme } from "../components/theme-provider";
```

You can access the theme data in your components by wrapping it in withTheme HOC:

```js
class App extends React.Component {
  render() {
    return <div style={{ color: props.theme.color }}>Hello</div>;
  }
}

export default withTheme(App);
```

Another usage for functional component:

```js
const App = ({ theme }) => (
  <div style={{ color: theme.color }}>
    Hello
  </div>
);

export withTheme(App);
```

You can also use the hooks based API:

```js
function App() {
  const theme = useTheme();

  return <div style={{ color: theme.color }}>Hello</div>;
}
```
