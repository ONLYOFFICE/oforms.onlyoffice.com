import React from 'react';

import { FormGridItem } from '@components/website/formGridItem';

import { FormGridStyled } from './formGrid.styled';
import { useFormGrid } from './useFormGrid';

export const FormGrid = ({ forms }) => {
    const { isWithoutActive } = useFormGrid();
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
