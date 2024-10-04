import StyledFormSubmitContent from "./styled-form-submit-content";
import { useState, useEffect, useRef } from "react";
import { getCookie, setCookie } from "@utils/helpers/cookie";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import Heading from "@components/common/heading";
import Text from "@components/common/text";
import Button from "@components/common/button";
import Breadcrumbs from "./breadcrumbs";
import LanguageSelect from "./select/language-select";
import CategorySelect from "./select/category-select";
import Input from "./input";
import UploadFile from "./upload-file";
import UploadPopup from "./upload-popup";
import ErrorPopup from "./error-popup";

const FormSubmitContent = ({ t, locale, categories, formExts, queryIndexData }) => {
  const [file, setFile] = useState(undefined);
  const [fileValue, setFileValue] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState([]);
  const [categoryId, setCategoryId] = useState([]);
  const [language, setLanguage] = useState([]);
  const [languageKey, setLanguageKey] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [categoriesData, setCategoriesData] = useState(categories?.data);

  const [nameValid, setNameValid] = useState(false);
  const [nameExistsValid, setNameExistsValid] = useState(false);
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
  const [errorTextPopup, setErrorTextPopup] = useState("");
  const [previewError, setPreviewError] = useState(false);

  const [fileLoading, setFileLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [uploadPopup, setUploadPopup] = useState(false);
  const [formValid, setFormValid] = useState(false);

  const [templatePreviewUrl, setTemplatePreviewUrl] = useState("");
  const [filePages, setFilePages] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState("0");
  const [fileOrientation, setFileOrientation] = useState("");
  const refRecaptcha = useRef();
  const cardPreviewTimerRef = useRef(null);

  useEffect(() => {
    if (queryIndexData) {
      const imageuploadCookie = getCookie("imageUpload");
      const formSubmitCookie = getCookie("formSubmit");

      if (!formSubmitCookie) {
        setTemplatePreviewUrl(queryIndexData[0]);
        setFilePages(queryIndexData[1].toString());
        setFileName(queryIndexData[2]);
        setFileSize(queryIndexData[3]);
        setFileError(false);
        setFile(true);

        if (queryIndexData[4]) {
          setName(queryIndexData[4]);
          setNameValid(true);
          setNameError(false);
        };

        if (imageuploadCookie === queryIndexData[0]) {
          setTemplatePreviewUrl("");
          setFile(undefined);
        };
      };
    };
  }, []);

  // Form validation
  useEffect(() => {
    if (fileError || fileLoading || !(name.length > 0 && !nameError) || !(description.length > 0 && !descriptionError) || name.length > 100 && !nameError || description.length > 300 && !descriptionError || categoryError || languageError || recaptchaError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    };
  }, [fileError, fileLoading, name, description, nameError, descriptionError, categoryError, languageError || recaptchaError]);

  const onChangeHandler = (e) => {
    switch (e.target.name) {
      case "name":
        setName(e.target.value);
        !e.target.value.length < 1 || !e.target.value.length > 100 && setNameError(false);
        break;

      case "description":
        setDescription(e.target.value);
        !e.target.value.length < 1 || !e.target.value.length > 300 && setDescriptionError(false);
        break;
    };
  };

  const onFocusHandler = (e) => {
    switch (e.target.name) {
      case "name":
        setNameExistsValid(false);
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
        setNameExistsValid(false);
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

  const handleFileImageUpload = async (e) => {
    setErrorTextPopup("");
    setFileLoading(true);

    const formData = new FormData();
    formData.append("file", e.target.files[0]);

    try {
      const imageUploadResponse = await axios.post("/api/file-upload", formData);
      const { templatePreviewConvertUrl, pageCount, fileOrientation } = imageUploadResponse.data;

      setFileOrientation(fileOrientation);
      setTemplatePreviewUrl(templatePreviewConvertUrl);
      setFilePages(pageCount);
      setFileName(e.target.files[0]?.name);
      setFileSize(e.target.files[0]?.size);
      setFileLoading(false);
    } catch (error) {
      if (error.response) {
        setPreviewError(true);
        setErrorTextPopup(t("Page timed out! Please upload a file once again."));
      };
    };
  };

  useEffect(() => {
    if (previewError) {
      setFileLoading(false);
      setFile(undefined);
      setFileValue("");
      setPreviewError(false);
    };
  }, [previewError]);

  const sendForm = async (e) => {
    e.preventDefault();
    setErrorTextPopup("");
    setFormLoading(true);

    const formData = new FormData();
    formData.append("templatePreviewUrl", templatePreviewUrl);
    formData.append("file", file);
    formData.append("queryUrl", queryIndexData?.[5] ? queryIndexData[5] : null);
    formData.append("fileName", queryIndexData?.[2] ? queryIndexData[2] : null)
    formData.append("name", name);
    formData.append("description", description);
    formData.append("languageKey", languageKey);
    formData.append("categoryId", categoryId);
    formData.append("formExt", [formExts.data.find(d => d.attributes.ext === fileName?.match(/\.(\w+)$/)?.[1]).id]);
    formData.append("fileOrientation", fileOrientation);

    const sendFormResponse = await axios.post(queryIndexData?.[5] ? "/api/form-upload-submission" : "/api/form-submission", formData);

    if (sendFormResponse.data.error === "card_prewiew") {
      clearForm();
      setFormLoading(false);
      setErrorTextPopup(t("Page timed out! Please upload a file once again."));

      if (cardPreviewTimerRef.current) {
        clearTimeout(cardPreviewTimerRef.current);
      };

      cardPreviewTimerRef.current = setTimeout(() => {
        setErrorTextPopup("");
      }, 10000);

      return;
    } else if (sendFormResponse.data.error === "name_form") {
      setNameExistsValid(true);
      setNameValid(false);
      setNameError(true);
      setFormLoading(false);
      setRecaptchaError(true);
      refRecaptcha.current.reset();

      return;
    } else {
      const url = new URL(window.location.href);
      url.search = "";
      window.history.replaceState({}, document.title, url.pathname);
      setUploadPopup(true);
      setFormLoading(false);
      setCookie("formSubmit", "", 1);
      setCookie("imageUpload", templatePreviewUrl, 1);
    };
        
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "newTemplateUploded",
    });
  };

  const clearForm = () => {
    setFile(undefined);
    setFileValue("");
    setFileName("");
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
      <Breadcrumbs t={t} locale={locale} />

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
            templatePreviewUrl={templatePreviewUrl}
            fileName={fileName}
            setFileName={setFileName}
            setFileSize={setFileSize}
            setFilePages={setFilePages}
            handleFileImageUpload={handleFileImageUpload}
            setErrorTextPopup={setErrorTextPopup}
            setFileLoading={setFileLoading}
            errorText={t("File is empty")}
          />
        </div>
        <div className="content">
          <div className="wrapper-content">
            <Heading className="title" level={3}>{t("Uploading your template")}</Heading>
            <Text className="subtitle" as="p">{t("Please fill out all the fields before sending the template.")}</Text>
            <Input
              label={`${t("Template name")}*`}
              placeholder={t("Enter name")}
              errorText={nameExistsValid ? t("Duplicate file name. Please rename your template or choose another one.") : nameFilled && nameError && name.length < 1 ? t("Template name is empty") : name.length > 100 ? t("You are limited to 100 characters") : null}
              className={`${(nameFilled && nameError) && name.length < 1 || name.length > 100 || nameExistsValid ? "error" : ""} ${nameValid ? "valid" : ""}`}
              name="name"
              value={name}
              onFocus={(e) => onFocusHandler(e)}
              onChange={(e) => onChangeHandler(e)}
              onBlur={(e) => onBlurHandler(e)}
            />
            <Input
              isTextarea
              label={`${t("Template description")}*`}
              placeholder={t("Give more details about your template, such as who will benefit from it, in which industry, etc.")}
              errorText={(descriptionFilled && descriptionError) && description.length < 1 ? t("Template description is empty") : description.length > 300 ? t("You are limited to 300 characters") : null}
              className={`${(descriptionFilled && descriptionError) && description.length < 1 || description.length > 300 ? "error" : ""} ${descriptionValid ? "valid" : ""}`}
              name="description"
              value={description}
              onFocus={(e) => onFocusHandler(e)}
              onChange={(e) => onChangeHandler(e)}
              onBlur={(e) => onBlurHandler(e)}
            />
            <CategorySelect
              t={t}
              label={`${t("Template category")}*`}
              labelMore={`(${t("maximum 5")})`}
              placeholder={t("Enter category or choose")}
              errorText={t("Template category is empty")}
              categories={categories}
              selected={category}
              setSelected={setCategory}
              valid={categoryValid}
              setValid={setCategoryValid}
              error={categoryError}
              setError={setCategoryError}
              setCategoryId={setCategoryId}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              categoriesData={categoriesData}
            />
            <LanguageSelect
              t={t}
              label={`${t("Language")}*`}
              placeholder={t("Please select a language")}
              errorText={t("Language is empty")}
              selected={language}
              setSelected={setLanguage}
              setLanguageKey={setLanguageKey}
              valid={languageValid}
              setValid={setLanguageValid}
              error={languageError}
              setError={setLanguageError}
              setCategory={setCategory}
              setCategoryValid={setCategoryValid}
              setCategoryId={setCategoryId}
              setSearchValue={setSearchValue}
              categoriesData={categoriesData}
              setCategoriesData={setCategoriesData}
              setCategoryError={setCategoryError}
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
              <Text className={`file-info-label file-type ${fileName?.match(/\.(\w+)$/)?.[1]}`}>{t("File type")}{locale === "ja" || locale === "zh" ? "：" : locale === "pt" ? ": " : ":"}</Text>
              <Text className="file-info-text">{fileName?.match(/\.(\w+)$/)?.[0]}</Text>
            </div>
            <div className="file-info-item">
              <Text className="file-info-label">{t("File size")}{locale === "ja" || locale === "zh" ? "：" : locale === "pt" ? ": " : ":"}</Text>
              <Text className="file-info-text">{file !== undefined && fileLoading === false ? (fileSize / 1024) < 1024 ? `${(fileSize / 1024).toFixed(0)} kb` : `${((fileSize / 1024) / 1024).toFixed(1)} mb` : 0}</Text>
            </div>
            <div className="file-info-item">
              <Text className="file-info-label">{t("Pages")}{locale === "ja" || locale === "zh" ? "：" : locale === "pt" ? ": " : ":"}</Text>
              <Text className="file-info-text">{file !== undefined && fileLoading === false ? filePages : 0}</Text>
            </div>
          </div>

          <Button onClick={(e) => sendForm(e)} id="form-submit-send-button" className={`send-button ${formLoading ? "loading" : ""}`} label={t("Send")} isDisabled={!formValid || formLoading} />
        </div>

        {errorTextPopup !== "" &&
          <ErrorPopup onClick={() => setErrorTextPopup("")} t={t} fileName={fileName} text={errorTextPopup} />
        }
      </div>

      <UploadPopup t={t} uploadPopup={uploadPopup} fileName={fileName} setUploadPopup={setUploadPopup} clearForm={clearForm} />
    </StyledFormSubmitContent>
  );
};

export default FormSubmitContent;