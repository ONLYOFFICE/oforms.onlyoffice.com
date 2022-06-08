# Box

Custom Link.

### Usage

You can create box to wrap something

```js
import Box from "../components/box";
```

```jsx
<Link label="link" href="/" target="_blank" />
```

```jsx
<Box {...args}>
  <div style={{ border: "1px solid #CCCCCC", width: "50px", height: "50px" }}>
    Box 1
  </div>
  <div style={{ border: "1px solid #CCCCCC", width: "50px", height: "50px" }}>
    Box 2
  </div>
  <div style={{ border: "1px solid #CCCCCC", width: "50px", height: "50px" }}>
    Box 3
  </div>
</Box>
```

### Properties

| Props            |      Type      | Required | Values | Default | Description        |
| ---------------- | :------------: | :------: | :----: | :-----: | ------------------ |
| `background`     |    `string`    |    -     |   -    |    -    | Box background     |
| `border`         |    `string`    |    -     |   -    |    -    | Box border         |
| `justifyContent` |    `string`    |    -     |   -    |    -    | Box justifyContent |
| `alignItems`     |    `string`    |    -     |   -    |    -    | Box alignItems     |
| `flexWrap`       |    `string`    |    -     |   -    |    -    | Box flexWrap       |
| `flexDirection`  |    `string`    |    -     |   -    |    -    | Box flexDirection  |
| `alignContent`   |    `string`    |    -     |   -    |    -    | Box alignContent   |
| `className`      |    `string`    |    -     |   -    |    -    | Accepts class      |
| `id`             |    `string`    |    -     |   -    |    -    | Accepts id         |
| `tabIndex`       |    `number`    |    -     |   -    |    -    | Accepts tab index  |
| `style`          | `obj`, `array` |    -     |   -    |    -    | Accepts css style  |
