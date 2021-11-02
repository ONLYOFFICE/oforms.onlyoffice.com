module.exports = {
    plugins: [
        { resolve: "gatsby-plugin-styled-components" },
        { resolve: "gatsby-plugin-image" },
        { resolve: "gatsby-plugin-sharp" },
        { resolve: "gatsby-transformer-sharp" },
        { resolve: "gatsby-plugin-react-helmet" },
        {
            resolve: "gatsby-plugin-manifest",
            options: {
                icon: `./static/images/logo/favicon_general.png`,
            },
        },
        { resolve: "gatsby-transformer-remark" },
        { resolve: "gatsby-plugin-mdx" },
        {
            resolve: "gatsby-source-filesystem",
            options: {
                name: "pages",
                path: "./src/pages/",
            },
            __key: "pages",
        },
    ],
};