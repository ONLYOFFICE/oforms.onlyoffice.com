import StyledCard from "./styled-card";
import InternalLink from "@components/common/internal-link";
import Text from "@components/common/text";

const Card = ({ data }) => {
  return (
    <StyledCard className="card">
      <InternalLink className="card-preview" href={`/${data.attributes?.url}`} tabIndex={-1}>
        <div className="card-img">
          <img src={data.attributes.card_prewiew?.data?.attributes.url} alt={data.attributes.name_form} />
        </div>
        <div className="card-template-format">
          {data.attributes.form_exts?.data.some(ext => ext.attributes.ext === "pdf") &&
            <span className="card-template-format-item pdf"></span>
          }
          {data.attributes.form_exts?.data.some(ext => ext.attributes.ext === "docx") &&
            <span className="card-template-format-item doc"></span>
          }
          {data.attributes.form_exts?.data.some(ext => ext.attributes.ext === "xlsx") &&
            <span className="card-template-format-item tab"></span>
          }
          {data.attributes.form_exts?.data.some(ext => ext.attributes.ext === "pptx") &&
            <span className="card-template-format-item pres"></span>
          }
        </div>
      </InternalLink>
      <div className="card-body">
        <InternalLink className="card-title" href={`/${data.attributes?.url}`} label={data.attributes.name_form} />
        <Text className="card-text" label={data.attributes.description_card} />
      </div>
    </StyledCard>
  );
};

export default Card;