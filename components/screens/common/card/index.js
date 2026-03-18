import StyledCard from "./styled-card";
import InternalLink from "@components/common/internal-link";
import Text from "@components/common/text";

const Card = ({ data }) => {
  return (
    <StyledCard className="card">
      <InternalLink className="card-preview" href={`/${data?.url}`} tabIndex={-1}>
        <div className="card-img">
          <img src={data.card_prewiew?.url} alt={data.name_form} />
        </div>
        <div className="card-template-format">
          {data.form_exts?.some(ext => ext.ext === "pdf") &&
            <span className="card-template-format-item pdf"></span>
          }
          {data.form_exts?.some(ext => ext.ext === "docx") &&
            <span className="card-template-format-item docx"></span>
          }
          {data.form_exts?.some(ext => ext.ext === "xlsx") &&
            <span className="card-template-format-item xlsx"></span>
          }
          {data.form_exts?.some(ext => ext.ext === "pptx") &&
            <span className="card-template-format-item pptx"></span>
          }
        </div>
      </InternalLink>
      <div className="card-body">
        <InternalLink className="card-title" href={`/${data?.url}`} label={data.name_form} />
        <Text className="card-text" label={data.description_card} />
      </div>
    </StyledCard>
  );
};

export default Card;