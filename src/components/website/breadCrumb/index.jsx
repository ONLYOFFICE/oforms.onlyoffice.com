import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

import {
    BreadCrumbHomeLink,
    BreadCrumbIconWrapper,
    BreadCrumbItemWrapper,
    BreadCrumbLink,
    BreadCrumbStyled,
} from './breadCrumb.styled';
import { ChevronRight } from '@icons';

export const BreadCrumb = ({ address }) => {
    const { t } = useTranslation('common');

    return (
        <BreadCrumbStyled>
            <Link href='/' passHref>
                <BreadCrumbHomeLink>
                    {t('Forms')}
                </BreadCrumbHomeLink>
            </Link>
            {
                address.map(({ name, href }, idx) => (
                    <BreadCrumbItem
                        key={idx}
                        name={name}
                        href={href}
                        isLast={idx + 1 === address.length}
                    />
                ))
            }
        </BreadCrumbStyled>
    );
};

const BreadCrumbItem = ({ isLast, name, href }) => {
    if (isLast) {
    }

    return (
        <BreadCrumbItemWrapper>
            <BreadCrumbIconWrapper>
                <ChevronRight size={13} />
            </BreadCrumbIconWrapper>
            {
                isLast ?
                    <BreadCrumbLink as='div'>{name}</BreadCrumbLink> :
                    <Link
                        href={href}
                        passHref
                    >
                        <BreadCrumbLink>{name}</BreadCrumbLink>
                    </Link>
            }
        </BreadCrumbItemWrapper>
    );
};
