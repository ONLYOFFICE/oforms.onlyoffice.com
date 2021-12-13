import React from "react";
import { Trans } from "gatsby-plugin-react-i18next";
import Link from "../../../components/link";
import Text from "../../../components/text";

const TransAccorionItem = ({ t }) => {

    const ONLYOFFICEDocs = t("ONLYOFFICEDocs");
    const ONLYOFFICEDesktopEditors = t("ONLYOFFICEDesktopEditors");

    return (
        <Text as={"p"} className="text-trans-accordion">
            <Trans
                i18nKey="AccordionDescriptionAdditionalSoftware"
                ONLYOFFICEDocs={t("ONLYOFFICEDocs")}
                ONLYOFFICEDesktopEditors={t("ONLYOFFICEDesktopEditors")}
            >
                You can use
                <Link href="/" className="link-trans-acc">{{ ONLYOFFICEDocs }}</Link>
                <Link href="/" className="link-trans-acc">{{ ONLYOFFICEDesktopEditors }}</Link>
            </Trans>
        </Text>
    );
};

export default TransAccorionItem;