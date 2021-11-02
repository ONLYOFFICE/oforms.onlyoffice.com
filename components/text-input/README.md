# TextInput

Custom TextInput component.

### Usage

```js
import TextInput from "../components/text-input";
```

```jsx
const [value, isValue] = React.useState("");

<TextInput value={value} onChange={(event) => isValue(event.target.value)} />;
```

### Properties

| Props             |        Type         | Required |                Values                 |    Default    | Description                                                      |
| ----------------- | :-----------------: | :------: | :-----------------------------------: | :-----------: | ---------------------------------------------------------------- |
| `className`       |      `string`       |    -     |                   -                   |       -       | Accepts class                                                    |
| `id`              |      `string`       |    -     |                   -                   |       -       | Accepts id                                                       |
| `classNameButton` |      `string`       |    -     |                   -                   |       -       | Accepts button class                                             |
| `idButton`        |      `string`       |    -     |                   -                   |       -       | Accepts button css id                                            |
| `tabIndex`        |      `number`       |    -     |                   -                   |       -       | Text input tab index                                             |
| `buttonClick`     |       `func`        |    -     |                   -                   |       -       | What the button will trigger when clicked                        |
| `onChange`        |       `func`        |    -     |                   -                   |       -       | Called with the new value. Required when input is not read only. |
| `withButton`      |       `bool`        |    -     |                   -                   |       -       | Enable button                                                    |
| `squareButton`    |       `bool`        |    -     |                   -                   |       -       | Enable square button                                             |
| `isError`         |       `bool`        |    -     |                   -                   |       -       | Indicates the input field has an error                           |
| `isSuccess`       |       `bool`        |    -     |                   -                   |       -       | Indicates the input field has an success                         |
| `isAutoFocussed`  |       `bool`        |    -     |                   -                   |       -       | Focus the input field on initial render                          |
| `isDisabled`      |       `bool`        |    -     |                   -                   |       -       | Indicates that the field cannot be used                          |
| `name`            |      `string`       |    -     |                   -                   |       -       | Used as HTML name property                                       |
| `typeButton`      |      `string`       |    -     | "primary", "secondary", "transparent" |   "primary"   | Type of the button                                               |
| `type`            |      `string`       |    -     |      "email", "password", "text"      |    "text"     | Supported type of the input fields                               |
| `labelButton`     |      `string`       |    -     |                   -                   |       -       | Name text in button                                              |
| `placeholder`     |      `string`       |    -     |                   -                   |       -       | label text in input                                              |
| `value`           |      `string`       |    -     |                   -                   |       -       | Value of the input                                               |
| `fontWeight`      | `string` , `number` |    -     |                   -                   |       -       | font-weight text input                                           |
| `fontSize`        |      `string`       |    -     |                   -                   |       -       | font-size text input                                             |
| `colorHover`      |      `string`       |    -     |                   -                   |       -       | color hover text input                                           |
| `color`           |      `string`       |    -     |                   -                   |       -       | color text input                                                 |
| `height`          |      `string`       |    -     |                   -                   |       -       | height text input                                                |
| `width`           |      `string`       |    -     |                   -                   |       -       | width text input                                                 |
| `padding`         |      `string`       |    -     |                   -                   |       -       | padding text input                                               |
| `isSubmit`        |       `bool`        |    -     |                   -                   |       -       | Set to true if the button should submit the form                 |
| `backgroundColor` |      `string`       |    -     |                   -                   | `transparent` | Custom background color                                          |
