
import { useState, useRef } from "react";
import StyledUploadFile from "./styled-upload-file";
import Heading from "@common/heading";
import Text from "@common/text";

const UploadFile = ({ t, file, setFile, fileValue, setFileValue, errorText, fileError, setFileError,  fileFilled, setFileFilled, fileLoading, onChangeHandler }) => {
  const [drag, setDrag] = useState(false);
  const [errorPopup, setErrorPopup] = useState(false);
  const inputRef = useRef();

  const dragStartHandler = (e) => {
    e.preventDefault();
    setDrag(true);
  };

  const dragLeaveHandler = (e) => {
    e.preventDefault();
    setDrag(false);
  };

  const onHandleFileChange = (e) => {
    if (e.target.files[0]?.size < 10000000) {
      setFile(e.target.files[0]);
    } else if (e.target.files[0] !== undefined) {
      setErrorPopup(true);
      setTimeout(() => {
        setErrorPopup(false);
      }, 10000);
    } else {
      if (e.target.files[0] === undefined) {
        setFile(undefined);
        setFileError(true);
        setFileFilled(true);
      };
    };
  };

  const onhandleFileRemove = () => {
    setFile(undefined);
    setFileError(true);
    setFileValue("");
    setFileFilled(true);
  };

  return (
    <StyledUploadFile>
      <>
        <label className={`upload-file ${drag ? "drag" : ""} ${file !== undefined && fileLoading === false ? "filled" : ""}`} name="file">
          <input 
            onDragStart={e => dragStartHandler(e)}
            onDragLeave={e => dragLeaveHandler(e)}
            onDragOver={e => dragStartHandler(e)}
            onChange={e => {onHandleFileChange(e); onChangeHandler(e)}} 
            ref={inputRef} 
            value={fileValue} 
            name="file" 
            type="file" 
            accept=".docxf"
          />
          {file === undefined ?
            <>
              <Heading className="upload-title" level={4}><span>{t("Upload .docxf file")}</span></Heading>
              <span className="upload-icon"></span>
              <Text className="upload-subtitle">{t("or drag&drop it here")}</Text>
              <Text className="upload-size">({t("Max")} 10MB)</Text>
            </>
          :
            <div className="upload-img">
              {
                fileLoading ?
                  <div className="upload-img-loading"></div>
                :
                  <img src="https://static-oforms.onlyoffice.com/image1_b8e15a6f9f.png" alt="" />
              }
            </div>
          }
        </label>
        {file !== undefined &&
          <div className="upload-btns">
            <div onClick={() => inputRef.current.click()} className="upload-change-btn" data-title={t("Change")}></div>
            <div onClick={() => onhandleFileRemove()} className="upload-delete-btn" data-title={t("Remove")}></div>
          </div>
        }
        {fileError && fileFilled &&
          <Text className="error-text">{errorText}</Text>
        }
      </>
      {errorPopup &&
        <div onClick={() => setErrorPopup(false)} className="error-popup">
          <div className="error-popup-close-btn"></div>
          <div className="error-popup-wrapper">
            <Text className="error-popup-title">{t("Your file is too big!")}</Text>
            <Text className="error-popup-text">{t("Max size 10MB. Please choose another one")}</Text>
          </div>
        </div>
      }
    </StyledUploadFile>
  );
};

export default UploadFile;