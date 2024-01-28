import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { usePageContext } from 'src/hooks';

export const useMobileCategorySelectorDropdown = (props) => {
    const {
        handleSelectorSubListConditions,
        selectorActiveSubListIndex,
    } = props;

    const { t } = useTranslation('common');

    const { isDesktopClient } = usePageContext();

    const firstListFocusTrapRef = useRef(null);
    const lastListFocusTrapRef = useRef(null);
    const firstSubListFocusTrapRef = useRef(null);
    const lastSubListFocusTrapRef = useRef(null);


    const onBack = (event) => {
        event.stopPropagation();
        handleSelectorSubListConditions();
    };

    useEffect(() => {
        // only for website
        if (!isDesktopClient && selectorActiveSubListIndex !== undefined) {
            // on the main list
            if (selectorActiveSubListIndex === null) {
                firstListFocusTrapRef?.current?.focus();
            }
            // on the sub list
            else {
                firstSubListFocusTrapRef?.current?.focus();
            }
        }
    }, [selectorActiveSubListIndex, isDesktopClient]);

    // only for website
    const onKeyDown = (key) => (event) => {
        const next = event.code === 'Tab' && !event.shiftKey;
        const prev = event.code === 'Tab' && event.shiftKey;

        // Exit the function if neither forward nor backward tabbing is detected.
        if(!next && !prev) return;

        switch (key) {
            case 'first-list-trap': {
                // If the user is moving backward (Shift + Tab) from the first focusable element,
                // focus is moved to the last element of the list, creating a loop for accessibility.
                prev && lastListFocusTrapRef.current.focus();
                break;
            }
            case 'last-list-trap': {
                // If the user is moving forward (Tab) from the last focusable element of the list,
                // focus is moved to the first element, ensuring the focus stays within the list bounds.
                next && firstListFocusTrapRef.current.focus();
                break;
            }
            case 'first-sub-list-trap': {
                // Similar to the first list trap, but for a sublist. If moving backward from the first
                // element of a sublist, focus jumps to the last element of that sublist to maintain focus within.
                prev && lastSubListFocusTrapRef.current.focus();
                break;
            }
            case 'last-sub-list-trap': {
                // For moving forward from the last element of a sublist, focus is redirected to the first
                // element of the sublist, ensuring the keyboard navigation does not leave the sublist boundaries.
                next && firstSubListFocusTrapRef.current.focus();
                break;
            }
        }
    };


    return {
        t,
        onBack,
        onKeyDown,
        firstListFocusTrapRef,
        lastListFocusTrapRef,
        firstSubListFocusTrapRef,
        lastSubListFocusTrapRef,
    };
};
