import React from "react";
import {StyledEmpty} from "./styledEmpty";
import {Empty as EmptyIllustration} from '@illustrations'
import {useRouter} from "next/router";
import Text from "@common/text";
import {useTranslation} from "next-i18next";
import PropTypes from "prop-types";

const Empty = (props) => {
    const router = useRouter()
    const theme = router.query.theme;
    const {children, onClear} = props;
    const { t } = useTranslation('common')

    if (children) return children;

    return (
        <StyledEmpty className="empty">
            <EmptyIllustration
                isDark={(theme === 'theme-dark') || (theme === 'theme-contrast-dark')}
                className="empty__img"
            />
            <Text as="h3" className="empty__title">{t('Nothing-found')}</Text>
            <Text as="p" className="empty__desc">{t('No-results-matching-your-query-could-be-found')}</Text>
            <Text as="span" className="empty__clear" onClick={onClear}>{t("Clear-filter")}</Text>
        </StyledEmpty>
    )
}

Empty.propTypes = {
    onClear: PropTypes.func,
    children: PropTypes.element,
}

export default Empty;
