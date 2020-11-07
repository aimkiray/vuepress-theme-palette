<template>
  <div class="global-layout">
    <Header class="header" />

    <div class="main-wrapper">
      <DefaultGlobalLayout />
    </div>

    <Footer class="footer" />
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
  },
};
</script>

<style lang="stylus">
.global-layout {
    display: flex;
    height: 100vh;
    flex-direction: column;
}

.header,
.footer {
  flex: none;
}

.main-wrapper {
    flex: 1 0 auto;
    padding-top 4rem
    padding-bottom 8rem
    background-color #FAFAFA
}
</style>
