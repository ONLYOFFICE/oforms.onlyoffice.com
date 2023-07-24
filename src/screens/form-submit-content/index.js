import StyledFormSubmitContent from "./styled-form-submit-content";
import { useState, useEffect, useRef } from "react";
import filePagesApi from "./api/file-pages";
import sendFormApi from "./api/send-form";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import Heading from "@common/heading";
import Text from "@common/text";
import Button from "@common/button";
import Breadcrumb from "./sub-components/breadcrumb";
import Select from "./sub-components/select";
import Input from "./sub-components/input";
import UploadFile from "./sub-components/upload-file";
import UploadPopup from "./sub-components/upload-popup";

const FormSubmitContent = ({ t, locale, categories }) => {
  const [file, setFile] = useState(undefined);
  const [fileValue, setFileValue] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState([]);
  const [categoryId, setCategoryId] = useState([]);
  const [language, setLanguage] = useState([]);
  const [languageKey, setLanguageKey] = useState("");

  const [nameValid, setNameValid] = useState(false);
  const [descriptionValid, setDescriptionValid] = useState(false);
  const [categoryValid, setCategoryValid] = useState(false);
  const [languageValid, setLanguageValid] = useState(false);

  const [nameFilled, setNameFilled] = useState(false);
  const [descriptionFilled, setDescriptionFilled] = useState(false);
  const [fileFilled, setFileFilled] = useState(false);

  const [fileError, setFileError] = useState(true);
  const [nameError, setNameError] = useState(true);
  const [descriptionError, setDescriptionError] = useState(true);
  const [categoryError, setCategoryError] = useState(true);
  const [languageError, setLanguageError] = useState(true);
  const [recaptchaError, setRecaptchaError] = useState(true);

  const [fileLoading, setFileLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [uploadPopup, setUploadPopup] = useState(false);
  const [formValid, setFormValid] = useState(false);

  const [fileImg, setFileImg] = useState("");
  const [pdfConvertUrl, setPdfConvertUrl] = useState("");
  const [docxfAwsUrl, setDocxfAwsUrl] = useState("");
  const [filePages, setFilePages] = useState("");
  const refRecaptcha = useRef();

  // Form validation
  useEffect(() => {
    if (fileError || fileLoading || !(name.length > 0 && !nameError) || !(description.length > 0 && !descriptionError) || categoryError || languageError || recaptchaError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    };
  }, [fileError, fileLoading, name, description, nameError, descriptionError, categoryError, languageError || recaptchaError]);

  const onChangeHandler = (e) => {
    switch (e.target.name) {
      case "name":
        setName(e.target.value);
        !e.target.value.length < 1 && setNameError(false);
        break;

      case "description":
        setDescription(e.target.value);
        !e.target.value.length < 1 && setDescriptionError(false);
        break;

      case "file":
        setFileValue(e.target.value);
        !e.target.value.length < 1 && setFileError(false);

        if (e.target.files[0]?.size < 10000000) {
          handleFileImageUpload(e);
        };

        break;
    };
  };

  const onFocusHandler = (e) => {
    switch (e.target.name) {
      case "name":
        setNameError(false);
        setNameValid(false);
        break;

      case "description":
        setDescriptionError(false);
        setDescriptionValid(false);
        break;
    };
  };

  const onBlurHandler = (e) => {
    switch (e.target.name) {
      case "name":
        setNameFilled(true);

        if (name && !nameError) {
          setNameValid(true);
        } else {
          setNameValid(false);
          setNameError(true);
        };
        break;

      case "description":
        setDescriptionFilled(true);

        if (description && !descriptionError) {
          setDescriptionValid(true);
        } else {
          setDescriptionValid(false);
          setDescriptionError(true);
        };
        break;
    };
  };

  // Get image from AWS
  const handleFileImageUpload = async (e) => {
    setFileLoading(true);

    const formData = new FormData();
    formData.append("file", e.target.files[0]);

    const imageUploadResponse = await axios.post("/api/image-upload", formData);
    const { pngConvertUrl, pdfConvertUrl, docxfAwsUrl, fileName } = imageUploadResponse.data[0];

    const filePagesApiResponse = await filePagesApi(pdfConvertUrl, fileName);

    setFileImg(pngConvertUrl);
    setPdfConvertUrl(pdfConvertUrl);
    setDocxfAwsUrl(docxfAwsUrl);
    setFilePages(filePagesApiResponse.toString());
    setFileLoading(false);
  };

  const sendForm = async (e) => {
    e.preventDefault();
    setFormLoading(true);

    const formUploadResponse = await axios.post("/api/form-upload", {
      "fileName": file.name,
      "docxfAwsUrl": docxfAwsUrl
    });

    const { oformConvertUrl, templateImageUrl } = formUploadResponse.data[0];
    const fileSize = file.size;
    const fileName = file.name;
    const fileLastModifiedDate = file.lastModifiedDate;

    await sendFormApi(
      oformConvertUrl,
      templateImageUrl,
      docxfAwsUrl,
      fileSize,
      fileName,
      fileImg,
      pdfConvertUrl,
      name,
      fileLastModifiedDate,
      languageKey,
      filePages,
      description,
      categoryId
    );

    await axios.post("/api/image-delete", {
      "name": file.name,
    }).then(() => {
      setUploadPopup(true);
      setFormLoading(false);
    });
  };

  const clearForm = () => {
    setFile(undefined);
    setFileValue("");
    setName("");
    setDescription("");
    setCategory([]);
    setCategoryId([]);
    setLanguage([]);
    setLanguageKey("");
    setNameValid(false);
    setDescriptionValid(false);
    setCategoryValid(false);
    setLanguageValid(false);
    setFormValid(false);
    refRecaptcha.current.reset();
  };

  return (
    <StyledFormSubmitContent>
      <Breadcrumb t={t} language={locale} />

      <div className="wrapper">
        <div className="upload-wrapper">
          <UploadFile
            t={t}
            file={file}
            setFile={setFile}
            fileValue={fileValue}
            setFileValue={setFileValue}
            fileError={fileError}
            setFileError={setFileError}
            fileFilled={fileFilled}
            setFileFilled={setFileFilled}
            onChangeHandler={onChangeHandler}
            fileLoading={fileLoading}
            fileImg={fileImg}
            errorText={t("File is empty")}
          />
        </div>
        <div className="content">
          <div className="wrapper-content">
            <Heading className="title" level={3}>{t("Uploading your form")}</Heading>
            <Text className="subtitle" as="p">{t("Please fill out all the fields before sending the form.")}</Text>
            <Input
              label={t("Form name")}
              placeholder={t("Price quote template")}
              errorText={(nameFilled && nameError) && t("Form name is empty")}
              className={`${nameFilled && nameError ? "error" : ""} ${nameValid ? "valid" : ""}`}
              name="name"
              value={name}
              onFocus={(e) => onFocusHandler(e)}
              onChange={(e) => onChangeHandler(e)}
              onBlur={(e) => onBlurHandler(e)}
            />
            <Input
              isTextarea
              label={t("Form description")}
              placeholder={t("Give more details about your form, such as who will benefit from it, in which industry, etc.")}
              errorText={(descriptionFilled && descriptionError) && t("Form description is empty")}
              className={`${descriptionFilled && descriptionError ? "error" : ""} ${descriptionValid ? "valid" : ""}`}
              name="description"
              value={description}
              onFocus={(e) => onFocusHandler(e)}
              onChange={(e) => onChangeHandler(e)}
              onBlur={(e) => onBlurHandler(e)}
            />
            <Select
              isMulti
              t={t}
              label={t("Form category")}
              labelMore={`(${t("maximum 5")})`}
              placeholder={t("Enter category or choose")}
              errorText={t("Form category is empty")}
              categories={categories}
              selected={category}
              setSelected={setCategory}
              valid={categoryValid}
              setValid={setCategoryValid}
              error={categoryError}
              setError={setCategoryError}
              setCategoryId={setCategoryId}
            />
            <Select
              t={t}
              label={t("Language")}
              placeholder={t("Please select a language")}
              errorText={t("Language is empty")}
              selected={language}
              setSelected={setLanguage}
              setLanguageKey={setLanguageKey}
              valid={languageValid}
              setValid={setLanguageValid}
              error={languageError}
              setError={setLanguageError}
            />
            <ReCAPTCHA
              ref={refRecaptcha}
              onChange={() => setRecaptchaError(false)}
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
              hl={locale}
            />
          </div>

          <div className="file-info">
            <div className="file-info-item">
              <Text className="file-info-label file-type">{t("FileType")}:</Text>
              <Text className="file-info-text">.docxf</Text>
            </div>
            <div className="file-info-item">
              <Text className="file-info-label">{t("FileSize")}:</Text>
              <Text className="file-info-text">{file !== undefined && fileLoading === false ? file.size.toString().substring(0, 2) : 0} kb</Text>
            </div>
            <div className="file-info-item">
              <Text className="file-info-label">{t("Pages")}:</Text>
              <Text className="file-info-text">{file !== undefined && fileLoading === false ? filePages : 0}</Text>
            </div>
          </div>

          <Button onClick={(e) => sendForm(e)} className={`send-button ${formLoading ? "loading" : ""}`} label={t("Send")} isDisabled={!formValid || formLoading} />
        </div>
      </div>

      <UploadPopup t={t} file={file} uploadPopup={uploadPopup} setUploadPopup={setUploadPopup} clearForm={clearForm} />
    </StyledFormSubmitContent>
  );
};

export default FormSubmitContent;