import styled from "styled-components";
import Section from "@components/common/section";
import { device } from "@components/utils/devices";

const StyledCategoryContent = styled(Section)`
background: #f5f5f5;
display: block;
padding: 0 0 112px;

.section-page {
  display: block;
  max-width: 1120px;
  margin: 0 auto;  
}
.forms_by_branch{
  display: block;
  margin-top: 40px;}

.forms_by_branch_items{
  margin-top: 16px;
  gap: 16px;

}
.item_link{
  padding: 11px 18px;
  border: 1px solid #AAAAAA;
  border-radius: 4px;
  cursor: pointer;
  color: #444444;
  font-size: 16px;
  font-weight: 400;
  &:hover{
    border: 1px solid #FF6F3D;
    color: #FF6F3D;
  }
}
.items-text{
  cursor: pointer;  
}

`;

export default StyledCategoryContent;
