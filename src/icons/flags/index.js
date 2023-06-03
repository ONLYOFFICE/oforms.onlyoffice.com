import { DE } from "./de";
import { ES } from './es'
import { FR } from './fr'
import { IT } from './it'
import { JA } from './ja'
import { UK } from './uk'
import { US } from './us'
import { ZH } from './zh'

export const Flag = (props) => {
    const { locale, ...otherProps } = props
    const data = {
        'en': <US {...otherProps} />,
        'zh': <ZH {...otherProps} />,
        'it': <IT {...otherProps} />,
        'fr': <FR {...otherProps} />,
        'es': <ES {...otherProps} />,
        'de': <DE {...otherProps} />,
        'ja': <JA {...otherProps} />
    }

    return data[locale]
}

export { DE } from "./de";
export { ES } from './es'
export { FR } from './fr'
export { IT } from './it'
export { JA } from './ja'
export { UK } from './uk'
export { US } from './us'
export { ZH } from './zh'