# Dropdown

Display Dropdown.

### Usage

```js
import Dropdown from "../components/dropdown";
```

```jsx

const args =  [
    'All', 
    'Plugins', 
    'Apps',
];

<Dropdown
    array={args}
    defaultVal="All"
    level={1}
/>
```

### Properties

| Props                  |      Type      | Required | Values | Default | Description                   |
| ---------------------- | :------------: | :------: | :----: | :-----: | ----------------------------- |
| `array`                |    `array`     |    -     |   -    |    -    | Set array for export list     |
| `label`                |    `string`    |    -     |   -    |    -    | Set label before dropdown     |
| `defaultVal`           |    `string`    |    -     |   -    |    -    | Set default value for select item |
| `level`                |    `array`     |    -     |   -    |    -    | The heading level             |
| `className`            |    `string`    |    -     |   -    |    -    | Accepts class                 |
| `id`                   |    `string`    |    -     |   -    |    -    | Accepts id                    |
| `tabIndex`             |    `number`    |    -     |   -    |    -    | Accepts tab index             |
