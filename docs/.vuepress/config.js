module.exports = {
    title: 'Palette Re', // Title for the site. This will be displayed in the navbar.
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
