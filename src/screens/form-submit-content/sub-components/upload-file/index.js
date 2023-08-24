
import { useState, useRef } from "react";
import { setCookie } from "@utils/helpers/cookie";
import StyledUploadFile from "./styled-upload-file";
import Heading from "@common/heading";
import Text from "@common/text";

const UploadFile = ({ t, file, setFile, fileValue, setFileValue, errorText, fileError, setFileError, fileFilled, setFileFilled, fileLoading, cardPreviewUrl, fileName, setFileSize, setFilePages, handleFileImageUpload, setFileNameError, setErrorTextPopup, setFileLoading }) => {
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
    };

    setFileNameError(e.target.files[0].name.toString().slice(0, -6));
    setFileValue(e.target.value);
    !e.target.value.length < 1 && setFileError(false);

    function arraysEqual(a, b) {
      if (a.length !== b.length) {
        return false;
      };
      for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) {
          return false;
        };
      };
      return true;
    };

    const reader = new FileReader();
    const fileValid = await new Promise((resolve) => {
      reader.onload = (e) => {
        if (arraysEqual([0x50, 0x4B, 0x03, 0x04], new Uint8Array(e.target.result).slice(0, 4))) {
          resolve(true);
        } else {
          resolve(false);
        };
      };

      reader.readAsArrayBuffer(e.target.files[0]);
    });

    if (fileValid && (e.target.files[0].type === "" || e.target.files[0].type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document")) {
      if (e.target.files[0].size === 0) {
        setErrorTextPopup(t("Invalid file size! The uploaded file has zero size. Please choose another one."));
        setFileLoading(false);
        setFileValue("");
        setFile(undefined);

        if (nullFileTimerRef.current) {
          clearTimeout(nullFileTimerRef.current);
        };
    
        nullFileTimerRef.current = setTimeout(() => {
          setErrorTextPopup("");
        }, 10000);
      } else if (e.target.files[0].size < 10000000) {
        handleFileImageUpload(e);
        setFile(e.target.files[0]);
      } else if (e.target.files[0] !== undefined) {
        setErrorTextPopup(t("Your file is too big! Max size 10MB. Please choose another one."));
        setFileValue("");

        if (largeFileTimerRef.current) {
          clearTimeout(largeFileTimerRef.current);
        };
    
        largeFileTimerRef.current = setTimeout(() => {
          setErrorTextPopup("");
        }, 10000);
      } else if (e.target.files[0] === undefined) {
        setFile(undefined);
        setFileError(true);
        setFileFilled(true);
      };
    } else {
      setErrorTextPopup(t("Invalid file format! The uploaded file is not valid. Please choose a DOCXF file."));
      setFileLoading(false);
      setFile(undefined);
      setFileValue("");

      if (formatFileTimerRef.current) {
        clearTimeout(formatFileTimerRef.current);
      };
  
      formatFileTimerRef.current = setTimeout(() => {
        setErrorTextPopup("");
      }, 10000);
    };
  };

  const onhandleFileRemove = () => {
    setFile(undefined);
    setFileError(true);
    setFileValue("");
    setFileFilled(true);
    setFileSize("0");
    setFilePages("0");
    setCookie("imageUpload", cardPreviewUrl, 1);
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
            accept=".docxf"
          />
          {file === undefined ?
            <>
              <Heading className="upload-title" level={4}><span>{t("Upload .docxf file")}</span></Heading>
              <span className="upload-icon"></span>
              <Text className="upload-subtitle">{t("or drag&drop it here")}</Text>
              <Text className="upload-size">({t("Max 10MB")})</Text>
            </>
          :
            <div className="upload-img">
              {
                fileLoading ?
                  <div className="upload-img-loading"></div>
                :
                  <img src={cardPreviewUrl} alt={fileName} />
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
    </StyledUploadFile>
  );
};

export default UploadFile;