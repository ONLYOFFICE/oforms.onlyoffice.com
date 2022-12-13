import { useEffect, useState } from "react";

const CarouselSection = ({}) => {
  // Carousel client data
  const maxItemsClientCardForms = 7;
  // Retrieves the string and converts it to a JavaScript object
  const localStorageTmp = MainData;
  // const retrievedString =
  //   typeof window !== "undefined" && getCookie(CAROUSEL_COOKIE) !== undefined
  //     ? localStorage.getItem(nameLocalStorage)
  //     : undefined;
  // retrievedString === undefined &&
  //   typeof window !== "undefined" &&
  //   localStorage.removeItem("arrayCaroselClientSideItemsOforms");
  const parsedObjectLocalStorage =
    retrievedString !== undefined ? JSON.parse(retrievedString) : [];
  const [itemsClient, setItemsClient] = useState(parsedObjectLocalStorage);
  const [stateConfig, setConfig] = useState(shortCarouselSettings);

  const clientSideCarousel = () => {
    // setCookie(CAROUSEL_COOKIE, "oforms-items", 1);
    // Check data in local storage
    if (retrievedString === null || !retrievedString) {
      localStorage.setItem(nameLocalStorage, JSON.stringify([localStorageTmp]));
    } else {
      // Retrieves the string and converts it to a JavaScript object
      const parsedObjectLocalStorage = JSON.parse(retrievedString);

      let tmpLocalStorage;

      if (maxItemsClientCardForms >= parsedObjectLocalStorage.length) {
        // Modifies the object, converts it to a string and replaces the existing `data items` in LocalStorage
        tmpLocalStorage = [...parsedObjectLocalStorage, localStorageTmp];
        const modifiedStrigifiedForStorage = JSON.stringify(tmpLocalStorage);
        localStorage.setItem(nameLocalStorage, modifiedStrigifiedForStorage);
      } else {
        // Modifies the object, converts it to a string and replaces the existing `data items` in LocalStorage
        parsedObjectLocalStorage.shift();
        tmpLocalStorage = [...parsedObjectLocalStorage, localStorageTmp];
        const modifiedStrigifiedForStorage = JSON.stringify(tmpLocalStorage);
        localStorage.setItem(nameLocalStorage, modifiedStrigifiedForStorage);
      }
      setItemsClient(parsedObjectLocalStorage);
      if (parsedObjectLocalStorage.length <= 6) {
        setConfig({
          ...shortCarouselSettings,
          infinite: false,
          slidesToScroll: 6,
          slidesToShow: 6,
        });
      }
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      clientSideCarousel();
    }
  }, []);

  return (
    <section>
      <></>
      <></>
      <></>
    </section>
  );
};
