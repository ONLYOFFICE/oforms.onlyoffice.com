import React from "react";
import {StyledEmpty} from "@components/common/empty/styledEmpty";
import {Empty as EmptyIllustration} from '../../../illustrations'
import {useRouter} from "next/router";
import Text from "@components/common/text";

export const Empty = (props) => {
    const router = useRouter()
    const theme = router.query.theme;
    const {children, onClear} = props;

    if (children) return children;

    return (
        <StyledEmpty className="empty">
            <EmptyIllustration
                isDark={(theme === 'theme-dark') || (theme === 'theme-contrast-dark')}
                className="empty__img"
            />
            <Text as="h3" className="empty__title">Nothing found</Text>
            <Text as="p" className="empty__desc">No results matching your query could be found </Text>
            <Text as="span" className="empty__clear" onClick={onClear}>Clear filter</Text>
        </StyledEmpty>
    )
}