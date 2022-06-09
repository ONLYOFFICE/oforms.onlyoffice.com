# IconButton

IconButton is used for a action on a page.

### Usage

```js
import IconButton from "../components/icon-button";
```

```jsx
<IconButton />
```

### Properties

| Props           |        Type        | Required | Values | Default | Description                                                              |
| --------------- | :----------------: | :------: | :----: | :-----: | ------------------------------------------------------------------------ |
| `className`     |      `string`      |    -     |   -    |    -    | Accepts class                                                            |
| `id`            | `number`, `string` |    -     |   -    |    -    | Set component id                                                         |
| `style`         |   `obj`, `array`   |    -     |   -    |    -    | Accepts css style                                                        |
| `color`         |      `string`      |    -     |   -    |    -    | Icon color                                                               |
| `clickColor`    |      `string`      |    -     |   -    |    -    | Icon color on click action                                               |
| `hoverColor`    |      `string`      |    -     |   -    |    -    | Icon color on hover action                                               |
| `iconName`      |      `string`      |    ✅    |   -    |    -    | Takes the path to the icon (the icon must be located in a static folder) |
| `iconClickName` |      `string`      |    -     |   -    |    -    | Icon name on click action                                                |
| `iconHoverName` |      `string`      |    -     |   -    |    -    | Icon name on hover action                                                |
| `isDisabled`    |       `bool`       |    -     |   -    |    -    | Tells when the button should present a disabled state                    |
| `isClickable`   |       `bool`       |    -     |   -    |    -    | Set cursor value                                                         |
| `grayed`        |       `bool`       |    -     |   -    |    -    | Set grayed styling                                                       |
| `onClick`       |       `func`       |    -     |   -    |    -    | What the button will trigger when clicked                                |
| `onMouseDown`   |       `func`       |    -     |   -    |    -    | What the button will trigger when cursor down                            |
| `onMouseEnter`  |       `func`       |    -     |   -    |    -    | What the button will trigger when cursor enter                           |
| `onMouseLeave`  |       `func`       |    -     |   -    |    -    | What the button will trigger when cursor leave icon                      |
| `onMouseUp`     |       `func`       |    -     |   -    |    -    | What the button will trigger when cursor up                              |
| `title`         |      `string`      |    -     |   -    |    -    | Set title                                                                |
| `size`          | `number`, `string` |    -     |   -    |    -    | Button height and width value                                            |
