
import StyledUploadFile from "./styled-upload-file";
import { useState, useRef } from "react";
import { setCookie } from "@utils/helpers/cookie";
import Heading from "@components/common/heading";
import Text from "@components/common/text";

const UploadFile = ({ t, file, setFile, fileValue, setFileValue, errorText, fileError, setFileError, fileFilled, setFileFilled, fileLoading, templatePreviewUrl, fileName, setFileName, setFileSize, setFilePages, handleFileImageUpload, setErrorTextPopup, setFileLoading }) => {
  const [drag, setDrag] = useState(false);
  const inputRef = useRef();
  const nullFileTimerRef = useRef(null);
  const largeFileTimerRef = useRef(null);
  const formatFileTimerRef = useRef(null);

  const dragStartHandler = (e) => {
    e.preventDefault();
    setDrag(true);
  };

  const dragLeaveHandler = (e) => {
    e.preventDefault();
    setDrag(false);
  };

  const onHandleFileChange = async (e) => {
    if (e.target.files[0] === undefined) {
      setFileValue("");
      return true;
    }
  
    const allowedFormats = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ];
  
    setFileValue(e.target.value);
    !e.target.value.length < 1 && setFileError(false);
  
    if (!allowedFormats.includes(e.target.files[0].type)) {
      setErrorTextPopup(t("Invalid file format! The uploaded file is not valid. Please choose a PDF, DOCX, PPTX, or XLSX file."));
      setFileLoading(false);
      setFile(undefined);
      setFileValue("");
  
      if (formatFileTimerRef.current) {
        clearTimeout(formatFileTimerRef.current);
      }
  
      formatFileTimerRef.current = setTimeout(() => {
        setErrorTextPopup("");
      }, 10000);
  
      return;
    }
  
    if (e.target.files[0].size === 0) {
      setErrorTextPopup(t("Invalid file size! The uploaded file has zero size. Please choose another one."));
      setFileLoading(false);
      setFileValue("");
      setFile(undefined);
  
      if (nullFileTimerRef.current) {
        clearTimeout(nullFileTimerRef.current);
      }
  
      nullFileTimerRef.current = setTimeout(() => {
        setErrorTextPopup("");
      }, 10000);
      return;
    }
  
    if (e.target.files[0].size > 10000000) {
      setErrorTextPopup(t("Your file is too big! Max size 10MB. Please choose another one."));
      setFileValue("");
  
      if (largeFileTimerRef.current) {
        clearTimeout(largeFileTimerRef.current);
      }
  
      largeFileTimerRef.current = setTimeout(() => {
        setErrorTextPopup("");
      }, 10000);
      return;
    }
  
    handleFileImageUpload(e);
    setFile(e.target.files[0]);
  };

  const onhandleFileRemove = () => {
    setFile(undefined);
    setFileError(true);
    setFileValue("");
    setFileName("");
    setFileFilled(true);
    setFileSize("0");
    setFilePages("0");
    setCookie("imageUpload", templatePreviewUrl, 1);
  };

  return (
    <StyledUploadFile>
      <>
        <label className={`upload-file ${drag ? "drag" : ""} ${file !== undefined && !file.value ? "load" : ""} ${file !== undefined && fileLoading === false ? "filled" : ""}`} name="file">
          <input
            onDragStart={e => dragStartHandler(e)}
            onDragLeave={e => dragLeaveHandler(e)}
            onDragOver={e => dragStartHandler(e)}
            onChange={e => onHandleFileChange(e)}
            ref={inputRef}
            value={fileValue}
            name="file"
            type="file"
            accept=".pdf, .docx, .pptx, .xlsx"
          />
          {file === undefined ? (
            <>
              <Heading as="div" className="upload-title" size={4}><span>{t("Upload your file")}</span></Heading>
              <span className="upload-icon"></span>
              <Text className="upload-subtitle">{t("or drag&drop it here")}</Text>
              <Text className="upload-size">({t("Max 10MB")})</Text>
            </>
          ) : (
            <div className="upload-img">
              {fileLoading ? (
                <div className="upload-img-loading"></div>
              ) : (
                <img src={templatePreviewUrl} alt={fileName} />
              )}
            </div>
          )}
        </label>
        {file !== undefined &&
          <div className="upload-btns">
            <button onClick={() => inputRef.current.click()} className="upload-change-btn" data-title={t("Change")} type="button"></button>
            <button onClick={() => onhandleFileRemove()} className="upload-delete-btn" data-title={t("Remove")} type="button"></button>
          </div>
        }
        {fileError && fileFilled &&
          <Text className="error-text">{errorText}</Text>
        }
      </>
    </StyledUploadFile>
  );
};

export default UploadFile;