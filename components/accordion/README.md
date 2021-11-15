# Accordion

Displays collapsible content panels for presenting information in a limited amount of space.

### Usage

```js
import  { Accordion, AccordionItem } from "../components/accordion";
```

```jsx
<Accordion level={4}>
  <AccordionItem heading="Are ONLYOFFICE forms free to use?">
    Lorem ipsum
  </AccordionItem>
  <AccordionItem heading="Do I need to register to fill out a form?">
    Lorem ipsum
  </AccordionItem>
  <AccordionItem heading="Can I download the forms and create documents using them locally?">
    Lorem ipsum
  </AccordionItem>
</Accordion>
```

### Properties

| Props       |   Type   | Required | Values | Default | Description       |
| ----------- | :------: | :------: | :----: | :-----: | ----------------- |
| `level`     | `array`  |    -     |   -    |    -    | The heading level |
| `style`     |  `obj`   |    -     |   -    |    -    | Accepts CSS style |
| `tabIndex`  | `number` |    -     |   -    |    -    | tab index         |
| `id`        | `string` |    -     |   -    |    -    | Accepts id        |
| `className` | `string` |    -     |   -    |    -    | Accepts class     |
