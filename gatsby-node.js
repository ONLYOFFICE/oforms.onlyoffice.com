// TO DO content from a remote CMS
const path = require("path");
const fs = require("fs");
const { createFilePath } = require("gatsby-source-filesystem");

// Create pages dynamically
exports.createPages = async ({
    graphql,
    actions,
    reporter
}) => {

    // Destructure the createPage function from the actions object
    const { createPage } = actions;

    // Src pages template
    const srcComponentPageTemplate = require.resolve("./src/templates/index");

    // Request graphql result CMS or json file 
    const requestResult = await graphql(
        `
        query {
            allOformsJson {
                edges {
                  node {
                    categories
                    description
                    id
                    image_src
                    last_update
                    link_changelog
                    type_access
                    name
                    count_pages
                    file_size
                    file_type
                    seo {
                      description
                      title
                    }
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
    // TO DO added check data

    // console.log("=============== CHECK TYPE OF DATA =================");
    // console.log(typeof (requestResult?.data?.allOformsJson?.edges));
    // console.log("====================================================");

    // Init items  data
    const pagesDataItems = typeof (requestResult?.data?.allOformsJson?.edges) !== undefined
        ? requestResult?.data?.allOformsJson?.edges
        : null;

    // console.log("==================== DATA ==========================");
    // console.log(pagesDataItems);
    // console.log("====================================================");

    // Processing of paths for pages
    const pathNameTemplate = pagesDataItems.map((path) => {
        const namePage = path.node.name;
        return `/${namePage.replace(/\s/g, "-").replace(/[{()}]/g, '').toLowerCase()}`;
    });

    // Create template pages    
    pagesDataItems.forEach((data, idx) => {
        let tmpData = data.node;
        const pathName = pathNameTemplate[idx];
        // TO DO: move the processing of paths for pages into a separate function
        //let tmpName = (tmp.name).replace(/\s/g, "-").toLowerCase();
        //let pathName = `/oforms/${tmpName}`;

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

// Log out information after a build is done
exports.onPostBuild = ({ reporter }) => {
    const Message = " ===== Gatsby dynamic pages has been built! ===== ";
    reporter.info(Message);
};

// public -> /oforms/
// exports.onPostBuild = () => {
//     fs.renameSync(path.join(__dirname, 'public'), path.join(__dirname, 'public-oforms'));
//     fs.mkdirSync(path.join(__dirname, 'public'));
//     fs.renameSync(path.join(__dirname, 'public-oforms'), path.join(__dirname, 'public', 'oforms'));
// };