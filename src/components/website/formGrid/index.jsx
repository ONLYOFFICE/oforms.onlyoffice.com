import React from 'react';

import { FormGridItem } from '@components/website/formGridItem';

import {
    FormGridEmpty,
    FormGridEmptyDesc,
    FormGridEmptyImg,
    FormGridStyled,
} from './formGrid.styled';
import { useFormGrid } from './useFormGrid';

export const FormGrid = ({ forms }) => {
    const { t, isWithoutActive } = useFormGrid();

    if (forms.length === 0) {
        return (
            <FormGridEmpty>
                <FormGridEmptyImg
                    src='https://static-oforms.onlyoffice.com/icons/bg-errors.react.svg'
                    alt='No more results'
                />
                <FormGridEmptyDesc>{t('No more results...')}</FormGridEmptyDesc>
            </FormGridEmpty>
        );
    }

    return (
        <FormGridStyled>
            {
                forms.map(form => (
                    <FormGridItem
                        key={form.id}
                        isWithoutActive={isWithoutActive}
                        attributes={form.attributes}
                    />
                ))
            }
        </FormGridStyled>
    );
};
