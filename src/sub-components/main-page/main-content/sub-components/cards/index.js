import React, { useState, useEffect } from "react";

import Card from "../../../../../../components/card";
import Button from "../../../../../../components/button";
import Pagination from "../../../../../../components/pagination";

import StyledCards from "./styled-cards";

const Cards = ({ t, data, typeSortData, currentLanguage, groupCheckboxIsOpen, ...rest }) => {
  const ItemSliceLength = 9;
  
  const tmpLength = Math.ceil(data.length / ItemSliceLength);

  const [windowCheck, setWindowCheck] = useState('');

  useEffect(() => {
    window && window.addEventListener("resize", checkingMaxPage);
    return () => window && window.removeEventListener("resize", checkingMaxPage);
  }, []);

  const checkingMaxPage = () => {
    if (typeof window !== windowCheck) {
      setWindowCheck(window.innerWidth <= 500);
    }
  };

  const maxPage = windowCheck ? 5 : 7;

  const pageLimit = tmpLength > maxPage ?  maxPage :  tmpLength;

  const [pages] = useState(pageLimit);
  const [currentPage, setCurrentPage] = useState(1);

  function goToNextPage(e) {
    if(currentPage === tmpLength){
      e.preventDefault()
    }else{
      setCurrentPage((page) => page + 1);
    }
  }

  function goToPreviousPage(e) {
    if(currentPage === 1){
      e.preventDefault()
    }else{
      setCurrentPage((page) => page - 1);
    }
  }

  function changePage(event) {
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
  }

  const getPaginatedData = () => {
    const startIndex = currentPage * ItemSliceLength - ItemSliceLength;
    const endIndex = startIndex + ItemSliceLength;
    return data.slice(startIndex, endIndex);
  };

  const getPaginationGroup = () => {
    let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit || 0;
      return new Array(tmpLength - start > pageLimit ? pageLimit : tmpLength - start).fill().map((_, idx) => start + idx + 1)
  };

  return (
    <div className="tempalates-cards-items" {...rest}>
      <StyledCards groupCheckboxIsOpen={groupCheckboxIsOpen}>
        {getPaginatedData().map((it, id) => (
          <Card key={id} arrayItems={it} t={t} currentLanguage={currentLanguage}/>
        ))}
      </StyledCards>
        <Pagination
          currentPage={currentPage}
          pages={pages}
          data={data}
          dataLimit={ItemSliceLength}
          changePage={changePage}
          goToNextPage={goToNextPage}
          goToPreviousPage={goToPreviousPage}
          getPaginationGroup={getPaginationGroup}
        />
    </div>
  );
};

export default Cards;
