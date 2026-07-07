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

import { useTranslation } from "next-i18next";
import { Modal } from "@src/components/ui/Modal";
import { Heading } from "@src/components/ui/Heading";
import { Text } from "@src/components/ui/Text";
import { Button } from "@src/components/ui/Button";
import { getAssetUrl } from "@src/utils/getAssetUrl";
import { IFileUploadModal } from "./FileUploadModal.types";
import styles from "./FileUploadModal.module.scss";

const FileUploadModal = ({
  isOpen,
  onClose,
  fileName,
  fileType,
}: IFileUploadModal) => {
  const { t } = useTranslation("form-submit");

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      bgColor="#00000066"
      withCloseBtn={true}
    >
      <div className={styles["file-upload-modal"]}>
        <Heading
          as="div"
          className={styles["file-upload-modal-heading"]}
          level={4}
          color="#21222b"
        >
          {t("FileUpload")}
        </Heading>

        <div className={styles["file-upload-modal-file-wrapper"]}>
          <Text
            className={styles["file-upload-modal-file"]}
            size={4}
            style={
              {
                "--file-upload-modal-file-icon": `url(${getAssetUrl(`/images/templates/form-submit/${fileType}.svg`)})`,
              } as React.CSSProperties
            }
          >
            {fileName}
            <Text as="b" size={4}>
              {`.${fileType}`}
            </Text>
          </Text>
        </div>

        <div className={styles["file-upload-modal-content"]}>
          <Text size={3}>{t("AfterTheseStepsAreCompleted")}</Text>

          <div>
            <Text
              className={styles["file-upload-modal-label"]}
              size={3}
              fontWeight={700}
            >
              2. {t("Conversion")}
            </Text>
            <Text size={3}>{t("TheFileIsConvertedToPDFAndOFORM")}</Text>
          </div>

          <div>
            <Text
              className={styles["file-upload-modal-label"]}
              size={3}
              fontWeight={700}
            >
              3. {t("LoadingEditorScripts")}
            </Text>
            <Text size={3}>{t("TheyAreLoadedOnlyOnce")}</Text>
          </div>
        </div>

        <Button onClick={onClose} fullWidth>
          {t("OK")}
        </Button>
      </div>
    </Modal>
  );
};

export { FileUploadModal };
