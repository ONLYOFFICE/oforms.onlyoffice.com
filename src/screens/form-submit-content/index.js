import StyledFormSubmitContent from "./styled-form-submit-content";
import { useState, useEffect } from "react";
import axios from "axios";
import jwt from "jsrsasign";
import Heading from "@common/heading";
import Text from "@common/text";
import Button from "@common/button";
import Breadcrumb from "./sub-components/breadcrumb";
import Select from "./sub-components/select";
import Input from "./sub-components/input";
import UploadFile from "./sub-components/upload-file";
import UploadPopup from "./sub-components/upload-popup";
import moment from "moment";
import "moment/locale/fr";
import "moment/locale/it";
import "moment/locale/es";
import "moment/locale/de";
import "moment/locale/ja";
import "moment/locale/zh-cn";

const FormSubmitContent = ({ t, locale, categories }) => {
  const categoriesData = categories.data.map((category) => category.attributes.categorie);
  const languageData = [
    { title: t("English"), key: "en" },
    { title: t("Chinese (Simplified)"), key: "zh" },
    { title: t("French"), key: "fr" },
    { title: t("German"), key: "de" },
    { title: t("Portuguese"), key: "pt" },
    { title: t("Spanish"), key: "es" }
  ];

  const [file, setFile] = useState(undefined);
  const [fileValue, setFileValue] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState([]);
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

  const [fileLoading, setFileLoading] = useState(false);
  const [uploadPopup, setUploadPopup] = useState(false);
  const [formValid, setFormValid] = useState(false);

  const [selectedActive, setSelectedActive] = useState(new Array(categoriesData.length).fill(false));
  const [selectedIndex, setSelectedIndex] = useState(null);

  // Form validation
  useEffect(() => {
    if (fileError || !(name.length > 0 && !nameError) || !(description.length > 0 && !descriptionError) || categoryError || languageError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    };
  }, [fileError, name, description, nameError, descriptionError, categoryError, languageError]);

  // Send request for File preview
  useEffect(() => {
    if (file) {
      setFileLoading(true);

      const key = "";
      const str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "abcdefghijklmnopqrstuvwxyz0123456789";

      for (const i = 1; i <= 12; i++) {
        const char = Math.floor(Math.random() * str.length + 1);
        key += str.charAt(char);
      };

      const payload = {
        "filetype": "docxf",
        "key": key,
        "outputtype": "png",
        "thumbnail": {
          "aspect": 0,
          "first": true,
          "width": 544,
          "height": 768
        },
        "title": file.name,
        "url": "https://static-oforms.onlyoffice.com/image1_b8e15a6f9f.png"
      };

      const token = jwt.KJUR.jws.JWS.sign("HS256", JSON.stringify({ alg: "HS256" }), payload, process.env.NEXT_PUBLIC_FILES_DOCSERVICE_SECRET);

      axios.post(`${process.env.NEXT_PUBLIC_EDITOR_API_URL}/ConvertService.ashx`, payload, {
        headers: {
          "Content-Type": "application/json",
          "AuthorizationJwt": `Bearer ${token}`
        }
      }).then(() => {
        setFileLoading(false);
      });
    }
  }, [file]);

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

  const sendForm = (e) => {
    e.preventDefault();

    axios.post(`https://oforms.teamlab.info/dashboard/api/oforms`, {
      "data": {
        "name_form": name,
        "description_card": description,
        "file_size": `${file.size.toString().substring(0, 2)} kB`,
        "file_last_update": moment(file.lastModifiedDate).locale(languageKey).format(
          languageKey === "zh" ? "Y年MM月DD" : languageKey === "ja" ? "Y年MM月DD日" : "MMMM D, y"
        ),
        "file_pages": "",
        "template_desc": description,
        "categorie": category,
        "locale": languageKey,
        "publishedAt": null
      }
    }).then(() => {
      // Show upload popup
      setUploadPopup(true);
    });
  };

  const clearForm = () => {
    setFile(undefined);
    setFileValue("");
    setName("");
    setDescription("");
    setCategory([]);
    setLanguage([]);
    setNameValid(false);
    setDescriptionValid(false);
    setCategoryValid(false);
    setLanguageValid(false);
    setFormValid(false);
    setSelectedActive(new Array(categoriesData.length).fill(false));
    setSelectedIndex(null);
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
            errorText={t("Upload file is empty")}
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
              labelMore={(t("(maximum 5)"))}
              placeholder={t("Enter category or choose")}
              errorText={t("Form category is empty")}
              options={categoriesData}
              selected={category}
              setSelected={setCategory}
              valid={categoryValid}
              setValid={setCategoryValid}
              error={categoryError}
              setError={setCategoryError}
              selectedActive={selectedActive}
              setSelectedActive={setSelectedActive}
            />
            <Select
              t={t}
              label={t("Language")}
              placeholder={t("Please select a language")}
              errorText={t("Language is empty")}
              options={languageData}
              selected={language}
              setSelected={setLanguage}
              setLanguageKey={setLanguageKey}
              valid={languageValid}
              setValid={setLanguageValid}
              error={languageError}
              setError={setLanguageError}
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
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
          </div>

          <Button onClick={(e) => sendForm(e)} className="send-button" label={t("Send")} isDisabled={!formValid} />
        </div>
      </div>

      <UploadPopup t={t} file={file} uploadPopup={uploadPopup} setUploadPopup={setUploadPopup} clearForm={clearForm} />
    </StyledFormSubmitContent>
  );
};

export default FormSubmitContent;