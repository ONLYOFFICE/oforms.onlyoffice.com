# Popup

Show popup.

### Usage

```js
import Popup from "../components/popup";
```

```jsx
const [modalActive, setModalActive] = useState(false)

<Button
        label="show popup"
        onClick={() => setModalActive(true)}
>
</Button>
<Popup
    {...args}
    active={modalActive}
    setActive={setModalActive}
>
    {children}
</Popup>
```

### Properties

| Props       |   Type   | Required | Values | Default | Description                        |
| ----------- | :------: | :------: | :----: | :-----: | ---------------------------------- |
| `onClick`   |  `func`  |    -     |   -    |    -    | What the will trigger when clicked |
| `style`     |  `obj`   |    -     |   -    |    -    | Accepts CSS style                  |
| `tabIndex`  | `number` |    -     |   -    |    -    | tab index                          |
| `className` | `string` |    -     |   -    |    -    | Accepts class                      |
| `id`        | `string` |    -     |   -    |    -    | Accepts id                         |
