# Link

Custom Link.

### Usage

You can pass the nested elements as children, or if the nested element is just text, then using the prop label

```js
import Link from "../components/link";
```

```jsx
<Link label="link" href="/" target="_blank" />
```

```jsx
<Link href="/" target="_blank">
  <div>Link</div>
</Link>
```

### Properties

| Props           |        Type        | Required |                Values                |        Default        | Description                                                                                 |
| --------------- | :----------------: | :------: | :----------------------------------: | :-------------------: | ------------------------------------------------------------------------------------------- |
| `className`     |      `string`      |    -     |                  -                   |           -           | Accepts class                                                                               |
| `id`            |      `string`      |    -     |                  -                   |           -           | Accepts id                                                                                  |
| `label`         |      `string`      |    -     |                  -                   |           -           | link text                                                                                   |
| `fontSize`      |      `string`      |    -     |                  -                   |        `14px`         | link text font-size                                                                         |
| `fontWeight`    | `number`, `string` |    -     |                  -                   |           -           | link text font-weight                                                                       |
| `textTransform` |      `string`      |    -     |                  -                   |           -           | link text text-transform                                                                    |
| `href`          |      `string`      |    -     |                  -                   |           -           | Used as HTML 'href' property                                                                |
| `title`         |      `string`      |    -     |                  -                   |           -           | Used as HTML 'title' property                                                               |
| `tabIndex`      |      `number`      |    -     |                  -                   |         `-1`          | link tab index                                                                              |
| `target`        |      `string`      |    -     | `_blank`, `_self`, `_parent`, `_top` |       `_blank`        | The target attribute specifies where the linked document will open when the link is clicked |
| `color`         |      `string`      |    -     |                  -                   |           -           | link text color                                                                             |
| `onClick`       |       `func`       |    -     |                  -                   |           -           | Accepts css style                                                                           |
| `rel`           |      `string`      |    -     |                  -                   | `noopener noreferrer` | Attribute defines the relationship between a linked resource and the current document       |
