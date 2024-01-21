import React from 'react';
import cn from 'classnames';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

import { useGridItem } from './useGridItem';
import {
    FormGridItemBox,
    FormGridItemContent,
    FormGridItemImg,
    FormGridItemStyled,
    FormGridItemTitle,
    FormGridItemDesc,
    FormGridItemImgLink,
    FormGridItemLinksWrapper,
    FormGridItemFillOutLink,
    FormGridItemDownloadLink,
    FormGridItemTitleLink,
} from './formGridItem.styled';

export const FormGridItem = (props) => {
    const {
        t,
        isActive,
        formImgPreview,
        formTitle,
        formLink,
        formDescription,
        formFillOutLink,
        formDownloadLink,
        onFocus,
        onBlur,
        onMouseEnter,
        onMouseLeave
    } = useGridItem(props);

    return (
        <FormGridItemStyled
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <FormGridItemContent
                className={cn({ 'active': isActive })}
            >
                <Link href={'/' + formLink} passHref>
                    <FormGridItemImgLink
                        $isActive={isActive}
                        tabIndex={-1}
                    >
                        <FormGridItemImg src={formImgPreview} alt={formTitle} />
                    </FormGridItemImgLink>
                </Link>
                <FormGridItemBox>
                    <FormGridItemTitle>
                        <Link
                            href={'/' + formLink}
                            passHref
                        >
                            <FormGridItemTitleLink
                                onFocus={onFocus}
                                onBlur={onBlur}
                            >
                                {formTitle}
                            </FormGridItemTitleLink>
                        </Link>
                    </FormGridItemTitle>
                    <FormGridItemDesc>
                        {formDescription}
                    </FormGridItemDesc>
                    <FormGridItemLinksWrapper className={cn({ 'active': isActive })}>
                        <FormGridItemFillOutLink
                            href={formFillOutLink}
                            target='_blank'
                            onFocus={onFocus}
                            onBlur={onBlur}
                        >
                            {t('FillOut')}
                        </FormGridItemFillOutLink>
                        <FormGridItemDownloadLink
                            href={formDownloadLink}
                            onFocus={onFocus}
                            onBlur={onBlur}
                        >
                            {t('Download')}
                        </FormGridItemDownloadLink>
                    </FormGridItemLinksWrapper>
                </FormGridItemBox>
            </FormGridItemContent>
        </FormGridItemStyled>
    );
};
