const { api } = require("./static/data/config.json");
const axios = require("axios");
const fs = require("fs");

exports.onPreInit = async () => {
  const { cms } = api;
  let urlReq = cms || "http://localhost:1337";
  const data = await axios
    .get(`${urlReq}/api/oforms?populate=*&locale=all`)
    .then((resp) => {
      return resp.data;
    });
  const jsonData = JSON.stringify(data);
  fs.writeFileSync("./static/data/reqdata.json", jsonData);
};

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;
  const srcComponentPageTemplate = require.resolve("./src/templates/index");

  const requestResult = await graphql(
    `
      query {
        allDataJson {
          edges {
            node {
              data {
                id
                attributes {
                  card_prewiew {
                    data {
                      attributes {
                        url
                      }
                    }
                  }
                  description_card
                  file_oform {
                    data {
                      attributes {
                        name
                        url
                      }
                    }
                  }
                  locale
                  name_form
                  template_desc
                  template_image {
                    data {
                      attributes {
                        url
                        name
                      }
                    }
                  }
                  file_last_update
                  file_pages
                  file_size
                  seo_description
                  seo_title
                }
              }
            }
          }
        }
      }
    `
  );

  if (requestResult.errors) {
    reporter.panicOnBuild("Error while running GraphQL query !!!");
    throw requestResult.errors;
  }

  const pagesDataItems =
    typeof requestResult?.data?.allDataJson?.edges !== undefined
      ? requestResult?.data?.allDataJson?.edges
      : null;

  const shortDataItems = pagesDataItems[1]?.node?.data;

  const pathNameTemplate = shortDataItems.map((path) => {
    const pathNodeName = path.attributes.name_form;
    return `/${pathNodeName
      .replace(/\s/g, "-")
      .replace(/[{()}]/g, "")
      .toLowerCase()}`;
  });

  const checkIfDuplicateExists = (arr) => {
    // console.log(arr.filter((e, i, a) => a.indexOf(e) !== i));
    // console.log(arr.length);
    return new Set(arr).size !== arr.length;
  };
  if (checkIfDuplicateExists(pathNameTemplate)) {
    reporter.panicOnBuild(`===== Error, find duplicate =====`);
  }

  shortDataItems.forEach((data, idx) => {
    let tmpData = data;
    let tmpId = data.id;
    const pathName = pathNameTemplate[idx];
    if (pathName !== undefined) {
      createPage({
        path: pathName,
        component: srcComponentPageTemplate,
        context: {
          id: tmpId,
          data: tmpData,
          pathName: pathName,
        },
      });
    }
  });
};

exports.onPostBuild = ({ reporter }) => {
  const Message = " ===== Gatsby dynamic pages has been built! ===== ";
  reporter.info(Message);
};
