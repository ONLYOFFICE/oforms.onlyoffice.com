# Form

Customize Form Component.

### Usage

```js
import Form from "../components/form";
```

```jsx
<Form
  formData={[
    {
      type: "heading",
      headingText: "Heading",
      isHeader: true,
    },
    {
      type: "input",
      inputType: "password",
      placeholder: "Some password",
      callback: (e, isValid) => console.log(),
      value: "",
    },
    {
      type: "input",
      inputType: "email",
      placeholder: "Some email",
      callback: (e, isValid) => console.log(),
      value: "",
      withButton: true,
      typeButton: "primary",
      isSubmit: true,
      labelButton: "Label Button",
      buttonClick: (e) => console.log(),
    },
    {
      type: "input",
      inputType: "text",
      placeholder: "Some text",
      callback: (e) => console.log(),
      value: "",
    },
    {
      type: "checkbox",
      callback: (e) => console.log(),
      isChecked: true,
      label: "Label",
    },
    {
      type: "button",
      callback: (e) => console.log(),
      typeButton: "secondary",
      isSubmit: false,
      toHideButton: false,
      label: "Some Button",
    },

    { type: "other", element: <ELink key="external-link" /> },
    {
      type: "separator",
      separatorText: "Separator Text",
    },
    {
      type: "other",
      element: <SocialButtons key="social-buttons" />,
    },
  ]}
/>
```

### Properties

| Props        |      Type      | Required | Values | Default | Description                           |
| ------------ | :------------: | :------: | :----: | :-----: | ------------------------------------- |
| `className`  |    `string`    |    -     |   -    |    -    | Accepts class                         |
| `id`         |    `string`    |    -     |   -    |    -    | Accepts id                            |
| `style`      | `obj`, `array` |    -     |   -    |    -    | Accepts css style                     |
| `isPanel`    |     `bool`     |    -     |   -    | 'true'  | To set view                           |
| `formData`   |    `array`     |    -     |   -    |    -    | Child components                      |
| `submitForm` |     `func`     |    -     |   -    |    -    | Called when the onSubmit event occurs |
