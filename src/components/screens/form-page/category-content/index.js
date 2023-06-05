import Box from "@common/box";
import Heading from "@common/heading";
import StyledCategoryContent from "./styled-category-content";
import {useTranslation} from "next-i18next";

const CategoryContent = ({ labelName, types, categories, compilations, locale }) => {
  const { t } = useTranslation('common')
  const localeHREF = categories ? `/${locale}` : locale;
  
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
            {categories.data?.map((categorie) => ( 
                <a
                key={categorie.id}                
                href={`${locale === "en" ? "" : localeHREF}/form/${categorie.attributes.urlReq}`}              
                className="item_link"
                style={{ textDecoration: "none" }}
              >
                {categorie.attributes.categorie}
                                  
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
                href={`${locale === "en" ? "" : localeHREF}/form/types/${type.attributes.urlReq}`}        
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
                href={`${locale === "en" ? "" : localeHREF}/form/compilations/${compilation.attributes.urlReq}`}            
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
