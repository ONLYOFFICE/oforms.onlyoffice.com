import StyledShareButtons from "./styled-share-buttons";
import { useRouter } from "next/router";
import { TwitterShareButton, EmailShareButton, LinkedinShareButton, WeiboShareButton } from "react-share";
import Text from "@components/common/text";
import ExternalLink from "@components/common/external-link";

const ShareButtons = ({ t, locale }) => {
  const router = useRouter();
  const routerUrl = `https://templates.onlyoffice.com${locale === "en" ? "" : `/${locale}`}${router.asPath}`;

  return (
    <StyledShareButtons $locale={locale} className="share-buttons">
      <Text className="share-buttons-title" label={`${t("Share")}:`} />

      <ul className="share-buttons-list">
        <li><TwitterShareButton className="share-button x" url={routerUrl} /></li>
        <li><EmailShareButton className="share-button email" url={routerUrl} /></li>
        <li><LinkedinShareButton className="share-button linkedin" url={routerUrl} /></li>
        {locale === "zh" && (
          <>
            <li><ExternalLink className="share-button wechat" href={`https://www.shareaholic.com/share/wechat/?link=${routerUrl}`} /></li>
            <li><WeiboShareButton className="share-button weibo" url={routerUrl} /></li>
          </>
        )}
      </ul>
    </StyledShareButtons>
  );
};

export default ShareButtons;