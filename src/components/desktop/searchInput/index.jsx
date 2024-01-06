import React from 'react';
import cn from 'classnames';

import { useSearchInput } from './useSearchInput';
import {
    SearchInputForm,
    SearchInputLoupWrapper,
    SearchInputStyled,
    SearchInputWrapper,
    SearchInputXCloseWrapper,
} from './searchInput.styled';
import { Loup, XClose } from '@icons';

export const SearchInput = () => {
    const {
        t,
        isSearchInputExpanded,
        isSearchInputMounted,
        isClearButtonVisible,
        isWithoutAnimation,
        inputValue,
        inputRef,
        onToggle,
        onChange,
        onClear,
        onSubmit,
    } = useSearchInput();

    return (
        <SearchInputForm onSubmit={onSubmit}>
            <SearchInputLoupWrapper type='button' onClick={onToggle}>
                <Loup size={24} />
            </SearchInputLoupWrapper>

            {
                <SearchInputWrapper
                    className={cn({
                        'inputExpanded': isSearchInputExpanded,
                        'withoutAnimation': isWithoutAnimation,
                        'inputMounted': isSearchInputMounted,
                    })}
                >
                    <SearchInputStyled
                        placeholder={t('Search')}
                        ref={inputRef}
                        value={inputValue}
                        onChange={onChange}
                    />
                    {
                        isClearButtonVisible &&
                        <SearchInputXCloseWrapper type='button' onClick={onClear}>
                            <XClose size={24} />
                        </SearchInputXCloseWrapper>
                    }
                </SearchInputWrapper>
            }
        </SearchInputForm>
    );
};
