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

import { useEffect, useState } from "react";

export const useFetchedState = <T>(
  url: string | null,
  initialValue: T,
  label: string,
): { value: T; isLoading: boolean } => {
  const [fetched, setFetched] = useState<{ value: T } | null>(null);
  const [settledUrl, setSettledUrl] = useState<string | null>(null);

  useEffect(() => {
    if (url === null) {
      setFetched(null);
      setSettledUrl(null);
      return;
    }

    const controller = new AbortController();

    fetch(url, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`Request failed: ${response.status}`);
        return response.json();
      })
      .then((next: T) => {
        if (controller.signal.aborted) return;
        setFetched({ value: next });
        setSettledUrl(url);
      })
      .catch((error) => {
        if (controller.signal.aborted) return;
        console.error(label, error);
        setSettledUrl(url);
      });

    return () => controller.abort();
  }, [url, label]);

  return {
    value: url !== null && fetched ? fetched.value : initialValue,
    isLoading: url !== null && settledUrl !== url,
  };
};
