/*
 * Copyright (C) Ascensio System SIA, 2009-2026
 *
 * This program is a free software product. You can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License (AGPL)
 * version 3 as published by the Free Software Foundation, together with the
 * additional terms provided in the LICENSE file.
 *
 * This program is distributed WITHOUT ANY WARRANTY; without even the implied
 * warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. For
 * details, see the GNU AGPL at: https://www.gnu.org/licenses/agpl-3.0.html
 *
 * You can contact Ascensio System SIA by email at info@onlyoffice.com
 * or by postal mail at 20A-6 Ernesta Birznieka-Upisha Street, Riga,
 * LV-1050, Latvia, European Union.
 *
 * The interactive user interfaces in modified versions of the Program
 * are required to display Appropriate Legal Notices in accordance with
 * Section 5 of the GNU AGPL version 3.
 *
 * No trademark rights are granted under this License.
 *
 * All non-code elements of the Product, including illustrations,
 * icon sets, and technical writing content, are licensed under the
 * Creative Commons Attribution-ShareAlike 4.0 International License:
 * https://creativecommons.org/licenses/by-sa/4.0/legalcode
 *
 * This license applies only to such non-code elements and does not
 * modify or replace the licensing terms applicable to the Program's
 * source code, which remains licensed under the GNU Affero General
 * Public License v3.
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { Modal } from "@src/components/ui/Modal";
import { Heading } from "@src/components/ui/Heading";
import { Text } from "@src/components/ui/Text";
import { Button } from "@src/components/ui/Button";
import { getAssetUrl } from "@src/utils/getAssetUrl";
import { IDownloadModal } from "./DownloadModal.types";
import styles from "./DownloadModal.module.scss";

const DownloadModal = ({ isOpen, onClose }: IDownloadModal) => {
  const { t } = useTranslation("form");
  const router = useRouter();
  const locale = router.locale;

  return (
    <Modal isOpen={isOpen} onClose={onClose} withCloseBtn={true}>
      <div className={styles["download-modal"]}>
        <Heading
          className={styles["download-modal-heading"]}
          as="div"
          level={3}
          color="var(--form-hero-download-modal-heading-color)"
          style={
            {
              "--download-modal-heading-icon": `url(${getAssetUrl("/images/templates/form/hero/not-installed.svg")})`,
            } as React.CSSProperties
          }
        >
          {t("OODesktopEditorsNotInstalled")}
        </Heading>
        <Text
          className={styles["download-modal-text"]}
          as="p"
          size={3}
          color="var(--form-hero-download-modal-text-color)"
        >
          {t("PleaseDownloadItAndInstall")}
        </Text>
        <Button
          as="a"
          variant="secondary-dark"
          href={`${process.env.NEXT_PUBLIC_MAIN_SITE_BASE_DOMAIN}${locale === "en" || locale === "ar" ? "" : `/${locale}`}/download-desktop`}
        >
          {t("GetItNow")}
        </Button>
      </div>
    </Modal>
  );
};

export { DownloadModal };
