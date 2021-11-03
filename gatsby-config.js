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
        {
            resolve: "gatsby-source-filesystem",
            options: {
                name: "images",
                path: "./static/images/",
            },
            __key: "images",
        },
        {
            resolve: "gatsby-plugin-google-fonts",
            options: {
                fonts: [`Open Sans:200,300,400,400i,500,600,700,800`],
            },
        },
        {
            resolve: "gatsby-plugin-portal",
            options: {
                key: "portal",
                id: "portal",
            },
        },
        {
            resolve: "gatsby-plugin-react-svg",
            options: {
                rule: {
                    include: /\.react.svg$/,
                },
            },
        },
    ],
};