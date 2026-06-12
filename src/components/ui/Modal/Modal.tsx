/*
 * (c) Copyright Ascensio System SIA 2009-2026
 *
 * This program is a free software product.
 * You can redistribute it and/or modify it under the terms
 * of the GNU Affero General Public License (AGPL) version 3 as published by the Free Software
 * Foundation. In accordance with Section 7(a) of the GNU AGPL its Section 15 shall be amended
 * to the effect that Ascensio System SIA expressly excludes the warranty of non-infringement of
 * any third-party rights.
 *
 * This program is distributed WITHOUT ANY WARRANTY, without even the implied warranty
 * of MERCHANTABILITY or FITNESS FOR A PARTICULAR  PURPOSE. For details, see
 * the GNU AGPL at: http://www.gnu.org/licenses/agpl-3.0.html
 *
 * You can contact Ascensio System SIA at Lubanas st. 125a-25, Riga, Latvia, EU, LV-1021.
 *
 * The  interactive user interfaces in modified source and object code versions of the Program must
 * display Appropriate Legal Notices, as required under Section 5 of the GNU AGPL version 3.
 *
 * Pursuant to Section 7(b) of the License you must retain the original Product logo when
 * distributing the program. Pursuant to Section 7(e) we decline to grant you any rights under
 * trademark law for use of our trademarks.
 *
 * All the Product's GUI elements, including illustrations and icon sets, as well as technical writing
 * content are licensed under the terms of the Creative Commons Attribution-ShareAlike 4.0
 * International. See the License terms at http://creativecommons.org/licenses/by-sa/4.0/legalcode
 */

import { useEffect, useRef, useCallback } from "react";
import { Transition } from "react-transition-group";
import clsx from "clsx";
import { getAssetUrl } from "@src/utils/getAssetUrl";
import { IModal } from "./Modal.types";
import styles from "./Modal.module.scss";

let openModalCount = 0;
let cleanupTimeout: ReturnType<typeof setTimeout> | null = null;
const openModals: HTMLDivElement[] = [];

const duration = 200;
const defaultStyle = {
  transition: "opacity 200ms",
  opacity: 0,
};
const transitionStyles: { [key: string]: React.CSSProperties } = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
};

const modalManager = {
  addModal(lockScroll: boolean) {
    if (cleanupTimeout) {
      clearTimeout(cleanupTimeout);
      cleanupTimeout = null;
    }

    openModalCount += 1;
    if (lockScroll && openModalCount === 1) {
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
  },

  removeModal(lockScroll: boolean) {
    openModalCount = Math.max(openModalCount - 1, 0);
    if (lockScroll && openModalCount === 0) {
      cleanupTimeout = setTimeout(() => {
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";
        cleanupTimeout = null;
      }, 200);
    }
  },
};

const Modal = ({
  id,
  className,
  children,
  maxWidth,
  bgColor,
  withCloseBtn,
  isOpen,
  onClose,
  lockScroll = true,
}: IModal) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const wasOpen = useRef(false);

  const stopAllVideos = () => {
    if (!modalRef.current) return;

    modalRef.current
      .querySelectorAll<HTMLVideoElement>("video")
      .forEach((video) => {
        video.pause();
        video.currentTime = 0;
      });

    modalRef.current
      .querySelectorAll<HTMLIFrameElement>("iframe")
      .forEach((iframe) => {
        const src = iframe.src;
        iframe.src = "";
        iframe.src = src;
      });
  };

  const onCloseModal = useCallback(() => {
    onClose();
    stopAllVideos();
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;

    if (modalRef.current && !openModals.includes(modalRef.current)) {
      openModals.push(modalRef.current);
    }

    const currentModal = modalRef.current;

    const focusableSelectors = [
      "a[href]",
      "area[href]",
      "input:not([disabled])",
      "select:not([disabled])",
      "textarea:not([disabled])",
      "button:not([disabled])",
      "iframe",
      "object",
      "embed",
      "[contenteditable]",
      '[tabindex]:not([tabindex="-1"])',
    ];

    const handleKeyDown = (e: KeyboardEvent) => {
      if (openModals[openModals.length - 1] !== currentModal) return;

      if (e.key === "Escape") {
        onCloseModal();
      } else if (e.key === "Tab" && currentModal) {
        const focusableElements = Array.from(
          currentModal.querySelectorAll<HTMLElement>(
            focusableSelectors.join(","),
          ),
        ).filter((el) => el.offsetParent !== null);

        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        const activeElement = document.activeElement as HTMLElement;

        if (e.shiftKey) {
          if (
            activeElement === firstElement ||
            !currentModal.contains(activeElement)
          ) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (
            activeElement === lastElement ||
            !currentModal.contains(activeElement)
          ) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);

      if (currentModal) {
        const index = openModals.indexOf(currentModal);
        if (index > -1) {
          openModals.splice(index, 1);
        }
      }
    };
  }, [isOpen, onCloseModal]);

  useEffect(() => {
    if (isOpen && !wasOpen.current) {
      modalManager.addModal(lockScroll);
      wasOpen.current = true;
    } else if (!isOpen && wasOpen.current) {
      modalManager.removeModal(lockScroll);
      wasOpen.current = false;
    }

    return () => {
      if (wasOpen.current) {
        modalManager.removeModal(lockScroll);
        wasOpen.current = false;
      }
    };
  }, [isOpen, lockScroll]);

  return (
    <Transition in={isOpen} timeout={duration} unmountOnExit nodeRef={modalRef}>
      {(state) => (
        <div
          onClick={onCloseModal}
          id={id}
          className={clsx(styles.modal, className)}
          style={
            {
              ...defaultStyle,
              ...transitionStyles[state],
              "--modal-background-color": bgColor,
            } as React.CSSProperties
          }
        >
          <div className={styles["modal-container"]}>
            <div
              ref={modalRef}
              onClick={(e) => e.stopPropagation()}
              className={clsx(styles["modal-wrapper"], "modal-wrapper")}
              style={
                {
                  "--modal-max-width": maxWidth,
                } as React.CSSProperties
              }
            >
              {withCloseBtn && (
                <button
                  className={styles["modal-close-btn"]}
                  onClick={onCloseModal}
                  type="button"
                  style={
                    {
                      "--modal-close-button-image": `url(${getAssetUrl("/images/cross-x2.svg")})`,
                    } as React.CSSProperties
                  }
                />
              )}
              {children}
            </div>
          </div>
        </div>
      )}
    </Transition>
  );
};

export { Modal };
