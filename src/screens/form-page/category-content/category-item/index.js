import Box from "@common/box";
import Heading from "@common/heading";

const CategoryItem = ({ label, data}) => {

    return (               
          <Box className="forms_by_branch">
            <Heading className="header" fontSize="13px" fontWeight="600" level={4}>
              {label}
            </Heading>
            <Box className='forms_by_branch_items'>
              {data.data?.map((item) => ( 
                  <a
                  key={item.id}
                  href={`${locale}/form/branches/${item.attributes.urlReq}`}              
                  className="item_link"
                  style={{ textDecoration: "none" }}
                >
                  {item.attributes.item}
                                    
                </a>              
              ))}  
            </Box>
          </Box>          
    );
  };
  
  export default CategoryItem;
  