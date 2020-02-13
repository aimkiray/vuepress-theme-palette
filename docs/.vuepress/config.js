const purgecss = require('@fullhuman/postcss-purgecss')({

    // Specify the paths to all of the template files in your project
    content: [
        "./components/*.*",
        "./layouts/*.*",
        "./styles/*.*",
        "./!(node_modules)/**/*.md",
        "./*.md",
    ],

    // Include any special characters you're using in this regular expression
    defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
    // defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || [],
});

module.exports = {
    title: 'Palette Re', // Title for the site. This will be displayed in the navbar.
    postcss: {
        plugins: [
            require("tailwindcss")("./tailwind.config.js"),
            require("autoprefixer"),
            ...(process.env.NODE_ENV === "production" ? [purgecss] : []),
        ]
    },
    head: [
        ['link', { rel: 'icon', href: '/favicon.ico' }],
    ],
    theme: require.resolve('../../'),
    themeConfig: {
        nav: [
            {
                text: 'Tags',
                link: '/tag/',
            },
        ],
        sitemap: {
            hostname: 'https://meowwoo.com/'
        },
        smoothScroll: true,
    },
};
