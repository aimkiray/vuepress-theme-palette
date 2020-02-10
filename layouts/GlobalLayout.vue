<template>
    <div id="global-layout">
        <Header/>

        <br/>
        <DefaultGlobalLayout/>
        <br/>
        <footer class="clearfix">
            © 2014&nbsp;-&nbsp;0202 <a href="https://meowwoo.com">aimkiray</a>.
            <br>
            Theme from
            <a href="https://github.com/aimkiray/vuepress-theme-palette" target="_blank">Palette</a>.
            在被〇〇和〇〇后并没有炸掉|ω･)ﾉ
        </footer>
    </div>
</template>

<script>
    import GlobalLayout from "@app/components/GlobalLayout.vue";
    import Header from "@theme/components/Header.vue";

    export default {
        components: {
            DefaultGlobalLayout: GlobalLayout,
            Header,
        }
    };
</script>

<style lang="stylus">
    footer
        position: relative;
        padding: 15px 20px 10px 20px;
        font-size: 14px;
        overflow: hidden;
        text-align: center;
        opacity: 1;
        -webkit-transform: translate3d(0, -20px, 0);
        transform: translate3d(0, -20px, 0);
        -webkit-transition: all .4s;
        transition: all .4s;
        z-index: 3;
</style>