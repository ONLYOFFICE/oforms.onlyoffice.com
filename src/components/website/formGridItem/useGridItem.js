import { useState } from 'react';
import { useTranslation } from 'next-i18next';

export const useGridItem = ({ attributes, isWithoutActive }) => {
    const { t } = useTranslation('common');


    const [isActive, setIsActive] = useState(false);
    const [timeoutId, setTimeoutId] = useState(null);

    const formImgPreview = attributes.card_prewiew?.data?.attributes?.url;
    const formTitle = attributes.name_form;
    const formLink = attributes.url;
    const formDescription = attributes.description_card;

    const formFiles = attributes.file_oform?.data?.filter((it) => {
        let checkFormatFile = it?.attributes.name.split('.')[1] === 'oform';
        return checkFormatFile ? it?.attributes?.url : null;
    });

    const formDownloadLink = formFiles[0]?.attributes?.url;

    const formName = `${formFiles[0]?.attributes?.hash}.oform`;
    const formFillOutLink = `/editor/?filename=${formLink}&fillform=${formName}`;


    const onFocus = () => {
        if (isWithoutActive) return;

        setIsActive(true);
        clearTimeout(timeoutId);
        setTimeoutId(null);
    };
    const onBlur = () => {
        if (isWithoutActive) return;

        const id = setTimeout(() => {
            setIsActive(false);
        }, 0);

        setTimeoutId(id);
    };

    const onMouseLeave = () => {
        if (isWithoutActive) return;

        setIsActive(false);
    };

    const onMouseEnter = () => {
        if (isWithoutActive) return;

        setIsActive(true);
    };

    return {
        t,
        isActive,
        formImgPreview,
        formTitle,
        formDescription,
        formLink,
        formDownloadLink,
        formFillOutLink,
        onFocus,
        onBlur,
        onMouseEnter,
        onMouseLeave,
    };
};
