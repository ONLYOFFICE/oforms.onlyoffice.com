import { useRouter } from 'next/router'
import StyledShortCard from "./styled-short-card";
import InternalLink from "@components/common/internal-link";

const ShortCard = ({ data }) => {
  const router = useRouter()
  const locale = router.locale;

  return (
    <StyledShortCard className={`short-card ${locale === "ar" && "ar" }`}>
      <InternalLink className="card-preview" href={data.url} tabIndex={-1}>
        <div className="card-img">
          <img src={data.card_prewiew} alt={data.name_form} />
        </div>
      </InternalLink>
      <InternalLink className="card-title" label={data.name_form} href={data.url} />
    </StyledShortCard>
  );
};

export default ShortCard;