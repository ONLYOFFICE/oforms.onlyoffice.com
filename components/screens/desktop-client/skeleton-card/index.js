import StyledSkeletonCard from "./styled-skeleton-card";

const SkeletonCard = ({ theme }) => {
  return (
    <StyledSkeletonCard $theme={theme}>
      <div className="skeleton-card-body"></div>
      <div className="skeleton-card-title"></div>
    </StyledSkeletonCard>
  );
};

export default SkeletonCard;
