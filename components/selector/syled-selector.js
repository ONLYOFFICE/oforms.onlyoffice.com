import styled from "styled-components";



const StyledSelector = styled.div`

display: inline-block;

.arrow{
    display: inline-block;
    position: absolute;
    margin-left: 14px;
    cursor: pointer;
}
.filter_selector{
    display: ${(props) => (props.isOpen ? "block" : "none")};
    position: absolute;    
    min-width: 100px;
    left: 80px;
    top: 30px;  
    padding-top: 14px;
    background-color: #fff;
    border-radius: 3px;
    padding-top: 14px;
    box-shadow: 0px 7px 25px rgb(85 85 85 / 15%);
    
}
.newest{
    padding: 16px;
    font-size: 16px;
    cursor: pointer;
    white-space: nowrap;
}
.newest:hover{
    color: #ff6f3d;
    background-color: #f5f5f5;
}
.oldest{
    padding: 16px;
    font-size: 16px;
    cursor: pointer;
    white-space: nowrap;
}
.oldest:hover{
    color: #ff6f3d;
    background-color: #f5f5f5;
}




  
`;



export default StyledSelector;
