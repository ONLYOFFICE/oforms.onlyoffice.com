import cn from 'classnames';

import { useSearchArea } from './useSearchArea';
import {
    SearchAreaWrapper,
    SearchAreaDesc,
    SearchAreaLine,
    SearchAreaForm,
    SearchAreaInput,
    SearchAreaInputLabel,
    SearchAreaSearchIconWrapper,
} from './searchArea.styled';
import { Loup } from '@icons';

export const SearchArea = () => {
    const {
        t,
        isFocused,
        isWithoutAnimation,
        inputValue,
        onBlur,
        onFocus,
        onSubmit,
        onChange,
    } = useSearchArea();

    return (
        <SearchAreaWrapper>
            <SearchAreaDesc>{t('FormSearch')}</SearchAreaDesc>
            <SearchAreaLine/>
            <SearchAreaForm onSubmit={onSubmit}>
                <SearchAreaInput
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onChange={onChange}
                    value={inputValue}
                    name='search'
                />
                <SearchAreaInputLabel
                    $isWithoutAnimation={isWithoutAnimation}
                    className={cn({
                        'focus': isFocused !== 'initial' && isFocused,
                        'initial': isFocused === 'initial',
                    })}
                >
                    {t('SearchInputPlaceholder')}
                </SearchAreaInputLabel>
                <SearchAreaSearchIconWrapper type="submit">
                    <Loup size={24} />
                </SearchAreaSearchIconWrapper>
            </SearchAreaForm>
        </SearchAreaWrapper>
    );
};
