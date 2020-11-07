<template>
  <div class="header-wrapper">
    <div class="title-wrapper">
      <router-link to="/" class="title">{{ $site.title }}</router-link>
    </div>
    <div v-if="$themeConfig.nav" class="nav-wrap">
      <component
        v-for="item in $themeConfig.nav"
        :key="item.text"
        class="nav-item"
        v-bind="linkProps(item.link)"
        >{{ item.text }}
      </component>
    </div>
    <div class="cat-ear">
      <span class="a-ear">▲</span>
      <span class="a-ear">▲</span>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    linkProps(url) {
      if (url.match(/^(http(s)?|ftp):\/\//)) {
        return {
          is: "a",
          href: url,
          target: "_blank",
          rel: "noopener",
        };
      }
      return {
        is: "router-link",
        to: url,
      };
    },
  },
};
</script>

<style lang="stylus">
.header-wrapper {
  padding: 2rem 0 1rem 0;
  height: 5rem;
  // border-bottom: solid 0.5rem #fc8181;
  background-color: white;

  .title {
    font-family: 'Press Start 2P';
    display: inline-block;
    padding: 0 0.3rem 0 0.5rem;
    margin-bottom: 0.5rem;
    border-right: 0.75rem solid $link-color;
    animation: blink 1s infinite;
    font-size: 1.5rem;
    text-decoration: underline;

    @media screen and (max-width: $mobile-width) {
      font-size: 1rem;
      border-right: 0.5rem solid $link-color;
    }
  }

  @keyframes blink {
    0% {
      border-right-color: transparent;
    }

    50% {
      border-right-color: transparent;
    }

    51% {
      border-right-color: $link-color;
    }

    100% {
      border-right-color: $link-color;
    }
  }

  .nav-item {
    font-family: $fonts-serif;
    font-size: 0.875rem;
    padding-left: 0.5rem;
    color: $accent-color;
  }

  .cat-ear {
    font-family: arial;
    text-transform: uppercase;
    text-align: center;
    letter-spacing: 3rem;
  }

  .a-ear {
    letter-spacing: 0;
    text-shadow: 0.5rem -0.02rem #fc8181, -0.5rem -0.02rem #fc8181, 0 -1.04rem #fc8181;
    color: #FAFAFA;
    font-size: 6rem;
    line-height: 4rem;
    z-index: 1;
    position: relative;
    bottom: 1.75rem;
  }
}
</style>
