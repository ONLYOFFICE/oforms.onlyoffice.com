# Button selector

Button selector is used for a action on a page.

### Usage

```js
import ButtonSelector from "../components/button-selector";
```

```jsx

const args =  [
  {title: 'Download as DOCXF', href: '/404'}, 
  {title: 'Download as OFORM', href: '/401'},
];

<ButtonSelector
  array={args}
  defaultVal="Download as"
/>
```

### Properties

| Props            |      Type      | Required | Values | Default | Description                        |
| ---------------- | :------------: | :------: | :----: | :-----: | ---------------------------------- |
| `array`          |    `array`     |    -     |   -    |    -    | Set array for export list          |
| `defaultVal`     |    `string`    |    -     |   -    |    -    | Set default value for select item  |