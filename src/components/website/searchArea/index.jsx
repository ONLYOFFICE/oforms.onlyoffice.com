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
import { Loup, XClose } from '@icons';

export const SearchArea = () => {
    const {
        t,
        isFocused,
        isWithoutAnimation,
        inputValue,
        isClearIconVisible,
        onBlur,
        onFocus,
        onSubmit,
        onChange,
        onClear,
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
                {
                    !isClearIconVisible &&
                    <SearchAreaSearchIconWrapper type="submit">
                        <Loup size={24} />
                    </SearchAreaSearchIconWrapper>
                }
                {
                    isClearIconVisible &&
                    <SearchAreaSearchIconWrapper type="button" onClick={onClear}>
                        <XClose size={24} />
                    </SearchAreaSearchIconWrapper>
                }
            </SearchAreaForm>
        </SearchAreaWrapper>
    );
};
