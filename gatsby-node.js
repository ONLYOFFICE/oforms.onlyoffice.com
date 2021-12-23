exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;
  const srcComponentPageTemplate = require.resolve("./src/templates/index");

  const requestResult = await graphql(
    `
      query {
        allOformsJson {
          edges {
            node {
              name
              link_oform_filling_file
              seo {
                description
                title
              }
              file_categories
              file_country_access
              file_description
              file_image
              file_size
              file_last_update
              file_link_changelog
              file_pages
              file_type_access
              file_formats_download
            }
          }
        }
      }
    `
  );

  if (requestResult.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query !!!`);
    throw requestResult.errors;
  }

  const pagesDataItems =
    typeof requestResult?.data?.allOformsJson?.edges !== undefined
      ? requestResult?.data?.allOformsJson?.edges
      : null;

  const pathNameTemplate = pagesDataItems.map((path) => {
    const pathNodeName = path.node.name;
    return `/${pathNodeName
      .replace(/\s/g, "-")
      .replace(/[{()}]/g, "")
      .toLowerCase()}`;
  });

  const checkIfDuplicateExists = (arr) => {
    return new Set(arr).size !== arr.length;
  };
  if (checkIfDuplicateExists(pathNameTemplate)) {
    reporter.panicOnBuild(`===== Error, find duplicate =====`);
  }

  pagesDataItems.forEach((data, idx) => {
    let tmpData = data.node;
    const pathName = pathNameTemplate[idx];

    createPage({
      path: pathName,
      component: srcComponentPageTemplate,
      context: {
        id: tmpData.id,
        data: tmpData,
        pathName: pathName,
      },
    });
  });
};

exports.onPostBuild = ({ reporter }) => {
  const Message = " ===== Gatsby dynamic pages has been built! ===== ";
  reporter.info(Message);
};