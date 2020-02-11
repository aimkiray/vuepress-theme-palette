<template>
    <div id="global-layout">
        <Header/>

        <DefaultGlobalLayout/>

        <Footer/>
    </div>
</template>

<script>
    import GlobalLayout from "@app/components/GlobalLayout.vue";
    import Header from "@theme/components/Header.vue";
    import Footer from "@theme/components/Footer.vue";

    export default {
        components: {
            DefaultGlobalLayout: GlobalLayout,
            Header,
            Footer,
        }
    };
</script>

<style lang="stylus">

</style>