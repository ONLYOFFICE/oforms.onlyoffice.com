
import { useState, useRef } from "react";
import StyledUploadFile from "./styled-upload-file";
import ErrorPopup from "./error-popup";
import Heading from "@common/heading";
import Text from "@common/text";

const UploadFile = ({ t, file, setFile, fileValue, setFileValue, errorText, fileError, setFileError, fileFilled, setFileFilled, fileLoading, cardPreviewUrl, errorFormSubmit, setErrorFormSubmit, handleFileImageUpload }) => {
  const [drag, setDrag] = useState(false);
  const [errorFileSize, setErrorFileSize] = useState(false);
  const [errorFileValid, setErrorFileValid] = useState(false);
  const inputRef = useRef();

  const dragStartHandler = (e) => {
    e.preventDefault();
    setDrag(true);
  };

  const dragLeaveHandler = (e) => {
    e.preventDefault();
    setDrag(false);
  };

  const onHandleFileChange = async (e) => {
    setErrorFileSize(false);
    setErrorFileValid(false);

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

    const onLoadFileValid = (file) => {
      const reader = new FileReader();

      return new Promise((resolve, reject) => {
        reader.onload = (e) => {
          if (arraysEqual([0x50, 0x4B, 0x03, 0x04], new Uint8Array(e.target.result).slice(0, 4))) {
            resolve(true);
          } else {
            resolve(false);
          };
        };

        reader.readAsArrayBuffer(file);
      });
    };

    const fileValid = await onLoadFileValid(e.target.files[0]);

    if (fileValid && (e.target.files[0].type === "" || e.target.files[0].type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document")) {
      if (e.target.files[0]?.size < 10000000) {
        handleFileImageUpload(e);
        setFile(e.target.files[0]);
      } else if (e.target.files[0] !== undefined) {
        setErrorFileSize(true);
        setFileValue("");
        setTimeout(() => {
          setErrorFileSize(false);
        }, 10000);
      } else if (e.target.files[0] === undefined) {
        setFile(undefined);
        setFileError(true);
        setFileFilled(true);
      };
    } else {
      setErrorFileValid(true);
      setFileValue("");
      setTimeout(() => {
        setErrorFileValid(false);
      }, 10000);
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
                  <img src={cardPreviewUrl} alt={file.name.substring(0, file.name.length - 6)} />
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
      {errorFileSize &&
        <ErrorPopup onClick={() => setErrorFileSize(false)} title={t("Your file is too big!")} text={t("Max size 10MB. Please choose another one")} />
      }
      {errorFileValid &&
        <ErrorPopup onClick={() => setErrorFileValid(false)} title={t("Invalid file")} text={t("Please select a valid DOCXF file")} />
      }
      {errorFormSubmit &&
        <ErrorPopup onClick={() => setErrorFormSubmit(false)} title={t("Send error due to delay")} text={t("Please fill out the form again")} />
      }
    </StyledUploadFile>
  );
};

export default UploadFile;