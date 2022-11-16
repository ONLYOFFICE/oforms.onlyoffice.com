import Box from "@components/common/box";
import Text from "@components/common/text";
import Link from "@components/common/link";
import Button from "@components/common/button";
import Heading from "@components/common/heading";
import StyledCategoryContent from "./styled-category-content";
import CategoryItem from "./category-item";

const CategoryContent = ({ t, labelName, types, branches, compilations, locale }) => {
  
  return (
    <StyledCategoryContent>
      <Box className="section-page">
        <Box>
          <Heading className="header" fontSize="24px" fontWeight="700" level={3}>
            {t("Explore other categories", { labelName })}
          </Heading>
        </Box>

        {/* <CategoryItem
        label={t("Forms by branch")}
        data={branches}        
        /> */}
        
        <Box className="forms_by_branch">
          <Heading className="header" fontSize="13px" fontWeight="600" textTransform="uppercase" level={4}>
            {t("Forms by branch")}
          </Heading>
          <Box className='forms_by_branch_items'>
            {branches.data?.map((branch) => ( 
                <a
                key={branch.id}
                href={`${locale}/form/branches/${branch.attributes.urlReq}`}              
                className="item_link"
                style={{ textDecoration: "none" }}
              >
                {branch.attributes.branch}
                                  
              </a>              
            ))}

          </Box>
        </Box>
        <Box className="forms_by_branch">
          <Heading className="header" fontSize="13px" fontWeight="600" textTransform="uppercase" level={4}>
            {t("Forms by type")}
          </Heading>
          <Box className='forms_by_branch_items'>
            {types.data?.map((type) => ( 
                <a
                key={type.id}
                href={`${locale}/form/types/${type.attributes.urlReq}`}              
                className="item_link"
                style={{ textDecoration: "none" }}
              >
                {type.attributes.type}
                                  
              </a>              
            ))}

          </Box>
        </Box>
        <Box className="forms_by_branch">
          <Heading className="header" fontSize="13px" fontWeight="600" textTransform="uppercase" level={4}>
            {t("Popular Compilations")}
          </Heading>
          <Box className='forms_by_branch_items'>
            {compilations.data?.map((compilation) => ( 
                <a
                key={compilation.id}
                href={`${locale}/form/compilations/${compilation.attributes.urlReq}`}              
                className="item_link"
                style={{ textDecoration: "none" }}
              >
                {compilation.attributes.compilation}
                                  
              </a>              
            ))}

          </Box>
        </Box>
      </Box>    
      
      
    </StyledCategoryContent>
  );
};

export default CategoryContent;
