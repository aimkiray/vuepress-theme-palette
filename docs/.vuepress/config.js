module.exports = {
    title: 'Palette Re', // Title for the site. This will be displayed in the navbar.
    postcss: {
        plugins: [
            require("tailwindcss")("./tailwind.config.js"),
            require("autoprefixer")
        ]
    },
    theme: require.resolve('../../'),
};
