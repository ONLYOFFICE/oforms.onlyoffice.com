import StyledCard from "./styled-card";
import Heading from "@components/common/heading";

const Card = ({ data, handleCardData, theme }) => {
  const ext = data.attributes.form_exts?.data.some(ext => ext.attributes.ext === "pdf") ? "pdf" :
    data.attributes.form_exts?.data.some(ext => ext.attributes.ext === "docx") ? "docx" :
    data.attributes.form_exts?.data.some(ext => ext.attributes.ext === "pptx") ? "pptx" :
    data.attributes.form_exts?.data.some(ext => ext.attributes.ext === "xlsx") ? "xlsx" : null;

  return (
    <StyledCard onClick={() => handleCardData(data)} $theme={theme}>
      <div className="card-img">
        <img src={data.attributes.card_prewiew?.data?.attributes?.url} alt={data.attributes.name_form} />
        <div className={`card-ext ${ext}`}></div>
      </div>
      <Heading className="card-title" level={4} label={data.attributes.name_form} />
    </StyledCard>
  );
};

export default Card;
