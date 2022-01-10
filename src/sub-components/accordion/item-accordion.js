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
                <Link className="link-trans-acc" href="https://www.onlyoffice.com/registration.aspx">{{ ONLYOFFICEDocs }}</Link>
                <Link className="link-trans-acc" href="https://www.onlyoffice.com/download-desktop.aspx#desktop">{{ ONLYOFFICEDesktopEditors }}</Link>
            </Trans>
        </Text>
    );
};

export default TransAccorionItem;