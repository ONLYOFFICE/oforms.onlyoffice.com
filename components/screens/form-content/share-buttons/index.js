import StyledShareButtons from "./styled-share-buttons";
import { TwitterShareButton, EmailShareButton, LinkedinShareButton } from "react-share";
import Text from "@components/common/text";

const ShareButtons = ({ t }) => {
  const baseUrl = typeof window !== "undefined" ? window.location.href : null;

  return (
    <StyledShareButtons className="share-buttons">
      <Text className="share-buttons-title" label={`${t("Share")}:`} />

      <ul className="share-buttons-list">
        <li><TwitterShareButton className="share-button twitter" title="Twitter" url={baseUrl} /></li>
        <li><EmailShareButton className="share-button email" title="Email" url={baseUrl} /></li>
        <li><LinkedinShareButton className="share-button linkedin" title="LinkedIn" url={baseUrl} /></li>
      </ul>
    </StyledShareButtons>
  );
};

export default ShareButtons;